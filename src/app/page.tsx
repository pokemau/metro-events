"use client";

import { auth, db } from "@/auth/firebase";
import Feed from "@/components/Feed/Feed";
import PageLoad from "@/components/Loading/PageLoad";
import Login from "@/components/Menu/Login";
import { UserDataType } from "@/utils/Intefaces";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const setUserDataIfNotExists = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users_list", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const docRef = doc(db, "users_list", userId);
        if (user) {
          const d: UserDataType = {
            uid: user.uid,
            userType: "user",
            upVotes: [],
            eventsJoined: [],
          };
          await setDoc(docRef, d);
        }
      }
    } catch {
      console.log("ERRRRRRRRRRRRRRRRRR");
    }
  };

  if (loading) return <PageLoad />;

  if (user) {
    setUserDataIfNotExists(user.uid);
    return (
      <div>
        <Feed user={user} />
      </div>
    );
  } else return <Login />;
}
