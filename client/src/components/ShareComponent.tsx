import React from "react";
import { FaWhatsapp, FaTelegramPlane, FaEnvelope, FaTimes } from "react-icons/fa";

interface ShareComponentProps {
  onClose: () => void;
  shareUrl: string;
}

const ShareComponent: React.FC<ShareComponentProps> = ({ onClose, shareUrl }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        <FaTimes size={18} />
      </button>

      <h2 className="text-lg font-bold mb-4">Share this link</h2>

      <div className="flex justify-around mb-4">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:scale-110 transition-transform"
        >
          <FaWhatsapp size={32} />
        </a>

        <a
          href={`mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:scale-110 transition-transform"
        >
          <FaEnvelope size={32} />
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500 hover:scale-110 transition-transform"
        >
          <FaTelegramPlane size={32} />
        </a>
      </div>

      <div className="flex items-center border rounded p-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-grow outline-none text-sm"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
