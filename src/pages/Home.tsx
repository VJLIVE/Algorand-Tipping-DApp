import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchFundraisers } from "../utils/algorand";
import CreatePost from "./CreatePost";
import { useWallet } from "../context/WalletContext";

type Post = {
  title: string;
  description: string;
  image: string;
  creator: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const { account } = useWallet();

  const loadPosts = async () => {
    const data = await fetchFundraisers();
    setPosts(data as Post[]);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-4 flex justify-end">
        {account && (
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
          >
            + New Fundraiser
          </button>
        )}
      </div>

      {/* Posts Grid */}
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">{post.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                by {post.creator.slice(0, 6)}...{post.creator.slice(-4)}
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
                Contribute
              </button>
            </div>
          </div>
        ))}
      </main>

      {showCreate && (
        <CreatePost
          onClose={() => {
            setShowCreate(false);
            loadPosts(); // refresh after creating
          }}
        />
      )}
    </div>
  );
};

export default Home;
