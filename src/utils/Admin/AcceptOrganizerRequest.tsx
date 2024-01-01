import { db } from "@/auth/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { SendNotifToUser } from "../User/HandleUserNotifs";

export const AcceptOrganizerRequest = async (userID: string) => {
  console.log(userID);
  const userDocRef = doc(db, "users_list", userID);

  await updateDoc(userDocRef, {
    UserType: "organizer",
  });
};
