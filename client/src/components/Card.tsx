import axios from "axios";
import { useState, type ReactElement, useEffect } from "react";
import ShareIcon from "./../Icons/ShareIcon";

import TrashIcon from "../Icons/TrashIcon";

interface CardProps {
  id: string;
  title?: string;
  type?: "video" | "twitter" | "note";
  link?: string;
  tags?: string[];
  createdAt?: string;
  icon?: ReactElement;
  actionIcon?: ReactElement;
  deleteIcon?: ReactElement;
  onDelete?: (id: string) => void;
}

const Card = ({
  id,
  title,
  type,
  link,
  tags = [],
  createdAt,
  icon,
  actionIcon,
  deleteIcon,
  onDelete,
}: CardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log("CreatedAt debug:", createdAt);
  }, [createdAt]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      return;
    }
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      setIsDeleting(true);
      setFadeOut(true); // trigger animation

      setTimeout(async () => {
        const res = await axios.delete(
          `http://localhost:5000/api/v1/content/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          onDelete?.(id);
        } else {
          alert(res.data.message || "Failed to delete content");
        }
        setIsDeleting(false);
      }, 300); // match animation duration
    } catch (error) {
      console.error("Error deleting content:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 shadow-md rounded-xl 
        w-80 h-96 m-4 p-4 flex flex-col justify-between
        transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon ?? <ShareIcon />}
          <h1 className="font-semibold text-lg line-clamp-1">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-blue-500 transition-colors">
            {actionIcon ?? <ShareIcon />}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            {deleteIcon ?? <TrashIcon />}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div
        className="
          flex-1 overflow-hidden hover:overflow-y-auto 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        "
      >
        {type === "video" && link && (
          <iframe
            src={link
              .replace("watch?v=", "embed/")
              .replace("youtu.be/", "www.youtube.com/embed/")}
            title="YouTube video player"
            frameBorder="0"
            className="w-full h-48 rounded-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && link && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {type === "note" && (
          <p className="text-gray-700 whitespace-pre-wrap">{link}</p>
        )}
      </div>

      {/* Bottom section */}
      <div className="mt-3">
        {createdAt && (
          <p className="text-xs text-gray-400 mb-2">
            Added on {new Date(createdAt).toLocaleDateString()}
          </p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
