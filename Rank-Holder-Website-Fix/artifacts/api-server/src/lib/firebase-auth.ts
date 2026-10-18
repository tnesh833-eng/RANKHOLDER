import { createRemoteJWKSet, jwtVerify } from "jose";
import type { RequestHandler } from "express";
import { storage, type VerifiedFirebaseUser } from "../storage";

declare global {
  namespace Express {
    interface Request {
      firebaseUser?: VerifiedFirebaseUser;
    }
  }
}

const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID?.trim() || "rank-holder-ea368";
const firebaseJwks = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  ),
);

export const requireFirebaseUser: RequestHandler = async (req, res, next) => {
  const authorization = req.header("authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    res.status(401).json({ message: "Sign in to continue." });
    return;
  }

  let identity: VerifiedFirebaseUser;
  try {
    const { payload } = await jwtVerify(match[1], firebaseJwks, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
      algorithms: ["RS256"],
    });

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      payload.email_verified !== true
    ) {
      res.status(401).json({
        message: "Verify your email address before continuing.",
      });
      return;
    }

    identity = {
      uid: payload.sub,
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : null,
    };
  } catch {
    res.status(401).json({ message: "Your sign-in has expired. Please sign in again." });
    return;
  }

  try {
    await storage.upsertFirebaseUser(identity.uid, identity.email);
    req.firebaseUser = identity;
    next();
  } catch (error) {
    next(error);
  }
};
