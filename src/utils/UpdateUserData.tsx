import { db } from "@/auth/firebase";
import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";

const UpdateUserData = async (userID: string, eventID: string) => {
  try {
    const userDocRef = doc(db, "users_list", userID);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as DocumentData;

      if (!userData.pendingEventsToJoin.includes(eventID)) {
        await updateDoc(userDocRef, {
          pendingEventsToJoin: [...userData.pendingEventsToJoin, eventID],
        });
        return true;
      }
    }
  } catch {
    console.log("EEEEEEEEEEEEERRR");
  }
};

export default UpdateUserData;
