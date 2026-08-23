import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "https://zerodha-clone-backend-ax9w.onrender.com";

// Shared axios instance used across the dashboard.
// - withCredentials: true so the httpOnly auth cookie is sent/received.
// - timeout: the free-tier backend host can take 30-60s to wake up after
//   being idle, so this is set generously — but it's finite, so a broken
//   backend fails with a clear error instead of hanging the UI forever.
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 60000,
});

export default API_URL;
