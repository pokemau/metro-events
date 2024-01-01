import { db } from "@/auth/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NormalUserDataType } from "../Intefaces";
import IncrementEventParticipantCount from "../Event/IncrementEventParticipantCount";

const AddUserEventJoined = async (userID: string, eventID: string) => {
  try {
    const userDocRef = doc(db, "users_list", userID);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as NormalUserDataType;

      //////////// FIX THIS SHIT
      if (!userData.eventsJoined.includes(eventID)) {
        await updateDoc(userDocRef, {
          eventsJoined: [...userData.eventsJoined, eventID],
        });
        IncrementEventParticipantCount(eventID);
        return true;
      }
    }
  } catch {
    console.log("EEEEEEEEEEEEERRR");
  }
};

export default AddUserEventJoined;
