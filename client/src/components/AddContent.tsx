import { useState } from "react";
import axios from "axios";
import Input from "./Input";
import CloseIcon from "../Icons/CloseIcon";

interface AddContentProps {
  onClose: () => void;
  refreshContents: () => void;
}

const AddContent = ({ onClose, refreshContents }: AddContentProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");

  const handleAddContent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      return;
    }
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
          tags: tags.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (res.data.success) {
        refreshContents();
        onClose();
        setTitle("");
        setLink("");
        setType("");
        setTags("");
      }
    } catch (error) {
      console.error("Error adding content:", error);
    }
  };
  
  return (
    <div className="bg-white w-[30rem] h-fit rounded-2xl p-6 shadow-xl">
      <div className="flex justify-end mb-4">
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <Input label="Title" placeholder="Enter title" value={title} onChange={setTitle} />
      <Input label="Link" placeholder="Enter link or Notes" value={link} onChange={setLink} />
      <Input label="Type" placeholder="e.g. video, note" value={type} onChange={setType} />
      <Input label="Tags" placeholder="Comma-separated tags" value={tags} onChange={setTags} />

      <button
        onClick={handleAddContent}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Add Content
      </button>
    </div>
  );
};

export default AddContent;
