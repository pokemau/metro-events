"use client";

import { db } from "@/auth/firebase";
import {
  DocumentData,
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

// ICONS
import { BiUpvote } from "react-icons/bi";
import Logout from "../Menu/Logout";
import UpdateUserData from "@/utils/UpdateUserData";
import { User } from "firebase/auth";
import UpdateEventData from "@/utils/UpdateEventData";

export interface UserDataType {
  eventsJoined: string[];
  pendingEventsToJoin: string[];
  upVotes: string[];
  userType: string;
}

export interface EventParamsType {
  EventDate: Timestamp;
  EventDescription: string;
  EventOrganizer: string;
  EventParticipantCount: number;
  EventReviews: ReviewParamsType[];
  EventTitle: string;
  EventUpvoteCount: number;
}

export interface ReviewParamsType {
  ReviewPoster: string;
  ReviewContent: string;
  ReviewDatePosted: Timestamp;
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
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const addReviewToEvent = async (eventID: string) => {
    const reviewContent = textAreaRef.current?.value;
    if (!reviewContent) return;

    const newReview: ReviewParamsType = {
      ReviewPoster: user.displayName!,
      ReviewContent: reviewContent?.toString()!,
      ReviewDatePosted: Timestamp.now(),
    };

    UpdateEventData(eventID);

    if (textAreaRef.current) textAreaRef.current.value = "";
  };

  const upvoteEvent = (id: string) => {
    console.log(id);
  };
  return (
    <>
      {eventsList?.map((ev, index) => {
        const evData: EventParamsType = ev.data();
        if (!evData) return null;

        return (
          <div
            key={ev.id}
            className="bg-[#f5f5f5] rounded-lg w-[70%] my-2 mx-auto p-4">
            <div className="flex items-center gap-2 border-gray-300 border-b-[1px] py-1 justify-center">
              <h1 className="font-bold text-3xl">{evData.EventTitle}</h1>
              {/* <p className="text-[#6d6d6d]">
                {displayDate(ev.data().EventDate?.toDate())}
              </p> */}
            </div>

            <div className="my-2">
              <p className="break-words text-xl mb-4">
                {evData.EventDescription}
              </p>
              <p>{`Participants: ${evData.EventParticipantCount}`}</p>
            </div>

            <div className="flex items-center gap-8 py-2 border-gray-300 border-b-[1px]">
              <div className="flex items-center justify-center">
                <div
                  onClick={() => upvoteEvent(ev.id)}
                  className="text-[1.5rem] cursor-pointer hover:text-red-500">
                  <BiUpvote />
                </div>
                <p className="text-[1.1rem]">{evData.EventUpvoteCount}</p>
              </div>

              {displayToJoinEventMsg(ev.id)}
            </div>

            <div className="py-2">
              <div className="flex flex-col gap-2">
                <textarea
                  ref={textAreaRef}
                  maxLength={400}
                  className="w-full focus:outline-none p-2 text-lg"></textarea>
                <button
                  onClick={() => addReviewToEvent(ev.id)}
                  className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
                  Add Review
                </button>
              </div>

              {evData.EventReviews.sort(
                (a, b) =>
                  a.ReviewDatePosted.toMillis() - b.ReviewDatePosted.toMillis()
              ).map((review: ReviewParamsType) => (
                <>
                  <h1>{review.ReviewPoster}</h1>
                  <p>{review.ReviewContent}</p>
                  <p>{review.ReviewDatePosted.toDate().toDateString()}</p>
                </>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Events;
