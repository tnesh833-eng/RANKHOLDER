import { eq } from "drizzle-orm";
import { db, users } from "@workspace/db";

export type VerifiedFirebaseUser = {
  uid: string;
  email: string;
  name: string | null;
};

export const storage = {
  async upsertFirebaseUser(uid: string, email: string) {
    await db
      .insert(users)
      .values({ id: uid, email })
      .onConflictDoUpdate({
        target: users.id,
        set: { email },
      });
  },

  async getUser(uid: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, uid))
      .limit(1);
    return user;
  },

  async setStripeCustomerId(uid: string, customerId: string) {
    await db
      .update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, uid));
  },

  async setStripeSubscriptionId(uid: string, subscriptionId: string | null) {
    await db
      .update(users)
      .set({ stripeSubscriptionId: subscriptionId })
      .where(eq(users.id, uid));
  },
};
