import { db } from "@/auth/firebase";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { EventParamsType } from "../Intefaces";
import { SendNotifToUser } from "../User/HandleUserNotifs";

export const CancelEvent = async (
  targetEventUID: string,
  eventOwnerUserUID: string
) => {
  // send notif to user nga na cancel
  const eventRef = doc(db, "events", targetEventUID);
  const eventSnap = await getDoc(eventRef);

  if (eventSnap.exists()) {
    const eventData = eventSnap.data() as EventParamsType;
    eventData.EventParticipants.map(async (participant) => {
      const msg = `${eventData.EventTitle} has been cancelled!`;
      await SendNotifToUser(msg, participant);
    });
  }

  // update user events organized
  const userRef = doc(db, "users_list", eventOwnerUserUID);
  await updateDoc(userRef, {
    EventsOrganized: arrayRemove(targetEventUID),
  });

  // delete event doc from db
  await deleteDoc(doc(db, "events", targetEventUID));
};
