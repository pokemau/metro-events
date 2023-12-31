import { db } from "@/auth/firebase";
import { EventParamsType, ReviewParamsType } from "@/components/Feed/Events";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const UpdateEventData = async (eventID: string, newReview: ReviewParamsType) => {
  try {
    const documentRef = doc(db, "events", eventID);
    const docSnap = await getDoc(documentRef);
    const eventData = docSnap.data() as EventParamsType;

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
