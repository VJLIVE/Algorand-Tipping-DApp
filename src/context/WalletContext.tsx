import React, { createContext, useContext, useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

type WalletContextType = {
  account: string | null;
  peraWallet: PeraWalletConnect;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

// Create ONE global instance
const peraWallet = new PeraWalletConnect();

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    // Reconnect existing session
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    });

    // Handle disconnects from the Pera app
    peraWallet.connector?.on("disconnect", () => {
      setAccount(null);
    });
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const disconnectWallet = () => {
    peraWallet.disconnect();
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ account, peraWallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
};
