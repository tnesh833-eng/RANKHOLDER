import { ReplitConnectors } from "@replit/connectors-sdk";

type StripeProduct = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  metadata: Record<string, string>;
};

type StripePrice = {
  id: string;
  product: string | { id: string };
  active: boolean;
  unit_amount: number | null;
  currency: string;
  recurring: { interval: string; interval_count: number } | null;
};

type StripeCustomer = {
  id: string;
  deleted?: boolean;
};

type StripeCheckoutSession = {
  id: string;
  url: string | null;
};

type StripePortalSession = {
  url: string;
};

type StripeSubscription = {
  id: string;
  status: string;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  created?: number;
};

type StripeList<T> = {
  data: T[];
  has_more: boolean;
};

type StripeResponse<T> = T & {
  error?: {
    message?: string;
  };
};

export type BillingPlan = {
  priceId: string;
  productId: string;
  name: string;
  description: string | null;
  unitAmount: number;
  currency: string;
  interval: string;
  intervalCount: number;
};

const connectors = new ReplitConnectors();

class StripeProxyError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "StripeProxyError";
  }
}

async function stripeRequest<T>(
  path: string,
  options: {
    method?: "GET" | "POST";
    form?: URLSearchParams;
    idempotencyKey?: string;
  } = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (options.form) headers["Content-Type"] = "application/x-www-form-urlencoded";
  if (options.idempotencyKey) headers["Idempotency-Key"] = options.idempotencyKey;

  const response = await connectors.proxy("stripe", path, {
    method: options.method ?? "GET",
    headers,
    ...(options.form ? { body: options.form } : {}),
  });

  const data = (await response.json().catch(() => ({}))) as StripeResponse<T>;
  if (!response.ok) {
    throw new StripeProxyError(
      response.status,
      data.error?.message || `Stripe request failed (${response.status}).`,
    );
  }
  return data;
}

function getProductId(price: StripePrice): string {
  return typeof price.product === "string" ? price.product : price.product.id;
}

function toBillingPlan(product: StripeProduct, price: StripePrice): BillingPlan {
  return {
    priceId: price.id,
    productId: product.id,
    name: product.name,
    description: product.description,
    unitAmount: price.unit_amount ?? 0,
    currency: price.currency.toLowerCase(),
    interval: price.recurring!.interval,
    intervalCount: price.recurring!.interval_count,
  };
}

async function rankHolderCatalog(): Promise<{
  products: StripeProduct[];
  prices: StripePrice[];
}> {
  const [products, prices] = await Promise.all([
    stripeRequest<StripeList<StripeProduct>>("/v1/products?active=true&limit=100"),
    stripeRequest<StripeList<StripePrice>>("/v1/prices?active=true&limit=100"),
  ]);
  return {
    products: products.data.filter(
      (product) =>
        product.active && product.metadata?.application === "rank-holder",
    ),
    prices: prices.data,
  };
}

async function createStripeResource<T>(
  path: string,
  form: URLSearchParams,
  idempotencyKey?: string,
): Promise<T> {
  return stripeRequest<T>(path, {
    method: "POST",
    form,
    idempotencyKey,
  });
}

export const stripeService = {
  async listRankHolderPlans(): Promise<BillingPlan[]> {
    const { products, prices } = await rankHolderCatalog();
    const productById = new Map(products.map((product) => [product.id, product]));
    return prices
      .filter((price) => price.active && price.recurring)
      .map((price) => {
        const product = productById.get(getProductId(price));
        return product ? toBillingPlan(product, price) : null;
      })
      .filter((plan): plan is BillingPlan => plan !== null)
      .sort((left, right) => left.unitAmount - right.unitAmount);
  },

  async getRankHolderPlan(priceId: string): Promise<BillingPlan | null> {
    try {
      const price = await stripeRequest<StripePrice>(
        `/v1/prices/${encodeURIComponent(priceId)}`,
      );
      if (!price.active || !price.recurring) return null;

      const product = await stripeRequest<StripeProduct>(
        `/v1/products/${encodeURIComponent(getProductId(price))}`,
      );
      if (
        !product.active ||
        product.metadata?.application !== "rank-holder"
      ) {
        return null;
      }
      return toBillingPlan(product, price);
    } catch (error) {
      if (error instanceof StripeProxyError && error.status === 404) return null;
      throw error;
    }
  },

  async customerExists(customerId: string): Promise<boolean> {
    try {
      const customer = await stripeRequest<StripeCustomer>(
        `/v1/customers/${encodeURIComponent(customerId)}`,
      );
      return !customer.deleted;
    } catch (error) {
      if (error instanceof StripeProxyError && error.status === 404) return false;
      throw error;
    }
  },

  async listSubscriptions(customerId: string): Promise<StripeSubscription[]> {
    const query = new URLSearchParams({
      customer: customerId,
      status: "all",
      limit: "100",
    });
    const result = await stripeRequest<StripeList<StripeSubscription>>(
      `/v1/subscriptions?${query.toString()}`,
    );
    return result.data.sort((left, right) => (right.created ?? 0) - (left.created ?? 0));
  },

  createCustomer(email: string, uid: string, name: string | null) {
    const form = new URLSearchParams({
      email,
      "metadata[application]": "rank-holder",
      "metadata[firebase_uid]": uid,
    });
    if (name) form.set("name", name);

    return createStripeResource<StripeCustomer>(
      "/v1/customers",
      form,
      `rank-holder-customer-${uid}`,
    );
  },

  createCheckoutSession(input: {
    customerId: string;
    firebaseUid: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    const form = new URLSearchParams({
      customer: input.customerId,
      mode: "subscription",
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      client_reference_id: input.firebaseUid,
      "line_items[0][price]": input.priceId,
      "line_items[0][quantity]": "1",
      "metadata[application]": "rank-holder",
      "metadata[firebase_uid]": input.firebaseUid,
      "subscription_data[metadata][application]": "rank-holder",
      "subscription_data[metadata][firebase_uid]": input.firebaseUid,
    });

    return createStripeResource<StripeCheckoutSession>(
      "/v1/checkout/sessions",
      form,
      `rank-holder-checkout-${input.firebaseUid}-${input.priceId}-${Math.floor(Date.now() / 60_000)}`,
    );
  },

  createCustomerPortalSession(customerId: string, returnUrl: string) {
    const form = new URLSearchParams({
      customer: customerId,
      return_url: returnUrl,
    });
    return createStripeResource<StripePortalSession>(
      "/v1/billing_portal/sessions",
      form,
    );
  },
};
