import { useState } from "react";
import Input from "./Input";
import CloseIcon from "../Icons/CloseIcon";

interface AddContentProps {
  onClose: () => void;
}

const AddContent = ({ onClose }: AddContentProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");

  const handleAddContent = () => {
    const contentData = { title, link, type, tags };
    console.log("Added Content:", contentData);

    // Optional: Clear inputs
    setTitle("");
    setLink("");
    setType("");
    setTags("");
  };

  return (
    <div className="bg-white w-[30rem] h-fit rounded-2xl p-6 shadow-xl">
      <div className="flex justify-end mb-4">
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <Input label="Title" placeholder="Enter title" value={title} onChange={setTitle} />
      <Input label="Link" placeholder="Enter link" value={link} onChange={setLink} />
      <Input label="Type" placeholder="e.g. YouTube, Twitter" value={type} onChange={setType} />
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
