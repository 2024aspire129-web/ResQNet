const rawBaseUrl = import.meta.env.VITE_API_URL;

if (!rawBaseUrl) {
  throw new Error("VITE_API_URL is required. Set it to your live backend URL.");
}

export const BASE_URL = rawBaseUrl.replace(/\/$/, "");
