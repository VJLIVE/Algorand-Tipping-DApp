import React, { useEffect, useState } from "react";
import { fetchFundraisers } from "../utils/firestore";
import type { FundraiserPost } from "../utils/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
        <Sprout className="text-green-500" size={28} />
        Active Fundraisers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fundraisers.map((f, idx) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Link
              to={`/fundraiser/${f.id}`}
              className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 hover:border-green-400"
            >
              {/* Image with overlay */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition"></div>
              </div>

              {/* Card Content */}
              <div className="p-5 bg-white">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {f.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-500">
                    By <span className="text-gray-800">{f.creator}</span>
                  </p>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                    Active
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FundraiserList;
