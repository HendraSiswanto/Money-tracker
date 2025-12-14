import api from "../api/login";

export async function useRegister(
  name: string,
  email: string,
  password: string
) {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
}
