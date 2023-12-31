import { db } from "@/auth/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

const IncrementUpvoteEventCount = async (eventID: string) => {
  const eventDocRef = doc(db, "events", eventID);

  await updateDoc(eventDocRef, {
    EventUpvoteCount: increment(1),
  });
};

export default IncrementUpvoteEventCount;
