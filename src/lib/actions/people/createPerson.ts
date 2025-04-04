"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface PersonPrevState {
  success?: boolean;
  error?: string;
}

// Define Zod schema
const personSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  phone: z
    .string()
    .regex(/^8801\d{9}$/, "Invalid phone number format. Must be 8801XXXXXXXXX"),
});

export default async function createPerson(
  prevState: PersonPrevState,
  formData: FormData
): Promise<PersonPrevState> {
  try {
    // Validate form data
    const parsedData = personSchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
    });

    if (!parsedData.success) {
      return {
        error: parsedData.error.errors.map((err) => err.message).join(", "),
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/people/create-one`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.USERNAME}:${process.env.PASSWORD}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData.data),
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