export const uploadToPinata = async (file: File): Promise<string> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok && data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } else {
      console.error("Pinata Error Response:", data);
      throw new Error(JSON.stringify(data));
    }
  } catch (err) {
    console.error("Pinata Upload Error:", err);
    throw err; // ensures it never returns undefined
  }
};