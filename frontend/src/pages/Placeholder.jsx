// Create a new file: src/pages/Placeholder.jsx
import React from "react";
import { Link } from "react-router-dom";

const Placeholder = ({ pageName }) => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{pageName}</h1>
      <p>This feature is coming soon!</p>
      <Link to="/" style={{ color: "#065fd4", textDecoration: "none" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default Placeholder;
