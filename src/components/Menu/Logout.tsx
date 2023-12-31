"use client";

import { auth } from "@/auth/firebase";
import { useSignOut } from "react-firebase-hooks/auth";

const Logout = () => {
  const [signOut, loading, error] = useSignOut(auth);

  if (loading) return <h1>Logging Out</h1>;

  return (
    <div
      onClick={() => signOut()}
      className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
      <button>Logout</button>
    </div>
  );
};

export default Logout;
