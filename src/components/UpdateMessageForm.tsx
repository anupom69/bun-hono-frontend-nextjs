"use client";

import updateMessage from "@/lib/actions/message/updateMessage";
import { useActionState, useEffect } from "react";
import { Message, People } from "./Messages";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import deleteMessage from "@/lib/actions/message/deleteMessage";
import { Alert, AlertTitle } from "./ui/alert";
import { DialogClose } from "./ui/dialog";

export default function MessageUpdateForm({
  message,
  people,
}: {
  message: Message;
  people: People[];
}) {
  const [updateState, updateAction, updateIsPending] = useActionState(
    updateMessage,
    {}
  );
  const [deleteState, deleteAction, deleteIsPending] = useActionState(
    deleteMessage,
    {}
  );

  useEffect(() => {
    // console.log(deleteState)
    if (updateState.success) {
      toast.success("Message updated successfully", {
        richColors: true,
      });
    }
    if (updateState.error) {
      toast.error("Message update failed", {
        description: updateState.error,
        duration: 3500,
        richColors: true,
      });
    }
    if (deleteState.success) {
      toast.success("Message deleted successfully", {
        richColors: true,
      });
    }
    if (deleteState.error) {
      toast.error("Message deletion failed", {
        description: deleteState.error,
        duration: 3500,
        richColors: true,
      });
    }
  }, [updateState, deleteState]);

  console.log(deleteState.error, deleteState.success)
  return (
    <div className="space-y-2">
      <form action={updateAction} className="space-y-3 flex flex-col">
        <Input type="text" name="id" hidden defaultValue={message.id} />
        <div className="space-y-2">
          <Label htmlFor="content" className="font-bold">
            Message
          </Label>
          <Textarea
            name="content"
            defaultValue={message.content}
            className="h-32"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sendToPhone" className="font-bold">
            Send To
          </Label>
          <Select name="sendToPhone" defaultValue={message.sendToPhone}>
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
          <Input
            type="number"
            name="sendAfter"
            defaultValue={message.sendAfter}
          />
        </div>
        {/* <DialogClose asChild> */}
          <Button type="submit" disabled={updateIsPending}>
            Update
          </Button>
        {/* </DialogClose> */}
      </form>
      <form action={deleteAction} className="space-y-3 flex flex-col">
        <Input type="text" name="id" hidden defaultValue={message.id} />
        {/* <DialogClose asChild> */}
          <Button type="submit" variant="outline" disabled={deleteIsPending}>
            Delete
          </Button>
        {/* </DialogClose> */}
      </form>
      {updateState.error && (
        <Alert variant="destructive">
          <AlertTitle>{updateState.error}</AlertTitle>
        </Alert>
      )}
      {updateState.success && (
        <Alert className="text-green-600 border-green-600">
          <AlertTitle>Message Updated successfully</AlertTitle>
        </Alert>
      )}
      {deleteState.error && (
        <Alert variant="destructive">
          <AlertTitle>{deleteState.error}</AlertTitle>
        </Alert>
      )}
      {deleteState.success && (
        <Alert className="text-green-600 border-green-600">
          <AlertTitle>Message Deleted successfully</AlertTitle>
        </Alert>
      )}
    </div>
  );
}
