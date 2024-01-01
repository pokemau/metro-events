import { db } from "@/auth/firebase";
import { collection, addDoc } from "firebase/firestore";
import { EventParamsType } from "../Intefaces";

const AddNewEvent = async (newEvent: EventParamsType) => {
  const eventsRef = collection(db, "events");

  return await addDoc(eventsRef, newEvent);
};

export default AddNewEvent;
