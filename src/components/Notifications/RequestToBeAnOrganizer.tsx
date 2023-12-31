import AddNewOrganizerRequest from "@/utils/Admin/AddNewOrganizerRequest";
import { User } from "firebase/auth";

interface RequestToBeAnOrganizer {
  user: User;
}
const RequestToBeAnOrganizer: React.FC<RequestToBeAnOrganizer> = ({ user }) => {
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
