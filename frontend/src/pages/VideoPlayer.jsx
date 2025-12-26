import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { videoAPI } from "../services/api";
import CommentSection from "../components/CommentSection";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await videoAPI.getVideo(id);
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div className="video-container">
        <video
          controls
          src={video.videoUrl}
          style={{ width: "100%", maxHeight: "70vh" }}
        />
      </div>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <p>
        Views: {video.views} • Uploaded:{" "}
        {new Date(video.createdAt).toLocaleDateString()}
      </p>

      <CommentSection videoId={id} comments={video.comments || []} />
    </div>
  );
};

export default VideoPlayer;
