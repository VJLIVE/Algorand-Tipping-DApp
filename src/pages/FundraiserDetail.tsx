import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import type { FundraiserPost } from "../utils/firestore";
import { useWallet } from "../context/WalletContext";

const FundraiserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<FundraiserPost | null>(null);
  const { account } = useWallet(); // ✅ wallet address

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      const docRef = doc(db, "fundraisers", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setPost({ id: snap.id, ...(snap.data() as FundraiserPost) });
      }
    };
    loadPost();
  }, [id]);

  if (!post) return <p className="p-6">Loading...</p>;

  const isCreator = account && post.creator === account;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back
      </Link>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
        <p className="text-gray-700 mt-2">{post.description}</p>

        <div className="mt-4 text-sm text-gray-500">
          <p>Created by: {post.creator}</p>
          <p>
            Created at:{" "}
            {post.createdAt?.toDate
              ? post.createdAt.toDate().toLocaleString()
              : "Unknown"}
          </p>
        </div>

        {/* ✅ Show Donate button only if viewer is NOT the creator */}
        {!isCreator && (
          <button
            onClick={() => alert("Donate flow coming soon!")}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Donate
          </button>
        )}
      </div>
    </div>
  );
};

export default FundraiserDetail;
