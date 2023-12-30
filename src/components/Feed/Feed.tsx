import { User } from "firebase/auth";
import Events, { UserDataType } from "./Events";
import { useEffect, useState } from "react";
import GetUserData from "@/utils/GetUserdata";

interface FeedProps {
  user: User;
}

const Feed: React.FC<FeedProps> = ({ user }) => {
  const [userData, setUserData] = useState<UserDataType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUserData(user.uid);
        if (data) setUserData(data as UserDataType);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <Events user={user} userData={userData} />
    </div>
  );
};

export default Feed;
