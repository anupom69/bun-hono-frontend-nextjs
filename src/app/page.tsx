import Messages from "@/components/Messages";
import People from "@/components/People";
import Rescheduler from "@/components/Rescheduler";
import { Badge } from "@/components/ui/badge";

export default async function page() {
  if (!process.env.BACKEND_URL) {
    return <p>Backend URL not found</p>;
  }
  let data;
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/time-left`, {
      method: "GET",
    });
    data = await response.json();
    if (response.status != 200) {
      <div className="h-screen grid place-items-center">
        <h1 className="font-bold text-4xl">Backend Cannot Be Accessed</h1>
      </div>;
    }
  } catch (e) {
    console.error(e);
    return (
      <div className="h-screen grid place-items-center">
        <h1 className="font-bold text-4xl">Backend Cannot Be Accessed</h1>
      </div>
    );
  }
  return (
    <div className="container p-5 mx-auto max-w-5xl">
      <div className="scale-75 md:scale-100 flex justify-center items-center pb-3 border-b-2 border-dashed gap-3 text-primary">
        <Badge variant="default" className="text-[16px] font-bold p-1 px-3">{data.timeLeft} h</Badge>
        <h1 className="text-xl font-bold">Message Scheduler</h1>
        <Rescheduler />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
        <Messages />
        <People />
      </div>
    </div>
  );
}
