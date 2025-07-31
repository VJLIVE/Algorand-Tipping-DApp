import React, { useEffect, useState } from "react";
import { fetchFundraisers } from "../utils/firestore";
import type { FundraiserPost } from "../utils/firestore";

const FundraiserList: React.FC = () => {
  const [fundraisers, setFundraisers] = useState<FundraiserPost[]>([]);

  useEffect(() => {
    const load = async () => {
      const posts = await fetchFundraisers();
      setFundraisers(posts);
    };
    load();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {fundraisers.map(f => (
        <div key={f.id} className="bg-white p-4 rounded-lg shadow">
          <img src={f.image} alt={f.title} className="w-full h-40 object-cover rounded" />
          <h3 className="text-lg font-bold mt-2">{f.title}</h3>
          <p className="text-gray-600">{f.description}</p>
          <p className="text-xs text-gray-500 mt-1">By {f.creator}</p>
        </div>
      ))}
    </div>
  );
};

export default FundraiserList;
