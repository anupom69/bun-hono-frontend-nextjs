"use client";

import { useActionState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import updatePerson from "@/lib/actions/people/updatePerson";
import { People } from "./Messages";
import deletePerson from "@/lib/actions/people/deletePerson";
import { Alert, AlertTitle } from "./ui/alert";
import { DialogClose } from "./ui/dialog";
import { toast } from "sonner";

export default function PersonUpdate({ person }: { person: People }) {
  const [updateState, updateAction, updateIsPending] = useActionState(
    updatePerson,
    {}
  );
  const [deleteState, deleteAction, deleteIsPending] = useActionState(
    deletePerson,
    {}
  );
  useEffect(() => {
    if (updateState.success) {
      toast.success("Person updated successfully", {
        richColors: true
      });
    }
    if (updateState.error) {
      toast.error("Person update failed", {
        description: updateState.error,
        duration: 3500,
        richColors: true,
      });
    }
    if (deleteState.success) {
      toast.success("Person deleted successfully", {
        richColors: true
      });
    }
    if (deleteState.error) {
      toast.error("Person deletion failed", {
        description: deleteState.error,
        duration: 3500,
        richColors: true,
      });
    }
  }, [updateState, deleteState]);
  return (
    <div className="space-y-2">
      <form action={updateAction} className="space-y-3 flex flex-col">
        <Input type="text" name="id" hidden defaultValue={person.id} />
        <div className="space-y-2">
          <Label htmlFor="name" className="font-bold">
            Name
          </Label>
          <Input name="name" defaultValue={person.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-bold">
            Phone
          </Label>
          <Input name="phone" defaultValue={person.phone} />
        </div>
        {/* <DialogClose asChild> */}
          <Button type="submit" disabled={updateIsPending} className="mt-4">
            Update
          </Button>
        {/* </DialogClose> */}
      </form>
      <form action={deleteAction} className="space-y-3 flex flex-col">
        <Input type="text" name="id" hidden defaultValue={person.id} />
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
          <AlertTitle>Person Updated successfully</AlertTitle>
        </Alert>
      )}
    </div>
  );
}
