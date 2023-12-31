import { db } from "@/auth/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ReviewParamsType } from "../Intefaces";

const AddEventReview = async (eventID: string, newReview: ReviewParamsType) => {
  try {
    const eventRef = doc(db, "events", eventID);

    await updateDoc(eventRef, {
      EventReviews: arrayUnion(newReview),
    });

    console.log("ADDED REVIEW");
  } catch {
    console.log("FAILED TO ADD REVIEW");
  }
};

export default AddEventReview;
