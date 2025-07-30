import React, { createContext, useContext, useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

type WalletContextType = {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

const peraWallet = new PeraWalletConnect();

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  // Try reconnecting on page load
  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    });

    // Disconnect handler (if user disconnects in Pera app)
    peraWallet.connector?.on("disconnect", () => {
      setAccount(null);
    });
  }, []);

  // Connect to wallet
  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    peraWallet.disconnect();
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
};
