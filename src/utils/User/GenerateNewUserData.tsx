import { db } from "@/auth/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserDataType } from "../Intefaces";
import { User } from "firebase/auth";

const GenerateNewUserData = async (user: User) => {
  const userDocRef = doc(db, "users_list", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    const docRef = doc(db, "users_list", user.uid);
    if (user) {
      const d: UserDataType = {
        uid: user.uid,
        userType: "user",
        UserUpvotedEvents: [],
        eventsJoined: [],
      };
      await setDoc(docRef, d);
    }
  }
};

export default GenerateNewUserData;
