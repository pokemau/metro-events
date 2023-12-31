import { User } from "firebase/auth";
import RequestToBeAnOrganizer from "./RequestToBeAnOrganizer";
import Logout from "../Menu/Logout";
import { UserDataType } from "@/utils/Intefaces";

export interface NotificationsProps {
  user: User;
  userData: UserDataType;
}

const Notifications: React.FC<NotificationsProps> = ({ user, userData }) => {
  return (
    <div className="w-full h-[100vh] p-2">
      <div className="bg-[#f5f5f5] w-full h-full rounded-md p-2 flex flex-col justify-between items-center">
        <div className="w-full h-[2.5rem] flex items-center justify-center text-2xl font-bold border-b-[1px] border-gray-300 ">
          <h1>Notifications</h1>
        </div>

        <div className="flex flex-col gap-1 text-center">
          {userData?.userType == "user" ? (
            <RequestToBeAnOrganizer user={user} />
          ) : (
            <></>
          )}
          <Logout />
        </div>
      </div>
    </div>
  );
};
1;

export default Notifications;
