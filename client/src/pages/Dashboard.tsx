import { useEffect, useState } from "react";
import axios from "axios";
import AddContent from "../components/AddContent";
import Button from "../components/Button";
import Card from "../components/Card";
import PlusIcon from "../Icons/PlusIcon";
import ShareIcon from "../Icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import ShareComponent from "../components/ShareComponent";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [name, setName] = useState("");
  const [contents, setContents] = useState([]);
  const [shareUrl, setShareUrl] = useState(""); // NEW

  const token = localStorage.getItem("token");
 const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const fetchContents = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setContents(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");
    if (storedData) {
      const userInfo = JSON.parse(storedData);
      const capitalized =
        userInfo.userName.charAt(0).toUpperCase() + userInfo.userName.slice(1);
      setName(capitalized);
    }
    fetchContents();
  }, []);

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 50);
  };

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 300);
  };

  const openShare = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.hash) {
        const fullUrl = `${window.location.origin}/brain/${res.data.hash}`;
        setShareUrl(fullUrl);
        setShowShare(true);
        setTimeout(() => setAnimateModal(true), 50);
      }
    } catch (error) {
      console.error("Error generating share link:", error);
    }
  };

  const closeShare = () => {
    setAnimateModal(false);
    setTimeout(() => setShowShare(false), 300);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-200">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-lg z-30">
      <Sidebar showLogout={true} />

      </div>

      {/* AddContent Modal */}
      {showModal && (
        <>
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-black z-40 transition-opacity duration-300 ${
              animateModal ? "opacity-70" : "opacity-0"
            }`}
          />
          <div
            className={`fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 transform transition-all duration-300 ${
              animateModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <AddContent onClose={closeModal} refreshContents={fetchContents} />
          </div>
        </>
      )}

      {/* Share Modal */}
      {showShare && shareUrl && (
        <>
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-black z-40 transition-opacity duration-300 ${
              animateModal ? "opacity-70" : "opacity-0"
            }`}
          />
          <div
            className={`fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 transform transition-all duration-300 ${
              animateModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <ShareComponent onClose={closeShare} shareUrl={shareUrl} />
          </div>
        </>
      )}

      {/* Top Buttons */}
      <div className="ml-64 flex justify-end gap-2 p-4">
        <Button
          text="Add Content"
          varient="primary"
          startIcon={<PlusIcon />}
          onClick={openModal}
        />
        <Button
          text="Share brain"
          varient="secondary"
          startIcon={<ShareIcon />}
          onClick={openShare}
        />
      </div>

      {/* All Notes */}
      <h1 className="ml-64 pl-12 text-2xl font-bold">
        Welcome Back, {name} — Here’s Your Digital Brain
      </h1>
      <div className="flex flex-wrap gap-6 p-4 ml-64">
        {contents.map((content: any) => (
          <Card
            key={content._id}
            id={content._id}
            title={content.title}
            type={content.type}
            link={content.link}
            tags={content.tag?.map((t: any) => t.title) || []}
            createdAt={content.createdAt}
            icon={<ShareIcon />}
            onDelete={(deletedId) =>
              setContents((prev) => prev.filter((c) => c._id !== deletedId))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
