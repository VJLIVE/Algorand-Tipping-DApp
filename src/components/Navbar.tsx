import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, Sprout, Menu, X, Plus } from "lucide-react";
import { useState } from "react";

const Navbar: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => {
  const { account, connectWallet, disconnectWallet } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-lg bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 border-b border-green-600/30 shadow-xl px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50"
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 hover:opacity-90 transition"
        >
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Sprout size={30} strokeWidth={2.5} />
          </motion.div>
          Fundraiser DApp
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "text-green-400 drop-shadow-glow"
                : "text-gray-300 hover:text-green-300"
            }`}
          >
            Home
          </Link>

          {/* Create Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateClick}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-semibold shadow-lg hover:shadow-green-500/30 transition"
          >
            <Plus size={16} />
            Create
          </motion.button>

          {/* Wallet Section */}
          {account ? (
            <>
              <span className="bg-gradient-to-r from-green-700 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-mono tracking-wide shadow-sm">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={disconnectWallet}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-medium shadow hover:shadow-red-500/30 transition"
              >
                <LogOut size={16} />
                Disconnect
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={connectWallet}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:shadow-blue-500/30 transition"
            >
              <LogIn size={18} />
              Connect Wallet
            </motion.button>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-green-400 hover:scale-110 transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-72 h-full bg-gradient-to-b from-black via-gray-900 to-black shadow-2xl z-40 pt-20 px-6 space-y-6 md:hidden border-l border-green-500/20"
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-200 hover:text-green-300 text-base font-medium"
            >
              Home
            </Link>

            <button
              onClick={() => {
                onCreateClick();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-medium shadow hover:shadow-green-500/30 transition"
            >
              <Plus size={16} />
              Create
            </button>

            {account ? (
              <>
                <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-mono tracking-wide shadow">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 w-full rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-medium shadow hover:shadow-red-500/30 transition"
                >
                  <LogOut size={16} />
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  connectWallet();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow hover:shadow-blue-500/30 transition"
              >
                <LogIn size={18} />
                Connect Wallet
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
