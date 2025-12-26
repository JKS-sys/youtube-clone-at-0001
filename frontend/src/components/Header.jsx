import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaBars,
  FaYoutube,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu">
          <FaBars size={20} />
        </button>
        <Link to="/" className="header__logo">
          <FaYoutube size={30} color="#FF0000" />
          <span className="header__logo-text">YouTube Clone</span>
        </Link>
      </div>

      <div className="header__center">
        <form onSubmit={handleSearch} className="header__search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header__search-input"
          />
          <button type="submit" className="header__search-button">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="header__right">
        {user ? (
          <div className="header__user-info">
            <span className="header__username">Hi, {user.username}</span>
            <button onClick={handleLogout} className="header__logout-btn">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/auth" className="header__signin-btn">
            <FaUser />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
