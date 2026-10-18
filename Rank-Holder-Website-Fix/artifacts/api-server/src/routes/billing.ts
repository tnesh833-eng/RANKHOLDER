import { Router, type IRouter, type Request } from "express";
import {
  CreateBillingCheckoutResponse,
  CreateBillingPortalResponse,
  GetBillingPlansResponse,
  GetBillingSubscriptionResponse,
} from "@workspace/api-zod";
import { requireFirebaseUser } from "../lib/firebase-auth";
import { storage } from "../storage";
import { stripeService } from "../stripeService";

const router: IRouter = Router();

function getAllowedHosts(): Set<string> {
  const raw = [
    process.env.REPLIT_DOMAINS,
    process.env.REPLIT_DEV_DOMAIN,
  ]
    .filter(Boolean)
    .flatMap((value) => value!.split(","))
    .map((value) =>
      value
        .trim()
        .replace(/^https?:\/\//i, "")
        .split("/")[0]
        .toLowerCase(),
    )
    .filter(Boolean);
  return new Set(raw);
}

function appOriginForRequest(req: Request): string {
  const origin = req.get("origin");
  if (origin) {
    let parsed: URL;
    try {
      parsed = new URL(origin);
    } catch {
      throw new Error("The app origin is invalid.");
    }

    const isLocalDev =
      process.env.NODE_ENV !== "production" &&
      ["localhost", "127.0.0.1"].includes(parsed.hostname);
    if (isLocalDev || getAllowedHosts().has(parsed.hostname.toLowerCase())) {
      if (parsed.protocol === "https:" || isLocalDev) return parsed.origin;
    }
  }

  const fallbackHost = [
    process.env.REPLIT_DOMAINS?.split(",")[0],
    process.env.REPLIT_DEV_DOMAIN,
  ]
    .find(Boolean)
    ?.trim()
    .replace(/^https?:\/\//i, "")
    .split("/")[0];

  if (fallbackHost) return `https://${fallbackHost}`;
  throw new Error("The app domain is not configured for Stripe redirects.");
}

function getUser(req: Request) {
  if (!req.firebaseUser) {
    throw new Error("Verified Firebase user is missing.");
  }
  return req.firebaseUser;
}

function isAccessActive(status: string | null | undefined): boolean {
  return status === "active" || status === "trialing";
}

router.get("/billing/plans", async (_req, res, next) => {
  try {
    const plans = GetBillingPlansResponse.parse(await stripeService.listRankHolderPlans());
    res.json(plans);
  } catch (error) {
    next(error);
  }
});

router.get("/billing/subscription", requireFirebaseUser, async (req, res, next) => {
  try {
    const user = getUser(req);
    const record = await storage.getUser(user.uid);
    const subscriptions = record?.stripeCustomerId
      ? await stripeService.listSubscriptions(record.stripeCustomerId)
      : [];
    const row =
      subscriptions.find((subscription) => isAccessActive(subscription.status)) ??
      subscriptions[0];
    await storage.setStripeSubscriptionId(user.uid, row?.id ?? null);

    const currentPeriodEnd =
      row?.current_period_end && row.current_period_end > 0
        ? new Date(row.current_period_end * 1000).toISOString()
        : null;
    const data = GetBillingSubscriptionResponse.parse({
      hasActiveSubscription: isAccessActive(row?.status),
      status: row?.status ?? null,
      currentPeriodEnd,
      cancelAtPeriodEnd: row?.cancel_at_period_end ?? false,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/billing/checkout-session",
  requireFirebaseUser,
  async (req, res, next) => {
    try {
      const user = getUser(req);
      const priceId =
        typeof req.body?.priceId === "string" ? req.body.priceId.trim() : "";

      if (!/^price_[A-Za-z0-9]+$/.test(priceId)) {
        res.status(400).json({ message: "Choose an available subscription plan." });
        return;
      }

      const plan = await stripeService.getRankHolderPlan(priceId);
      if (!plan) {
        res.status(400).json({ message: "That subscription plan is no longer available." });
        return;
      }

      const existingUser = await storage.getUser(user.uid);
      if (!existingUser) {
        res.status(401).json({ message: "Sign in again before starting checkout." });
        return;
      }

      let customerId = existingUser.stripeCustomerId;
      if (customerId && !(await stripeService.customerExists(customerId))) {
        customerId = null;
      }

      const existingSubscriptions = customerId
        ? await stripeService.listSubscriptions(customerId)
        : [];
      if (existingSubscriptions.some((subscription) => isAccessActive(subscription.status))) {
        res.status(409).json({
          message: "Your subscription is already active. Manage it from billing.",
        });
        return;
      }

      if (!customerId) {
        const customer = await stripeService.createCustomer(
          user.email,
          user.uid,
          user.name,
        );
        customerId = customer.id;
        await storage.setStripeCustomerId(user.uid, customerId);
      }

      const origin = appOriginForRequest(req);
      const session = await stripeService.createCheckoutSession({
        customerId,
        firebaseUid: user.uid,
        priceId: plan.priceId,
        successUrl: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/billing?checkout=cancelled`,
      });

      if (!session.url) {
        res.status(502).json({ message: "Stripe did not return a checkout link." });
        return;
      }

      res.json(CreateBillingCheckoutResponse.parse({ url: session.url }));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/billing/portal-session",
  requireFirebaseUser,
  async (req, res, next) => {
    try {
      const user = getUser(req);
      const record = await storage.getUser(user.uid);
      if (!record?.stripeCustomerId) {
        res.status(404).json({ message: "No billing profile is linked to this account yet." });
        return;
      }

      const origin = appOriginForRequest(req);
      const session = await stripeService.createCustomerPortalSession(
        record.stripeCustomerId,
        `${origin}/billing`,
      );
      res.json(CreateBillingPortalResponse.parse({ url: session.url }));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
