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
      <button onClick={() => console.log(eventsList[0].data())}>
        CLICK HERE
      </button>
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
        <div key={ev.id} className="bg-red-400">
          <h1>{ev.data().EventTitle}</h1>
          <p>{ev.data().EventDescription}</p>
          <p>{displayDate(ev.data().EventDate?.toDate())}</p>
          <p>{`Participants: ${ev.data().EventParticipantCount}`}</p>
          <p>{`Upvotes: ${ev.data().EventUpvoteCount}`}</p>
        </div>
      ))}
    </>
  );
};

export default Events;
