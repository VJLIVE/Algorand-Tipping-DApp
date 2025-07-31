import { db } from "./firebase";
import { addDoc, collection, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";

export interface FundraiserPost {
  id?: string;
  title: string;
  description: string;
  image: string;
  creator: string;
  createdAt?: any;
}

export const createFundraiser = async (post: Omit<FundraiserPost, "id" | "createdAt">) => {
  await addDoc(collection(db, "fundraisers"), {
    ...post,
    createdAt: serverTimestamp(),
  });
};

export const fetchFundraisers = async (): Promise<FundraiserPost[]> => {
  const q = query(collection(db, "fundraisers"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FundraiserPost[];
};
