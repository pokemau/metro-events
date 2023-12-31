import { db } from "@/auth/firebase";
import { EventParamsType, ReviewParamsType } from "@/components/Feed/Events";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const UpdateEventData = async (eventID: string) => {
  try {
    const documentRef = doc(db, "events", eventID);
    const docSnap = await getDoc(documentRef);
    const eventData = docSnap.data() as EventParamsType;

    console.log(eventID);

    const newReview: ReviewParamsType = {
      ReviewPoster: "maurice",
      ReviewContent: "wow i like it",
      ReviewDatePosted: Timestamp.now(),
    };

    const updatedEventData = {
      ...eventData,
      EventReviews: [...eventData.EventReviews, newReview],
    };

    await updateDoc(documentRef, updatedEventData);

    console.log("ADDED REVIEW");
  } catch {
    console.log("FAILED TO ADD REVIEW");
  }
};

export default UpdateEventData;
