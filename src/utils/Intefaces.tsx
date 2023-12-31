import { Timestamp } from "firebase/firestore";

export interface UserDataType {
  uid: string;
  eventsJoined: string[];
  upVotes: string[];
  userType: string;
}

export interface AdminDataType extends UserDataType {
  OrganizerRequests: string[];
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
