"use client";

import AddNewEvent from "@/utils/Event/AddNewEvent";
import { AdminUserDataType, EventParamsType } from "@/utils/Intefaces";
import AddNewOrganizedEvent from "@/utils/Organizer/AddNewOrganizedEvent";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CreateEventModalProps {
  user: User;
  userData: AdminUserDataType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  user,
  userData,
  setShowModal,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const createEvent = () => {
    const eventTitle = inputRef.current?.value;
    const eventDescription = textareaRef.current?.value;

    const currDate = new Date();
    if (startDate <= currDate || !eventDescription || !eventTitle) return;

    if (eventDescription && eventTitle && userData && user.displayName) {
      const newEvent: EventParamsType = {
        EventDate: Timestamp.fromDate(startDate),
        EventDescription: eventDescription,
        EventOrganizer: [userData.uid.toString(), user.displayName],
        EventParticipantCount: 0,
        EventReviews: [],
        EventTitle: eventTitle,
        EventUpvoteCount: 0,
      };

      AddNewOrganizedEvent(userData.uid, newEvent);
      AddNewEvent(newEvent);

      handleClick();
    }
  };

  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-600 bg-opacity-75 w-[100vw] h-[100vh] fixed top-0 left-0">
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

          <div
            onClick={handleClick}
            className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
