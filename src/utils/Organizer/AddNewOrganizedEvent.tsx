import { db } from "@/auth/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { EventParamsType } from "../Intefaces";

const AddNewOrganizedEvent = async (userID: string, newEventID: string) => {
  const userRef = doc(db, "users_list", userID);

  await updateDoc(userRef, {
    EventsOrganized: arrayUnion(newEventID),
  });
};

export default AddNewOrganizedEvent;
