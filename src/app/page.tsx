"use client";

import { auth, db } from "@/auth/firebase";
import Events from "@/components/Feed/Events";
import Feed from "@/components/Feed/Feed";
import PageLoad from "@/components/Loading/PageLoad";
import Login from "@/components/Menu/Login";
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
        const d = {
          userType: "user",
          upVotes: [],
          pendingEventsToJoin: [],
          eventsJoined: [],
        };
        await setDoc(docRef, d);
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
