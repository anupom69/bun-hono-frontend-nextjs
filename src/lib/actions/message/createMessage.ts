"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface MessagePrevState {
  success?: boolean;
  error?: string;
}

// Define Zod schema
const messageSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
  sendToPhone: z
    .string()
    .regex(/^8801\d{9}$/, "Invalid phone number format. Must be 8801XXXXXXXXX"),
  sendAfter: z
    .number()
    .min(1, "Send after is required and minimum after 1 day"), // Adjust type if necessary (e.g., date/time validation)
});

export default async function createMessage(
  prevState: MessagePrevState,
  formData: FormData
): Promise<MessagePrevState> {
  try {
    // Validate form data
    const parsedData = messageSchema.safeParse({
      content: formData.get("content"),
      sendToPhone: formData.get("sendToPhone"),
      sendAfter: Number(formData.get("sendAfter")),
    });

    if (!parsedData.success) {
      return {
        error: parsedData.error.errors.map((err) => err.message).join(", "),
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/messages/create-one`,
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