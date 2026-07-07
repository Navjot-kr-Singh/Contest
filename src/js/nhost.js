import { createClient, withClientSideSessionMiddleware } from "@nhost/nhost-js";

export const nhost = createClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
  configure: [withClientSideSessionMiddleware],
});