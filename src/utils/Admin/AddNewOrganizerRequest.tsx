import { db } from "@/auth/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { AdminUserDataType } from "../Intefaces";

const AddNewOrganizerRequest = async (
  applicantUID: string,
  divRef: React.RefObject<HTMLDivElement>
) => {
  const adminUID = "bMIAAxoHAQYB5W28RojSpac6iRJ2";

  try {
    const adminUserRef = doc(db, "users_list", adminUID);
    const docSnap = await getDoc(adminUserRef);
    const adminReqs = docSnap.data() as AdminUserDataType;

    if (adminReqs.OrganizerRequests.includes(applicantUID)) {
      if (divRef?.current?.innerText) {
        divRef.current.innerText = "Already Requested!";
      }
      return;
    }

    await updateDoc(adminUserRef, {
      OrganizerRequests: arrayUnion(applicantUID),
    });

    console.log("ADDED REQUEST");
  } catch {
    console.log("FAILED TO ADD REQUEST");
  }
};

export default AddNewOrganizerRequest;
