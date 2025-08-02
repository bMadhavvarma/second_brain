import { useState } from "react";
import AddContent from "./components/AddContent";
import Button from "./components/Button";
import Card from "./components/Card";
import PlusIcon from "./Icons/PlusIcon";
import ShareIcon from "./Icons/ShareIcon";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => setAnimateModal(true), 50);
  };

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 300);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gray-200">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-lg z-30">
        <Sidebar />
      </div>

      {/* Overlay + Modal */}
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
            <AddContent onClose={closeModal} />
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
        />
      </div>

      {/* All Notes */}
      <h1 className="ml-64 pl-12 text-2xl font-bold">All Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ml-64 ">
        <Card
          title="hello"
          icon={<PlusIcon />}
          type="youtube"
          link="https://youtu.be/c2M-rlkkT5o?si=I3vAUiVbDlU5pH9N"
        />
        <Card
          title="namstey"
          icon={<ShareIcon />}
          type="youtube"
          link="https://youtu.be/jO9DaqRG6vg?si=eEY0PhEivsW-uCKw"
        />
        <Card
          title="twitter post"
          icon={<ShareIcon />}
          type="twitter"
          link="https://twitter.com/elonmusk/status/1234567890"
        />
        <Card
          title="twitter post"
          icon={<ShareIcon />}
          type="twitter"
          link="https://x.com/narendramodi/status/1948622470996517077"
        />
      </div>
    </div>
  );
};

export default Dashboard;
