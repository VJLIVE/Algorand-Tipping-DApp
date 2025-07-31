import React, { createContext, useContext, useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

interface WalletContextProps {
  account: string | null;
  peraWallet: PeraWalletConnect;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const peraWallet = new PeraWalletConnect();

  // 🔹 Reconnect existing session on refresh
  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        setAccount(accounts[0]);
      }
    });

    // 🔹 Handle session disconnection (user closes wallet, etc.)
    peraWallet.connector?.on("disconnect", () => {
      setAccount(null);
    });
  }, []);

  const connectWallet = async () => {
    if (account) return; // prevent reconnect error
    try {
      const newAccounts = await peraWallet.connect();
      setAccount(newAccounts[0]);
    } catch (err) {
      console.error("Wallet connect failed", err);
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
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
};
