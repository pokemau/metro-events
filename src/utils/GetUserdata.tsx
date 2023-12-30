import { db } from "@/auth/firebase";
import { doc, getDoc } from "firebase/firestore";

const GetUserData = async (userID: string) => {
  const userDocRef = doc(db, "users_list", userID);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  }
};

export default GetUserData;
