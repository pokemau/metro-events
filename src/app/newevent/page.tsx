"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function page() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createEvent = () => {
    const eventTitle = inputRef.current?.value;
    const eventDescription = textareaRef.current?.value;

    const currDate = new Date();
    if (startDate <= currDate || !eventDescription || !eventTitle) return;

    console.log(eventTitle, eventDescription, startDate);
  };

  return (
    <div className="bg-[#f5f5f5] w-[40rem] mx-auto my-4 p-2 rounded-md">
      <div className="mb-5">
        <div>
          <h1 className="text-2xl font-bold">Event Title: </h1>
          <input
            ref={inputRef}
            maxLength={55}
            className="rounded-md p-2 focus:outline-none w-full"
            type="text"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Event Details:</h1>
          <textarea
            ref={textareaRef}
            maxLength={500}
            className="rounded-md p-2 focus:outline-none w-full"></textarea>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Event Date: </h1>
          <DatePicker
            className="rounded-md p-2 focus:outline-none w-full"
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <div
          onClick={() => createEvent()}
          className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <button>Create</button>
        </div>

        <Link
          href="/"
          className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}
