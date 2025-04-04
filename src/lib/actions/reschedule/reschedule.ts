"use server"

import { revalidatePath } from "next/cache";

interface RescheduleState {
    success: boolean;
    error?: string;
}

export default async function reschedule(): Promise<RescheduleState> {
    try {

        const response = await fetch(`${process.env.BACKEND_URL}/messages/reschedule`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.USERNAME}:${process.env.PASSWORD}`
                ).toString("base64")}`,
            },
        })
        if (!response.ok) {
            return { success: false };
        }
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
    }
}
