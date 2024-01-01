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
import { User } from "firebase/auth";
import { NormalUserDataType } from "@/utils/Intefaces";
import Event from "./Event/Event";

interface EventsProps {
  user: User;
  userData: NormalUserDataType | undefined;
}

const Events: React.FC<EventsProps> = ({ userData, user }) => {
  const [eventsList, setEventsList] = useState<DocumentData[]>([]);
  const [limitCount, setLimitCount] = useState(30);

  // get feed on load
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
      {eventsList.length != 0 && userData ? (
        <Event eventsList={eventsList} userData={userData} user={user} />
      ) : (
        <p>LOADING</p>
      )}
    </div>
  );
};

export default Events;
