import { Timestamp } from "firebase/firestore";

export interface NormalUserDataType {
  uid: string;
  eventsJoined: string[];
  UserUpvotedEvents: string[];
  userType: string;
}

export interface OrganizerUserDataType extends NormalUserDataType {
  EventsOrganized: EventParamsType[];
}

export interface AdminUserDataType extends NormalUserDataType {
  EventsOrganized: EventParamsType[];
  OrganizerRequests: string[];
}

export interface EventParamsType {
  EventDate: Timestamp;
  EventDescription: string;
  EventOrganizer: string[];
  EventParticipantCount: number;
  EventReviews: EventReviewParamsType[];
  EventTitle: string;
  EventUpvoteCount: number;
}

export interface EventReviewParamsType {
  ReviewPoster: string;
  ReviewContent: string;
  ReviewDatePosted: Timestamp;
}
