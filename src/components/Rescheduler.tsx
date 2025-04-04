"use client";
import { Button } from "@/components/ui/button";
import reschedule from "@/lib/actions/reschedule/reschedule";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function Rescheduler() {
    const [rescheduleState, rescheduleAction, rescheduleIsPending] = useActionState(reschedule, { success: false });
    useEffect(() => {
        if (rescheduleState.success) {
            toast.success("Messages rescheduled successfully", {
                richColors: true
            });
        } else if (rescheduleState.error) {
            toast.error("Messages rescheduling failed", {
                duration: 3500,
                richColors: true,
            });
        }
    }, [rescheduleState]);
  return (
    <form action={rescheduleAction}>
      <Button disabled={rescheduleIsPending} variant="default" type="submit" className="cursor-pointer font-bold text-[16px]">Reschedule</Button>
    </form>
  )
}
