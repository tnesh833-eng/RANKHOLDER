import { ReplitConnectors } from "@replit/connectors-sdk";

type StripeResponse<T> = T & {
  error?: {
    message?: string;
  };
};

const connectors = new ReplitConnectors();

export async function stripeRequest<T>(
  path: string,
  method: "GET" | "POST" = "GET",
  form?: URLSearchParams,
  idempotencyKey?: string,
): Promise<T> {
  const response = await connectors.proxy("stripe", path, {
    method,
    headers: {
      ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    ...(form ? { body: form } : {}),
  });

  const data = (await response.json().catch(() => ({}))) as StripeResponse<T>;
  if (!response.ok) {
    throw new Error(
      data.error?.message || `Stripe request failed (${response.status}).`,
    );
  }
  return data;
}
