import AddEventReview from "@/utils/Event/AddEventReview";
import {
  EventReviewParamsType,
  EventParamsType,
  NormalUserDataType,
  AdminUserDataType,
  OrganizerUserDataType,
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
import { CancelEvent } from "@/utils/Event/CancelEvent";

interface EventProps {
  event: DocumentData;
  userData: NormalUserDataType | AdminUserDataType | OrganizerUserDataType;
  user: User;
}

const Event: React.FC<EventProps> = ({ event, userData, user }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const evData: EventParamsType = event.data();

  const displayToJoinEventMsg = (eventID: string): React.ReactElement => {
    if (!userData) return <></>;

    if (userData.UserEventsJoined?.includes(eventID)) {
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

  const joinEvent = (ev: React.MouseEvent<HTMLDivElement>, eventID: string) => {
    if (!userData.UserEventsJoined.includes(eventID)) {
      AddUserEventJoined(user.uid, eventID);

      const targetDiv = ev.currentTarget;
      if (targetDiv) {
        targetDiv.textContent = "Joined";
      }
    }
  };

  const addReviewToEvent = async (eventID: string) => {
    const reviewContent = textAreaRef.current?.value;

    console.log(reviewContent);

    if (user.displayName && reviewContent) {
      const newReview: EventReviewParamsType = {
        ReviewPoster: user.displayName,
        ReviewContent: reviewContent.toString(),
        ReviewDatePosted: Timestamp.now(),
      };
      AddEventReview(eventID, newReview);

      if (textAreaRef.current) textAreaRef.current.value = "";
    }
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
  const handleCancelEvent = (targetEventID: string) => {
    CancelEvent(targetEventID, userData.UserUID);
  };

  const displayToCancelEvent = (eventID: string) => {
    if (userData.UserType == "user") return <></>;

    if ((userData as AdminUserDataType).EventsOrganized?.includes(eventID)) {
      return (
        <div
          onClick={() => handleCancelEvent(eventID)}
          className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <button>Cancel Event</button>
        </div>
      );
    }
  };

  return (
    <div key={event.id} className="bg-[#f5f5f5] rounded-lg w-[80%] my-2 p-4">
      <div className="flex items-center gap-2 border-gray-300 border-b-[1px] py-1 justify-center">
        <h1 className="font-bold text-3xl">{evData.EventTitle}</h1>
      </div>

      <div className="my-2">
        <p className="break-words text-xl mb-4">{evData.EventDescription}</p>
        <div className="text-gray-600 text-sm mt-4">
          <p>{`Participants: ${evData.EventParticipantCount}`}</p>
          <p>{`Organizer: ${evData.EventOrganizer[1]}`}</p>
          <p>{`Date: ${evData.EventDate.toDate().toLocaleDateString()}`}</p>
        </div>
      </div>

      <div className="flex items-center gap-8 py-2 border-gray-300 border-b-[1px]">
        {displayUpvote(event.id, evData)}
        <div className="flex gap-2">
          {displayToJoinEventMsg(event.id)}
          {displayToCancelEvent(event.id)}
        </div>
      </div>

      <div className="py-2">
        <div className="flex flex-col gap-2">
          <textarea
            ref={textAreaRef}
            maxLength={400}
            className="w-full focus:outline-none p-2 text-lg"></textarea>
          <button
            onClick={() => addReviewToEvent(event.id)}
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
};

export default Event;
