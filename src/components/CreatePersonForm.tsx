"use client";

import { useActionState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import createPerson from "@/lib/actions/people/createPerson";
import { Alert, AlertTitle } from "./ui/alert";
import { toast } from "sonner";
import { DialogClose } from "./ui/dialog";

export default function PersonCreate() {
  const [createState, createAction, createIsPending] = useActionState(
    createPerson,
    {}
  );
  useEffect(() => {
    if (createState.success) {
      toast.success("Person created successfully", {
        richColors: true,
      });
    }
    if (createState.error) {
      toast.error("Person creation failed", {
        description: createState.error,
        duration: 3500,
        richColors: true,
      });
    }
  }, [createState]);

  return (
    <div className="space-y-2">
      <form action={createAction} className="space-y-3 flex flex-col">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-bold">
            Name
          </Label>
          <Input name="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-bold">
            Phone
          </Label>
          <Input name="phone" />
        </div>
        {/* <DialogClose asChild> */}
          <Button type="submit" disabled={createIsPending} className="mt-4">
            Add
          </Button>
        {/* </DialogClose> */}
      </form>
    </div>
  );
}
