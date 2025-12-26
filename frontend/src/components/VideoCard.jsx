import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <Link to={`/video/${video._id}`} className="video-card">
      <div className="video-card__thumbnail-container">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="video-card__thumbnail"
          loading="lazy"
        />
      </div>
      <div className="video-card__info">
        <h3 className="video-card__title">{video.title}</h3>
        <p className="video-card__channel">
          {video.channelId?.channelName || "Unknown Channel"}
        </p>
        <div className="video-card__stats">
          <span>{formatViews(video.views)}</span>
          <span> • </span>
          <span>{formatDate(video.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
