import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth/firebase";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex items-center flex-col h-screen mt-2">
      <h1 className="font-bold text-3xl text-center">Metro Events</h1>

      <Link href="/">
        <button
          className="btn mt-4 px-4 transition-all"
          onClick={() => signInWithGoogle()}>
          Login
        </button>
      </Link>
    </div>
  );
};

export default Login;
