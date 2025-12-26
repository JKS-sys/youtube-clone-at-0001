import React from "react";
import { useParams } from "react-router-dom";

const Channel = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Channel Page</h1>
      <p>Channel ID: {id}</p>
      <p>This page will show channel info and videos.</p>
    </div>
  );
};

export default Channel;
