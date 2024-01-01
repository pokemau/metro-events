import { User } from "firebase/auth";
import { useEffect, useState } from "react";

import Notifications from "../Notifications/Notifications";
import GetUserData from "@/utils/User/GetUserdata";
import { NormalUserDataType } from "@/utils/Intefaces";
import Events from "./Events";

interface FeedProps {
  user: User;
}

const Feed: React.FC<FeedProps> = ({ user }) => {
  const [userData, setUserData] = useState<NormalUserDataType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUserData(user.uid);
        if (data) setUserData(data as NormalUserDataType);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex">
      <div className="w-[30%]">
        {userData && user ? (
          <Notifications user={user} userData={userData} />
        ) : (
          <p>LOADING</p>
        )}
      </div>
      <div className="w-[70%]">
        <Events user={user} userData={userData} />
      </div>
    </div>
  );
};

export default Feed;
