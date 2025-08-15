import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import ShareIcon from "../Icons/ShareIcon";

const PublicBrain = () => {
  const { shareLink } = useParams();
  const [brainData, setBrainData] = useState<any>(null);

  useEffect(() => {
    if (!shareLink) return;
    axios
      .get(`http://localhost:5000/api/v1/brain/${shareLink}`)
      .then((res) => setBrainData(res.data))
      .catch((err) => console.error(err));
  }, [shareLink]);

  if (!brainData) return <p>Loading shared brain...</p>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-200">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-lg z-30">
      <Sidebar showLogout={false} />

      </div>

      {/* Main content */}
      <h1 className="ml-64 pl-12 text-2xl font-bold mt-6">
        {brainData.username
          ? `Here’s ${brainData.username}'s Digital Brain`
          : "Shared Brain"}
      </h1>

      <div className="flex flex-wrap gap-6 p-4 ml-64">
        {brainData.content?.map((item: any) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.title}
            type={item.type}
            link={item.link}
            tags={item.tags || []}
            createdAt={item.createdAt}
            icon={<ShareIcon />}
            // ❌ No delete handler here, so delete button won't show
            onDelete={undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicBrain;
