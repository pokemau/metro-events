import AddNewOrganizerRequest from "@/utils/Admin/AddNewOrganizerRequest";
import { NotificationsProps } from "./Notifications";

const RequestToBeAnOrganizer: React.FC<NotificationsProps> = ({ user }) => {
  const requestToBeAnOrganizer = () => {
    AddNewOrganizerRequest(user.uid);
  };
  return (
    <div
      onClick={() => requestToBeAnOrganizer()}
      className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
      <button>Request to be an Organizer</button>
    </div>
  );
};

export default RequestToBeAnOrganizer;
