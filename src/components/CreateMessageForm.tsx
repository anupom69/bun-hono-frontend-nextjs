"use client";

import { useActionState, useEffect } from "react";
import { People } from "./Messages";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import createMessage from "@/lib/actions/message/createMessage";
import { Alert, AlertTitle } from "./ui/alert";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

export default function MessageUpdateForm({ people }: { people: People[] }) {
  const [createState, createAction, createIsPending] = useActionState(
    createMessage,
    {}
  );
  useEffect(() => {
    if (createState.success) {
      toast.success("Message created successfully", {
        richColors: true,
      });
    }
    if (createState.error) {
      toast.error("Message creation failed", {
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
          <Label htmlFor="content" className="font-bold">
            Message
          </Label>
          <Textarea name="content" className="h-32" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sendToPhone" className="font-bold">
            Send To
          </Label>
          <Select name="sendToPhone">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Send To" />
            </SelectTrigger>
            <SelectContent>
              {people.map((person) => (
                <SelectItem key={person.id} value={person.phone}>
                  {person.name} ({person.phone})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sendAfter" className="font-bold">
            Send After (in days)
          </Label>
          <Input type="number" step={0.0001} min={0} name="sendAfter" />
        </div>
        {/* <DialogClose asChild> */}
          <Button type="submit" disabled={createIsPending} className="mt-4">
            Add
          </Button>
        {/* </DialogClose> */}
      </form>
      {createState.error && (
        <Alert variant="destructive">
          <AlertTitle>{createState.error}</AlertTitle>
        </Alert>
      )}
      {createState.success && (
        <Alert className="text-green-600">
          <AlertTitle>Message Created successfully</AlertTitle>
        </Alert>
      )}
    </div>
  );
}
