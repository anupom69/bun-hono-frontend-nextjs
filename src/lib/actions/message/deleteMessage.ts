"use server"
import { revalidatePath } from "next/cache";

interface MessagePrevState {
  success?: boolean;
  error?: string;
}

export default async function deleteMessage(
  prevState: MessagePrevState,
  formData: FormData
): Promise<MessagePrevState> {
  try {
    const id = formData.get("id");
    if (!id) {
      return {
        success: false,
        error: "ID is required",
      };
    }
    const response = await fetch(
      `${process.env.BACKEND_URL}/messages/delete-one/${id}`,
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
        success: false,
        error: `Backend Error: ${response.status} ${response.statusText}`,
      };
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
