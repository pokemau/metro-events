import { Timestamp } from "firebase/firestore";

export interface NormalUserDataType {
  UserUID: string;
  UserEventsJoined: string[];
  UserUpvotedEvents: string[];
  UserType: string;
  UserNotifications: string[];
}

export interface OrganizerUserDataType extends NormalUserDataType {
  EventsOrganized: string[];
}

export interface AdminUserDataType extends NormalUserDataType {
  EventsOrganized: string[];
  OrganizerRequests: OrganizerRequest[];
}

export interface OrganizerRequest {
  requesterUID: string;
  requesterName: string;
}

export interface EventParamsType {
  EventDate: Timestamp;
  EventDescription: string;
  EventOrganizer: string[];
  EventParticipantCount: number;
  EventParticipants: string[];
  EventReviews: EventReviewParamsType[];
  EventTitle: string;
  EventUpvoteCount: number;
}

export interface EventReviewParamsType {
  ReviewPoster: string;
  ReviewContent: string;
  ReviewDatePosted: Timestamp;
}
