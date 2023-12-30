import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth, db } from "@/auth/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex items-center flex-col h-screen mt-2">
      <h1 className="font-bold text-3xl text-center">Metro Events</h1>

      <button
        className="btn mt-4 px-4 transition-all"
        onClick={() => signInWithGoogle()}>
        Login
      </button>
    </div>
  );
};

export default Login;
