import { User } from "firebase/auth";
import RequestToBeAnOrganizer from "./RequestToBeAnOrganizer";
import Logout from "../Menu/Logout";
import { AdminUserDataType, NormalUserDataType } from "@/utils/Intefaces";
import CreateNewEvent from "../Menu/CreateNewEvent";
import { SetStateAction, useState } from "react";
import CreateEventModal from "../Modal/CreateEventModal";

export interface NotificationsProps {
  user: User;
  userData: NormalUserDataType;
}

const Notifications: React.FC<NotificationsProps> = ({ user, userData }) => {
  const [showModal, setShowModal] = useState<SetStateAction<boolean>>(false);

  return (
    <div className="w-[30%] h-[100vh] p-2 fixed">
      <div className="bg-[#f5f5f5] w-full h-full rounded-md p-2 flex flex-col justify-between items-center">
        <div className="w-full h-[2.5rem] flex items-center justify-center text-2xl font-bold border-b-[1px] border-gray-300 ">
          <h1>Notifications</h1>
        </div>

        <div className="w-full flex flex-col gap-1 text-center">
          {userData?.userType == "user" ? (
            <RequestToBeAnOrganizer user={user} />
          ) : (
            <></>
          )}
          {userData?.userType != "user" && !showModal ? (
            <CreateNewEvent setShowModal={setShowModal} />
          ) : (
            <></>
          )}
          {showModal ? (
            <CreateEventModal
              user={user}
              userData={userData as AdminUserDataType}
              setShowModal={setShowModal}
            />
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
