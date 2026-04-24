import { API_BASE_URL } from "./config";

const normalizePath = (path) => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path}`;
};

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(normalizePath(path), options);
  const contentType = response.headers.get("content-type") || "";
  const bodyText = await response.text();

  let payload = null;
  if (bodyText) {
    if (contentType.includes("application/json")) {
      try {
        payload = JSON.parse(bodyText);
      } catch {
        throw new Error("API returned invalid JSON. Please check the backend response.");
      }
    } else if (bodyText.trim().startsWith("<")) {
      throw new Error(
        "API returned HTML instead of JSON. Check VITE_API_BASE_URL and backend route."
      );
    }
  }

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      (bodyText && !bodyText.trim().startsWith("<") ? bodyText : "") ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload ?? {};
};

