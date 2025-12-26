import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import FilterButtons from "../components/FilterButtons";
import { videoAPI } from "../services/api";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Music",
    "Sports",
    "Gaming",
    "Education",
    "Entertainment",
    "Technology",
  ];

  useEffect(() => {
    fetchVideos();
  }, [searchTerm, selectedCategory]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await videoAPI.getVideos(searchTerm, selectedCategory);
      console.log("Videos fetched:", response.data.length);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <FilterButtons
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {loading ? (
        <div className="loading">
          <p>Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="no-videos">
          <p>No videos found</p>
        </div>
      ) : (
        <div className="home__videos">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
