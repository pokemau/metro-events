import AddNewOrganizerRequest from "@/utils/Admin/AddNewOrganizerRequest";
import { User } from "firebase/auth";
import { useRef } from "react";

interface RequestToBeAnOrganizer {
  user: User;
}
const RequestToBeAnOrganizer: React.FC<RequestToBeAnOrganizer> = ({ user }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const requestToBeAnOrganizer = () => {
    AddNewOrganizerRequest(user.uid, divRef);
  };
  return (
    <div
      ref={divRef}
      onClick={() => requestToBeAnOrganizer()}
      className="bg-red-400 hover:bg-red-500 p-1 rounded-md cursor-pointer transition-all">
      <button>Request to be an Organizer</button>
    </div>
  );
};

export default RequestToBeAnOrganizer;
