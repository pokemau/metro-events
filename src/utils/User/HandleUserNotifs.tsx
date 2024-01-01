import { db } from "@/auth/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ADMIN_UID } from "../Admin/AddNewOrganizerRequest";

export const SendNotifToUser = async (
  newNotif: string,
  targetUserUID: string
) => {
  const userRef = doc(db, "users_list", targetUserUID);

  console.log("rund");
  await updateDoc(userRef, {
    UserNotifications: arrayUnion(newNotif),
  });
};

export const DeleteUserNotif = async (
  targetNotif: string,
  targetUserUID: string
) => {
  const userRef = doc(db, "users_list", targetUserUID);

  console.log(targetNotif, targetUserUID);

  await updateDoc(userRef, {
    UserNotifications: arrayRemove(targetNotif),
  });
};

export const DeleteOrganizerRequest = async () => {
  // delete user req here
  const userRef = doc(db, "users_list", ADMIN_UID);

  await updateDoc(userRef, {
    OrganizerRequests: [],
  });
};
