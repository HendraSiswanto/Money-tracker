import { supabase } from "../libs/supabase";

export async function useRegister(
  name: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw error;

  if (data.session) {
    await fetch(`${import.meta.env.VITE_API_URL}/categories/seed`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });
  }

  return data;
}
