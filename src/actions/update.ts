"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function updateUserData(id: number, prevState: any, formData: FormData) {

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

  const name = formData.get("name") as string;
  const lastname = formData.get("lastname") as string;

  const { error } = await supabase
    .from("testarea")
    .update({ name, lastname })
    .eq("id", id);

  if (error) {
    return { error: "Kunne ikke opdatere databasen." };
  }

  // Dette opdaterer cachen i Next.js med det samme
  //revalidatePath("/admin/dashboard", "layout");

  return { success: true };
}
