import AddEventReview from "@/utils/Event/AddEventReview";
import {
  EventReviewParamsType,
  EventParamsType,
  UserDataType,
} from "@/utils/Intefaces";
import AddUserEventJoined from "@/utils/User/AddUserEventJoined";
import { User } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";
import { useRef } from "react";
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";

import EventReview from "./EventReview";
import IncrementUpvoteEventCount from "@/utils/Event/IncrementUpvoteEventCount";
import AddNewUpvotedEvent from "@/utils/User/AddNewUpvotedEvent";

interface EventProps {
  eventsList: DocumentData[];
  userData: UserDataType;
  user: User;
}

const Event: React.FC<EventProps> = ({ eventsList, userData, user }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const displayToJoinEventMsg = (eventID: string): React.ReactElement => {
    if (userData.eventsJoined.includes(eventID)) {
      return (
        <div className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <p>Joined</p>
        </div>
      );
    }
    return (
      <div
        onClick={(ev) => joinEvent(ev, eventID)}
        className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
        Join Event
      </div>
    );
  };

  const joinEvent = (ev: React.MouseEvent<HTMLDivElement>, id: string) => {
    AddUserEventJoined(user.uid, id);

    console.log("click");

    const targetDiv = ev.currentTarget;
    if (targetDiv) {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
        <div className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <p>Joined Event</p>
        </div>
      `;

      targetDiv.replaceWith(newDiv);
    }
  };

  const addReviewToEvent = async (eventID: string) => {
    const reviewContent = textAreaRef.current?.value;
    if (!reviewContent) return;

    const newReview: EventReviewParamsType = {
      ReviewPoster: user.displayName!,
      ReviewContent: reviewContent?.toString()!,
      ReviewDatePosted: Timestamp.now(),
    };
    AddEventReview(eventID, newReview);

    if (textAreaRef.current) textAreaRef.current.value = "";
  };

  const upvoteEvent = (eventID: string) => {
    if (!userData.UserUpvotedEvents.includes(eventID)) {
      IncrementUpvoteEventCount(eventID);
      userData.UserUpvotedEvents.push(eventID);
    }
    AddNewUpvotedEvent(eventID, user.uid);
  };

  const displayUpvote = (eventID: string, evData: EventParamsType) => {
    if (userData.UserUpvotedEvents.includes(eventID)) {
      return (
        <div className="flex items-center justify-center">
          <div className="text-[1.5rem] cursor-pointer hover:text-red-500 text-red-500">
            <BiSolidUpvote />
          </div>
          <p className="text-[1.1rem]">{evData.EventUpvoteCount}</p>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <div
          onClick={() => upvoteEvent(eventID)}
          className="text-[1.5rem] cursor-pointer hover:text-red-500">
          <BiUpvote />
        </div>
        <p className="text-[1.1rem]">{evData.EventUpvoteCount}</p>
      </div>
    );
  };
  return (
    <>
      {eventsList?.map((ev) => {
        const evData: EventParamsType = ev.data();
        if (!evData) return null;

        return (
          <div key={ev.id} className="bg-[#f5f5f5] rounded-lg w-[80%] my-2 p-4">
            <div className="flex items-center gap-2 border-gray-300 border-b-[1px] py-1 justify-center">
              <h1 className="font-bold text-3xl">{evData.EventTitle}</h1>
            </div>

            <div className="my-2">
              <p className="break-words text-xl mb-4">
                {evData.EventDescription}
              </p>
              <div className="text-gray-600 text-sm mt-4">
                <p>{`Participants: ${evData.EventParticipantCount}`}</p>
                <p>{`Organizer: ${evData.EventOrganizer[1]}`}</p>
                <p>{`Date: ${evData.EventDate.toDate().toLocaleDateString()}`}</p>
              </div>
            </div>

            <div className="flex items-center gap-8 py-2 border-gray-300 border-b-[1px]">
              {displayUpvote(ev.id, evData)}
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
            </div>

            <div className="max-h-[20rem] overflow-auto">
              {evData.EventReviews.sort(
                (a, b) =>
                  b.ReviewDatePosted.toMillis() - a.ReviewDatePosted.toMillis()
              ).map((review: EventReviewParamsType) => (
                <EventReview EventReview={review} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Event;
