import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";

const CommentSection = ({ videoId, comments, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      // In a real app, you would call an API
      // await videoAPI.addComment(videoId, newComment);
      console.log("Adding comment:", newComment);
      setNewComment("");
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comment-section__title">
        {comments?.length || 0} Comments
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="comment-section__form">
          <div className="comment-section__input-group">
            <img
              src={user.avatar}
              alt={user.username}
              className="comment-section__avatar"
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-section__input"
            />
          </div>
          <button
            type="submit"
            className="comment-section__submit"
            disabled={!newComment.trim()}
          >
            Comment
          </button>
        </form>
      ) : (
        <div className="comment-section__login-prompt">
          <p>Please log in to leave a comment.</p>
        </div>
      )}

      <div className="comment-section__list">
        {comments?.map((comment, index) => (
          <div key={index} className="comment">
            <img
              src={comment.userId?.avatar || "https://via.placeholder.com/40"}
              alt={comment.userId?.username || "User"}
              className="comment__avatar"
            />
            <div className="comment__content">
              <div className="comment__header">
                <span className="comment__author">
                  {comment.userId?.username || "Anonymous"}
                </span>
                <span className="comment__date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="comment__text">{comment.text}</p>
              <div className="comment__actions">
                <button className="comment__action">👍 Like</button>
                {user && user._id === comment.userId?._id && (
                  <>
                    <button className="comment__action">
                      <FaEdit /> Edit
                    </button>
                    <button className="comment__action">
                      <FaTrash /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
