import { db } from "@/auth/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { AdminUserDataType, OrganizerRequest } from "../Intefaces";

export const ADMIN_UID = "bMIAAxoHAQYB5W28RojSpac6iRJ2";
const AddNewOrganizerRequest = async (
  applicantDetails: OrganizerRequest,
  divRef: React.RefObject<HTMLDivElement>
) => {
  const adminUserRef = doc(db, "users_list", ADMIN_UID);
  const docSnap = await getDoc(adminUserRef);
  const adminReqs = docSnap.data() as AdminUserDataType;

  const hasReq = adminReqs.OrganizerRequests.some((el) => {
    if (el.requesterUID === applicantDetails.requesterUID) return true;
    return false;
  });

  if (hasReq) {
    if (divRef?.current?.innerText) {
      divRef.current.innerText = "Already Requested!";
    }
    return;
  }

  await updateDoc(adminUserRef, {
    OrganizerRequests: arrayUnion(applicantDetails),
  });
};

export default AddNewOrganizerRequest;
