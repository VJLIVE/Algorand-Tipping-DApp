import React from "react";
import { useWallet } from "../context/WalletContext";

const Navbar: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-green-600">🌱 Fundraiser DApp</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={onCreateClick}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Create
        </button>

        {account ? (
          <button
            onClick={disconnectWallet}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            {account.slice(0, 6)}...{account.slice(-4)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
