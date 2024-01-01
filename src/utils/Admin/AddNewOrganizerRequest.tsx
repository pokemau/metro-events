import { db } from "@/auth/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AdminDataType } from "../Intefaces";

const AddNewOrganizerRequest = async (
  applicantUID: string,
  divRef: React.RefObject<HTMLDivElement>
) => {
  const adminUID = "bMIAAxoHAQYB5W28RojSpac6iRJ2";

  try {
    const documentRef = doc(db, "users_list", adminUID);
    const docSnap = await getDoc(documentRef);
    const adminReqs = docSnap.data() as AdminDataType;

    if (adminReqs.OrganizerRequests.includes(applicantUID)) {
      if (divRef?.current?.innerText) {
        divRef.current.innerText = "Already Requested!";
      }
      return;
    }

    const updatedEventData = {
      ...adminReqs,
      OrganizerRequests: [...adminReqs.OrganizerRequests, applicantUID],
    };

    await updateDoc(documentRef, updatedEventData);
    console.log("ADDED REQUEST");
  } catch {
    console.log("FAILED TO ADD REQUEST");
  }
};

export default AddNewOrganizerRequest;
