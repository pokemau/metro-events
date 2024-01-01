import { db } from "@/auth/firebase";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";

const IncrementEventParticipantCount = async (
  eventID: string,
  userID: string
) => {
  const eventDocRef = doc(db, "events", eventID);

  await updateDoc(eventDocRef, {
    EventParticipantCount: increment(1),
    EventParticipants: arrayUnion(userID),
  });
};

export default IncrementEventParticipantCount;
