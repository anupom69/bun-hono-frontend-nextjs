"use server"
import { revalidatePath } from "next/cache";

interface PersonPrevState {
  success?: boolean;
  error?: string;
}

export default async function deletePerson(
  prevState: PersonPrevState,
  formData: FormData
): Promise<PersonPrevState> {
  try {
    const id = formData.get("id");
    if (!id) {
      return {
        error: "ID is required",
      };
    }
    const response = await fetch(
      `${process.env.BACKEND_URL}/people/delete-one/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.USERNAME}:${process.env.PASSWORD}`
          ).toString("base64")}`,
        },
      }
    );
    if (!response.ok) {
      return {
        error: `Backend Error: ${response.status} ${response.statusText}`,
      };
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
