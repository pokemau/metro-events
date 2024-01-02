import { User } from "firebase/auth";
import RequestToBeAnOrganizer from "./RequestToBeAnOrganizer";
import Logout from "../Menu/Logout";
import { AdminUserDataType, NormalUserDataType } from "@/utils/Intefaces";
import CreateNewEvent from "../Menu/CreateNewEvent";
import { SetStateAction, useState } from "react";
import CreateEventModal from "../Modal/CreateEventModal";
import { AcceptOrganizerRequest } from "@/utils/Admin/AcceptOrganizerRequest";
import {
  DeleteOrganizerRequest,
  DeleteUserNotif,
  SendNotifToUser,
} from "@/utils/User/HandleUserNotifs";

export interface NotificationsProps {
  user: User;
  userData: NormalUserDataType | AdminUserDataType;
}

const Notifications: React.FC<NotificationsProps> = ({ user, userData }) => {
  const [showModal, setShowModal] = useState<SetStateAction<boolean>>(false);

  const handleAcceptOrganizerReq = async (
    reqUID: string,
    targetNotif: string
  ) => {
    AcceptOrganizerRequest(reqUID);
    SendNotifToUser(
      `Your request to be an organizer has been approved!`,
      reqUID
    );
    DeleteOrganizerRequest();
  };

  const handleDeclineOrganizerReq = async (reqUID: string, reqName: string) => {
    SendNotifToUser(
      `Your request to be an organizer has been declined!`,
      reqUID
    );
    DeleteOrganizerRequest();
  };

  const showOrganizerRequests = () => {
    if (!userData) return;

    if (userData.UserType != "admin") return <></>;

    return (userData as AdminUserDataType).OrganizerRequests.map((req) => (
      <div key={req.requesterUID}>
        <p>{req.requesterName} wants to be an organizer!</p>
        <div className="flex gap-1 items-center justify-center">
          <div
            onClick={() =>
              handleAcceptOrganizerReq(req.requesterUID, req.requesterName)
            }
            className="w-full bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
            <button>Accept</button>
          </div>

          <div
            onClick={() =>
              handleDeclineOrganizerReq(req.requesterUID, req.requesterName)
            }
            className="w-full bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
            <button>Decline</button>
          </div>
        </div>
      </div>
    ));
  };

  const handleDeleteNotif = async (notif: string) => {
    DeleteUserNotif(notif, userData.UserUID);
  };

  const showEventNotifications = () => {
    if (!userData) return;

    return userData.UserNotifications?.map((notif) => (
      <div key={notif} className="w-full">
        <p>{notif}</p>
        <div
          onClick={() => handleDeleteNotif(notif)}
          className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
          <button>Delete</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-[30%] h-[100vh] p-2 fixed">
      <div className="bg-[#f5f5f5] w-full h-full rounded-md p-2 flex flex-col items-center">
        <div className="w-full h-[2.5rem] flex items-center justify-center text-2xl font-bold border-b-[1px] border-gray-300 ">
          <h1>Notifications</h1>
        </div>

        <div className="w-full">
          {showOrganizerRequests()}
          {showEventNotifications()}
        </div>

        <div className="mt-auto w-full flex flex-col gap-1 text-center">
          {userData?.UserType == "user" ? (
            <RequestToBeAnOrganizer user={user} />
          ) : (
            <></>
          )}
          {userData?.UserType != "user" && !showModal ? (
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
