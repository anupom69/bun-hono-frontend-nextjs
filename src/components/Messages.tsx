import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import MessageUpdateForm from "./UpdateMessageForm";
import CreateMessageForm from "./CreateMessageForm";
import { Button } from "./ui/button";
import { MailPlus } from "lucide-react";

export interface Message {
  id: string;
  content: string;
  sendToPhone: string;
  sendAfter: number;
  sendTo: {
    name: string;
  };
  createdAt: Date;
}

export interface People {
  id: string;
  name: string;
  phone: string;
}

export default async function Messages() {
  const data = await fetch(`${process.env.BACKEND_URL}/messages/all`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.USERNAME}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  });
  if (!data.ok) {
    notFound();
  }
  const messages = await data.json();
  const data2 = await fetch(`${process.env.BACKEND_URL}/people/all`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.USERNAME}:${process.env.PASSWORD}`
      ).toString("base64")}`,
    },
  });
  if (!data2.ok) {
    notFound();
  }
  const people: People[] = await data2.json();
  return (
    <div className="md:col-span-2">
      <h2 className="text-xl font-bold mb-2">Messages : </h2>
      <ScrollArea className="max-h-[calc(100vh-180px)] overflow-y-auto pr-4 mb-3">
        {messages.map((message: Message) => (
          <Message key={message.id} message={message} people={people} />
        ))}
      </ScrollArea>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer flex justify-center items-center">
            <MailPlus />
            <span>Add Message</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-lg font-semibold text-center">
            Add Message
          </DialogTitle>
          <CreateMessageForm people={people} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Message({ message, people }: { message: Message; people: People[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="border-1 border-dashed drop-shadow-xl gap-0 mb-2 cursor-pointer">
          <CardHeader className="font-bold">
            {message.content.slice(0, 100)} ...
          </CardHeader>
          <CardContent className="space-y-2">
            <CardDescription>
              Send to: {message.sendTo.name} ({message.sendToPhone})
            </CardDescription>
            <CardDescription>
              Send after: {message.sendAfter} Days
            </CardDescription>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="rounded-xl border-1 border-dotted">
        <DialogTitle className="text-lg font-semibold text-center">
          Update Message
        </DialogTitle>
        <MessageUpdateForm message={message} people={people} />
      </DialogContent>
    </Dialog>
  );
}
