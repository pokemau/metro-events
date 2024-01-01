import { db } from "@/auth/firebase";
import { collection, addDoc } from "firebase/firestore";
import { EventParamsType } from "../Intefaces";

const AddNewEvent = async (newEvent: EventParamsType) => {
  const eventsRef = collection(db, "events");

  const t = await addDoc(eventsRef, newEvent);
  console.log("Document added with ID: ", t.id);
};

export default AddNewEvent;
