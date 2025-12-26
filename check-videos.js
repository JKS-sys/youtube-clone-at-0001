import mongoose from "mongoose";
import Video from "./backend/models/Video.js";

async function checkVideos() {
  await mongoose.connect("mongodb://localhost:27017/youtube-clone");
  const videos = await Video.find({}).select("_id title").limit(5);
  console.log("Sample video IDs:");
  videos.forEach((video) => {
    console.log(`Title: ${video.title}`);
    console.log(`ID: ${video._id}`);
    console.log(`URL: http://localhost:3000/video/${video._id}`);
    console.log("---");
  });
  await mongoose.disconnect();
}

checkVideos().catch(console.error);
