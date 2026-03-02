import { supabase } from "../libs/supabase";

export async function useRegister(
  name: string,
  email: string,
  password: string,
) {
  const { data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.user) {
    await fetch("http://localhost:3000/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.user.email,
        supabaseId: data.user.id,
        name,
      }),
    });
  }
  return data;
}
