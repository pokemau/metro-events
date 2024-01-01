import { db } from "@/auth/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NormalUserDataType } from "../Intefaces";
import { User } from "firebase/auth";

const GenerateNewUserData = async (user: User) => {
  const userDocRef = doc(db, "users_list", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    const docRef = doc(db, "users_list", user.uid);
    if (user) {
      const d: NormalUserDataType = {
        UserUID: user.uid,
        UserType: "user",
        UserUpvotedEvents: [],
        UserEventsJoined: [],
        UserNotifications: [],
      };
      await setDoc(docRef, d);
    }
  }
};

export default GenerateNewUserData;
