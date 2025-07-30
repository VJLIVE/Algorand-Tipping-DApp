import React from "react";

interface NavbarProps {
  onConnect?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onConnect }) => {
  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-2xl font-bold text-blue-600">NFT Tipping App</h1>
      <button
        onClick={onConnect}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Connect Wallet
      </button>
    </header>
  );
};

export default Navbar;
