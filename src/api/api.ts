import axios from "axios";
import { supabase } from "../libs/supabase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let accessToken: string | null = null;

supabase.auth.onAuthStateChange((_event, session) => {
  accessToken = session?.access_token ?? null;
});

api.interceptors.request.use(async (config) => {

  if (!accessToken) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    accessToken = session?.access_token ?? null;
  }

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

export default api;
