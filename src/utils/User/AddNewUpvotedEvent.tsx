import { db } from "@/auth/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const AddNewUpvotedEvent = async (eventID: string, userID: string) => {
  const userRef = doc(db, "users_list", userID);

  await updateDoc(userRef, {
    UserUpvotedEvents: arrayUnion(eventID),
  });
};

export default AddNewUpvotedEvent;
