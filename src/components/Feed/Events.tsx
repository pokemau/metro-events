"use client";

import { db } from "@/auth/firebase";
import {
  DocumentData,
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// ICONS
import { BiUpvote } from "react-icons/bi";

const Events = () => {
  const [eventsList, setEventsList] = useState<DocumentData[]>([]);
  const [limitCount, setLimitCount] = useState(30);

  useEffect(() => {
    const q = query(
      collection(db, "events"),
      orderBy("EventDate", "desc"),
      limit(limitCount)
    );
    const unsub = onSnapshot(q, (snapShot) => {
      setEventsList(snapShot.docs.map((doc) => doc));
    });

    return () => {
      unsub();
    };
  }, [limitCount]);

  return (
    <div>
      {eventsList.length != 0 ? (
        <Event eventsList={eventsList} />
      ) : (
        <p>LOADING</p>
      )}
    </div>
  );
};

interface EventProps {
  eventsList: DocumentData[];
}

const Event: React.FC<EventProps> = ({ eventsList }) => {
  const displayDate = (dateObj: Date): string => {
    const currDate = new Date();
    const sentDate = dateObj?.getDate();

    if (currDate.getDate() === sentDate) {
      return "Today";
    } else if (currDate.getDate() - 1 === sentDate) return "Yesterday";

    return dateObj?.toLocaleDateString();
  };
  return (
    <>
      {eventsList?.map((ev, index) => (
        <div
          key={ev.id}
          className="bg-[#f5f5f5] rounded-lg w-[50%] my-2 mx-auto p-4">
          <div className="flex items-center gap-4 border-gray-300 border-b-[1px] py-1">
            <h1 className="font-bold text-3xl">{ev.data().EventTitle}</h1>
            <p className="text-[#6d6d6d]">
              on {displayDate(ev.data().EventDate?.toDate())}
            </p>
          </div>

          <div className="my-2">
            <p className="break-words text-xl">{ev.data().EventDescription}</p>
            <p>{`Participants: ${ev.data().EventParticipantCount}`}</p>
          </div>

          <div className="flex items-center">
            <div className="text-[1.5rem] cursor-pointer hover:text-red-500">
              <BiUpvote />
            </div>
            <p className="text-[1.1rem]">{ev.data().EventUpvoteCount}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Events;
