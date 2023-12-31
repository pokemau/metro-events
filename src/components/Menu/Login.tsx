import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth, db } from "@/auth/firebase";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex items-center flex-col h-screen mt-2">
      <h1 className="font-bold text-3xl text-center">Metro Events</h1>

      <div
        onClick={() => signInWithGoogle()}
        className="bg-red-400 hover:bg-red-500 my-4 p-1 rounded-md cursor-pointer transition-all w-[5rem] text-center">
        <button>Login</button>
      </div>
    </div>
  );
};

export default Login;
