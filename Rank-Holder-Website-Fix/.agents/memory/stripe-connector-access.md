---
name: Stripe connector access
description: The Rank Holder Stripe integration uses Replit's managed proxy rather than a raw API key.
---

Use `@replit/connectors-sdk` for all Stripe API requests in this project. The connected Stripe integration is proxy-only; its connection does not provide a raw secret key. Do not add direct secret-key retrieval or request a Stripe key for app code.

**Why:** The connection's supported setup is `ReplitConnectors.proxy()`. A direct secret-key lookup returned no key, while the managed proxy successfully listed and created Rank Holder billing resources.

**How to apply:** Keep Stripe reads and writes behind the managed connector proxy. Avoid webhook designs that require a signing secret unless the user explicitly configures one through the workspace secrets flow.
