import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FundraiserList from "../components/FundraiserList";
import CreatePost from "../components/CreatePost";

const Home: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onCreateClick={() => setShowCreate(true)} />
      <FundraiserList />
      {showCreate && <CreatePost onClose={() => setShowCreate(false)} />}
    </div>
  );
};

export default Home;
