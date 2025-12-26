import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import Auth from "./pages/Auth";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Placeholder from "./pages/Placeholder";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <div className="app__body">
              <Sidebar />
              <div className="app__content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/video/:id" element={<VideoPlayer />} />
                  <Route path="/channel/:id" element={<Channel />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/trending" element={<Home />} />{" "}
                  <Route
                    path="/subscriptions"
                    element={<Placeholder pageName="Subscriptions" />}
                  />
                  <Route
                    path="/library"
                    element={<Placeholder pageName="Library" />}
                  />
                  <Route
                    path="/history"
                    element={<Placeholder pageName="History" />}
                  />
                  <Route
                    path="/your-videos"
                    element={<Placeholder pageName="Your Videos" />}
                  />
                  <Route
                    path="/liked-videos"
                    element={<Placeholder pageName="Liked Videos" />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
