import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { channelAPI } from "../services/api";
import VideoCard from "../components/VideoCard";

const Channel = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await channelAPI.getChannel(id);
        setChannel(response.data);
      } catch (error) {
        console.error("Error fetching channel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!channel) return <div>Channel not found</div>;

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${channel.channelBanner})`,
          backgroundSize: "cover",
          height: "200px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src={channel.owner?.avatar}
            alt={channel.owner?.username}
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
          <div>
            <h1 style={{ color: "white", margin: 0 }}>{channel.channelName}</h1>
            <p style={{ color: "white", margin: 0 }}>
              {channel.owner?.username} • {channel.subscribers?.length || 0}{" "}
              subscribers
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <p>{channel.description}</p>

        <h2>Videos ({channel.videos?.length || 0})</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {channel.videos?.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channel;
