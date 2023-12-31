"use client";

import { auth } from "@/auth/firebase";
import Feed from "@/components/Feed/Feed";
import PageLoad from "@/components/Loading/PageLoad";
import Login from "@/components/Menu/Login";
import GenerateNewUserData from "@/utils/User/GenerateNewUserData";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <PageLoad />;

  if (user) {
    GenerateNewUserData(user);
    return (
      <div>
        <Feed user={user} />
      </div>
    );
  } else return <Login />;
}
