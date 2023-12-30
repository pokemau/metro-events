"use client";

import { auth, db } from "@/auth/firebase";
import Events from "@/components/Feed/Events";
import PageLoad from "@/components/Loading/PageLoad";
import Login from "@/components/Menu/Login";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const getUserById = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users_list", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        console.log(userDocSnap.data());
      } else {
        const docRef = doc(db, "users_list", userId);
        const d = {
          userType: "user",
          upVotes: [],
          eventsJoined: [],
        };
        await setDoc(docRef, d);
      }
    } catch {}
  };

  if (loading) return <PageLoad />;

  if (user) {
    getUserById(user.uid);
    return (
      <div>
        <Events />
      </div>
    );
  } else return <Login />;
}
