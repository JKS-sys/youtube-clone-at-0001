import React from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Video Player Page</h1>
      <p>Video ID: {id}</p>
      <p>This page will show the video player, comments, etc.</p>
    </div>
  );
};

export default VideoPlayer;
