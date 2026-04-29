import axios from "axios";
import { supabase } from "../libs/supabase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized request");
    }
    return Promise.reject(err);
  }
);

export default api;
