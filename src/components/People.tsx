import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";
import PersonCreate from "./CreatePersonForm";
import PersonUpdate from "./UpdatePerson";

interface People {
  id: string;
  name: string;
  phone: string;
}

export default async function People() {
  const data = await fetch(`${process.env.BACKEND_URL}/people/all`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.USERNAME}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  });
  if (!data.ok) {
    notFound();
  }
  const people: People[] = await data.json();
  return (
    <div className="cursor-pointer mt-6 md:mt-0">
      <h2 className="text-xl font-bold mb-2">People : </h2>
      <ScrollArea className="max-h-[calc(100vh-180px)] overflow-y-auto pr-4 mb-3">
        {people.map((person: People) => (
          <Person key={person.id} person={person} />
        ))}
      </ScrollArea>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer flex items-center justify-center">
            <UserPlus />
            <span>Add Person</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-lg font-semibold text-center">
            Add Person
          </DialogTitle>
          <PersonCreate />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Person({ person }: { person: People }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="border-1 border-dashed drop-shadow-xl gap-0 hover:bg-ring-offset mb-2">
          <CardHeader className="font-bold">{person.name}</CardHeader>
          <CardContent className="space-y-2">
            <CardDescription>Phone: {person.phone}</CardDescription>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="rounded-xl border-1 border-dotted">
        <DialogTitle className="text-lg font-semibold text-center">
          Update Person
        </DialogTitle>
        <PersonUpdate person={person} />
      </DialogContent>
    </Dialog>
  );
}