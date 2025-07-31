import React, { useState } from "react";
import { uploadToPinata } from "../utils/pinata";

type Post = {
  id: number;
  title: string;
  description: string;
  image: string;
  creator: string; // wallet address
};

interface CreatePostProps {
  onAddPost: (post: Post) => void;
  creator: string | null;
  onClose: () => void; // close modal/form after submit
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost, creator, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !creator) {
      alert("Please connect wallet & upload an image!");
      return;
    }

    try {
      setLoading(true);
      // Upload image to IPFS (Pinata)
      const ipfsUrl = await uploadToPinata(file);

      const newPost: Post = {
        id: Date.now(),
        title,
        description,
        image: ipfsUrl,
        creator,
      };

      onAddPost(newPost);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image/post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Create Fundraiser</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Create Post"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
