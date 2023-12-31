import { db } from "@/auth/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";

const IncrementEventParticipantCount = async (eventID: string) => {
  const eventDocRef = doc(db, "events", eventID);

  await updateDoc(eventDocRef, {
    EventParticipantCount: increment(1),
  });
};

export default IncrementEventParticipantCount;
