import api from "../api/login";

export async function useLogin(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.token);

  return res.data;
}
