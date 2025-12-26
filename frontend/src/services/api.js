import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Video API functions
export const videoAPI = {
  getVideos: (search = "", category = "All") =>
    API.get("/videos", { params: { search, category } }),
  getVideo: (id) => API.get(`/videos/${id}`),
  addComment: (videoId, text) =>
    API.post(`/videos/${videoId}/comments`, { text }),
};

// Auth API functions
export const authAPI = {
  login: (email, password) => API.post("/auth/login", { email, password }),
  register: (username, email, password) =>
    API.post("/auth/register", { username, email, password }),
  getMe: () => API.get("/auth/me"),
};

// Channel API functions
export const channelAPI = {
  createChannel: (channelData) => API.post("/channels", channelData),
  getChannel: (id) => API.get(`/channels/${id}`),
  updateChannel: (id, channelData) => API.put(`/channels/${id}`, channelData),
  deleteChannel: (id) => API.delete(`/channels/${id}`),
};

export default API;
