import React from "react";

const dummyPosts = [
  {
    id: 1,
    title: "Help School Children",
    description: "Raising funds to provide books for underprivileged kids.",
    image: "https://via.placeholder.com/400x200.png?text=School+Fundraiser",
  },
  {
    id: 2,
    title: "Support Animal Shelter",
    description: "Collecting donations for stray dogs and cats.",
    image: "https://via.placeholder.com/400x200.png?text=Animal+Shelter",
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="flex justify-between items-center p-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-blue-600">NFT Tipping App</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Connect Wallet
        </button>
      </header>

      {/* Create Post Button */}
      <div className="p-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow">
          + Create Post
        </button>
      </div>

      {/* Posts Grid */}
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyPosts.map((post) => (
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
