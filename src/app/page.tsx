"use client";

import { auth } from "@/auth/firebase";
import Events from "@/components/Feed/Events";
import PageLoad from "@/components/Loading/PageLoad";
import Login from "@/components/Menu/Login";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <PageLoad />;

  if (user)
    return (
      <div>
        <Events />
      </div>
    );
  else return <Login />;
}
