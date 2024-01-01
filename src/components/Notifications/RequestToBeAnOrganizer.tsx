import AddNewOrganizerRequest from "@/utils/Admin/AddNewOrganizerRequest";
import { OrganizerRequest } from "@/utils/Intefaces";
import { User } from "firebase/auth";
import { useRef } from "react";

interface RequestToBeAnOrganizer {
  user: User;
}
const RequestToBeAnOrganizer: React.FC<RequestToBeAnOrganizer> = ({ user }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const requestToBeAnOrganizer = () => {
    if (user.displayName && user.uid) {
      const applicantDetails: OrganizerRequest = {
        requesterName: user.displayName,
        requesterUID: user.uid,
      };
      AddNewOrganizerRequest(applicantDetails, divRef);
    }
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
