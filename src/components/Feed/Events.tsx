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
import Logout from "../Menu/Logout";
import UpdateUserData from "@/utils/UpdateUserData";
import { User } from "firebase/auth";

export interface UserDataType {
  eventsJoined: string[];
  pendingEventsToJoin: string[];
  upVotes: string[];
  userType: string;
}

interface EventsProps {
  user: User;
  userData: UserDataType | undefined;
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
      <Logout />
      {eventsList.length != 0 && userData ? (
        <Event eventsList={eventsList} userData={userData} user={user} />
      ) : (
        <p>LOADING</p>
      )}
    </div>
  );
};

interface EventProps {
  eventsList: DocumentData[];
  userData: UserDataType;
  user: User;
}

const Event: React.FC<EventProps> = ({ eventsList, userData, user }) => {
  const displayDate = (dateObj: Date): string => {
    const currDate = new Date();
    const sentDate = dateObj?.getDate();

    let dayStr = "Happening ";

    if (currDate.getDate() === sentDate) {
      return dayStr + "Today";
    } else if (currDate.getDate() - 1 === sentDate) return "Yesterday";

    return "on" + dateObj?.toLocaleDateString();
  };

  const displayToJoinEventMsg = (eventID: string): React.ReactElement => {
    if (userData.eventsJoined.includes(eventID))
      return (
        <div className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <p>Joined Event</p>
        </div>
      );
    else if (userData.pendingEventsToJoin.includes(eventID)) {
      return (
        <div className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <p>Pending</p>
        </div>
      );
    }

    return (
      <div
        onClick={(ev) => requestToJoin(ev, eventID)}
        className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
        Request To Join
      </div>
    );
  };

  const requestToJoin = (ev: React.MouseEvent<HTMLDivElement>, id: string) => {
    UpdateUserData(user.uid, id);

    console.log("click");

    const targetDiv = ev.currentTarget;
    if (targetDiv) {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
      <div className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
        <p>Pending</p>
      </div>`;

      targetDiv.replaceWith(newDiv);
    }
  };

  const upvoteEvent = (id: string) => {
    console.log(id);
  };
  return (
    <>
      {eventsList?.map((ev, index) => (
        <div
          key={ev.id}
          className="bg-[#f5f5f5] rounded-lg w-[50%] my-2 mx-auto p-4">
          <div className="flex items-center gap-2 border-gray-300 border-b-[1px] py-1">
            <h1 className="font-bold text-3xl">{ev.data().EventTitle}</h1>
            <p className="text-[#6d6d6d]">
              {displayDate(ev.data().EventDate?.toDate())}
            </p>
          </div>

          <div className="my-2">
            <h3>Event Details:</h3>
            <p className="break-words text-xl mb-4">
              {ev.data().EventDescription}
            </p>
            <p>{`Participants: ${ev.data().EventParticipantCount}`}</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center justify-center">
              <div
                onClick={() => upvoteEvent(ev.id)}
                className="text-[1.5rem] cursor-pointer hover:text-red-500">
                <BiUpvote />
              </div>
              <p className="text-[1.1rem]">{ev.data().EventUpvoteCount}</p>
            </div>

            {displayToJoinEventMsg(ev.id)}
          </div>
        </div>
      ))}
    </>
  );
};

export default Events;
