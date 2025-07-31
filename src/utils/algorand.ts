import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

const algod = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");
const indexer = new algosdk.Indexer("", "https://testnet-idx.algonode.cloud", "");

export interface FundraiserPost {
  title: string;
  description: string;
  image: string;
  creator: string;
  txId: string;
}

// --- helpers ---
function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Create fundraiser transaction
 */
export const createFundraiserTxn = async (
  peraWallet: PeraWalletConnect,
  creator: string,
  metadata: Omit<FundraiserPost, "creator" | "txId">
): Promise<string> => {
  if (!creator) throw new Error("Creator address is missing! Please connect wallet.");

  const params = await algod.getTransactionParams().do();

  const note = new TextEncoder().encode(
    JSON.stringify({ type: "fundraiser", ...metadata })
  );

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: creator,
    receiver: creator,
    amount: 0,
    note,
    suggestedParams: params,
  });

  const txn_b64 = bytesToBase64(algosdk.encodeUnsignedTransaction(txn));

  const signed = await peraWallet.signTransaction([{ txn: txn_b64 } as any]);

  const result: any = await algod.sendRawTransaction(
    signed.map((stx) =>
      typeof stx === "string" ? base64ToBytes(stx) : new Uint8Array(stx)
    )
  ).do();

  return result.txId as string;
};

/**
 * Fetch fundraiser posts
 */
export const fetchFundraisers = async (): Promise<FundraiserPost[]> => {
  const res = await indexer
    .searchForTransactions()
    .notePrefix(new TextEncoder().encode("{"))
    .do();

  const posts = res.transactions
    .map((txn: any) => {
      try {
        if (!txn.note) return null;

        const decoded = JSON.parse(
          new TextDecoder().decode(base64ToBytes(txn.note))
        );

        return decoded.type === "fundraiser"
          ? {
              title: decoded.title,
              description: decoded.description,
              image: decoded.image,
              creator: txn.sender,
              txId: txn.id,
            }
          : null;
      } catch {
        return null;
      }
    })
    .filter((p): p is FundraiserPost => p !== null);

  return posts;
};
