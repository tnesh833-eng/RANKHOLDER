import { stripeRequest } from "./stripeClient";

type StripeProduct = {
  id: string;
  active: boolean;
  metadata: Record<string, string>;
};

type StripePrice = {
  id: string;
  active: boolean;
  product: string;
  unit_amount: number | null;
  currency: string;
  recurring: { interval: string; interval_count: number } | null;
};

type StripeList<T> = { data: T[] };

async function main() {
  const productList = await stripeRequest<StripeList<StripeProduct>>(
    "/v1/products?active=true&limit=100",
  );
  let product = productList.data.find(
    (entry) =>
      entry.active && entry.metadata?.application === "rank-holder",
  );

  if (!product) {
    const form = new URLSearchParams({
      name: "Rank Holder Premium",
      description: "Monthly access to the Rank Holder career toolkit.",
      "metadata[application]": "rank-holder",
      "metadata[tier]": "premium",
    });
    product = await stripeRequest<StripeProduct>(
      "/v1/products",
      "POST",
      form,
      "rank-holder-premium-product-v1",
    );
  }

  const priceList = await stripeRequest<StripeList<StripePrice>>(
    `/v1/prices?active=true&product=${encodeURIComponent(product.id)}&limit=100`,
  );
  const price = priceList.data.find(
    (entry) =>
      entry.active &&
      entry.unit_amount === 600 &&
      entry.currency.toLowerCase() === "inr" &&
      entry.recurring?.interval === "month" &&
      entry.recurring.interval_count === 1,
  );

  if (price) {
    console.log("Rank Holder monthly INR plan is already configured.");
    return;
  }

  const form = new URLSearchParams({
    product: product.id,
    unit_amount: "600",
    currency: "inr",
    "recurring[interval]": "month",
    "recurring[interval_count]": "1",
    "metadata[application]": "rank-holder",
  });
  await stripeRequest<StripePrice>(
    "/v1/prices",
    "POST",
    form,
    "rank-holder-monthly-inr-600-v1",
  );
  console.log("Configured the Rank Holder monthly INR plan in Stripe.");
}

main().catch((error) => {
  console.error(
    "Could not configure the Rank Holder Stripe plan:",
    error instanceof Error ? error.message : "Unknown Stripe error.",
  );
  process.exitCode = 1;
});
