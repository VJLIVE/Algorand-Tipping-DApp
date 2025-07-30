import React from "react";
import { useWallet } from "../context/WalletContext";

const Navbar: React.FC = () => {
  const { account, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-2xl font-bold text-blue-600">NFT Tipping App</h1>

      {account ? (
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Disconnect ({account.slice(0, 6)}...{account.slice(-4)})
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Navbar;
