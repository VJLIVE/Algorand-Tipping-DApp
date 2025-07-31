import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CreatePost from "./CreatePost";
import { useWallet } from "../context/WalletContext";

type Post = {
  id: number;
  title: string;
  description: string;
  image: string;
  creator: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { account } = useWallet();

  const handleAddPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]); // add to top of feed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Create Post Button */}
      <div className="p-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow"
        >
          + Create Post
        </button>
      </div>

      {/* Show CreatePost Modal */}
      {showForm && account && (
        <CreatePost
          onAddPost={handleAddPost}
          creator={account}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Posts Grid */}
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
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
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
                Contribute
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
