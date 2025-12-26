import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

console.log("MongoDB URI:", process.env.MONGODB_URI);

const sampleData = {
  users: [
    {
      username: "JohnDoe",
      email: "john@example.com",
      password: "password123",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      username: "JaneSmith",
      email: "jane@example.com",
      password: "password123",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ],
  channels: [
    {
      channelName: "Code with John",
      description: "Coding tutorials and tech reviews",
      channelBanner: "https://picsum.photos/1200/300",
    },
    {
      channelName: "Tech with Jane",
      description: "Technology reviews and tutorials",
      channelBanner: "https://picsum.photos/1200/300",
    },
  ],
  videos: [
    {
      title: "Learn React in 30 Minutes",
      description: "A quick tutorial to get started with React",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl: "https://picsum.photos/320/180",
      category: "Education",
      tags: ["react", "javascript", "tutorial"],
      views: 15200,
      likes: [],
      dislikes: [],
    },
    {
      title: "JavaScript Basics for Beginners",
      description:
        "Learn JavaScript fundamentals in this comprehensive tutorial",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://picsum.photos/320/181",
      category: "Education",
      tags: ["javascript", "beginners", "tutorial"],
      views: 25300,
      likes: [],
      dislikes: [],
    },
    {
      title: "Building a YouTube Clone with MERN",
      description: "Full stack tutorial on building a YouTube clone",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: "https://picsum.photos/320/182",
      category: "Technology",
      tags: ["mern", "react", "nodejs", "mongodb"],
      views: 12500,
      likes: [],
      dislikes: [],
    },
    {
      title: "Node.js Crash Course",
      description: "Learn Node.js from scratch",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnailUrl: "https://picsum.photos/320/183",
      category: "Technology",
      tags: ["nodejs", "backend", "javascript"],
      views: 18900,
      likes: [],
      dislikes: [],
    },
    {
      title: "Modern Web Development",
      description: "Complete guide to modern web development",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnailUrl: "https://picsum.photos/320/184",
      category: "Technology",
      tags: ["webdev", "fullstack", "tutorial"],
      views: 21400,
      likes: [],
      dislikes: [],
    },
    {
      title: "Best Music Mix 2024",
      description: "Top hits of 2024",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnailUrl: "https://picsum.photos/320/185",
      category: "Music",
      tags: ["music", "mix", "2024"],
      views: 53200,
      likes: [],
      dislikes: [],
    },
    {
      title: "Football Highlights 2024",
      description: "Best football moments",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnailUrl: "https://picsum.photos/320/186",
      category: "Sports",
      tags: ["football", "sports", "highlights"],
      views: 42300,
      likes: [],
      dislikes: [],
    },
    {
      title: "Gaming Tournament Finals",
      description: "Exciting gaming tournament finals",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnailUrl: "https://picsum.photos/320/187",
      category: "Gaming",
      tags: ["gaming", "tournament", "esports"],
      views: 67800,
      likes: [],
      dislikes: [],
    },
  ],
};

const seedDatabase = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/youtube-clone";
    console.log("Connecting to MongoDB...");
    console.log("Using URI:", mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create users
    const createdUsers = await User.insertMany(sampleData.users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create channels with owners
    const channelsWithOwners = sampleData.channels.map((channel, index) => ({
      ...channel,
      owner: createdUsers[index]._id,
      subscribers: [],
      videos: [],
    }));

    const createdChannels = await Channel.insertMany(channelsWithOwners);
    console.log(`✅ Created ${createdChannels.length} channels`);

    // Update users with their channels
    for (let i = 0; i < createdUsers.length; i++) {
      createdUsers[i].channels = [createdChannels[i]._id];
      await createdUsers[i].save();
    }

    // Create videos with channels and uploaders
    const videosWithRelations = sampleData.videos.map((video, index) => ({
      ...video,
      channelId: createdChannels[index % createdChannels.length]._id,
      uploader: createdUsers[index % createdUsers.length]._id,
      comments: [],
    }));

    const createdVideos = await Video.insertMany(videosWithRelations);
    console.log(`✅ Created ${createdVideos.length} videos`);

    // Update channels with their videos
    for (let i = 0; i < createdVideos.length; i++) {
      const video = createdVideos[i];
      const channel = createdChannels[i % createdChannels.length];
      channel.videos.push(video._id);
      await channel.save();
    }

    console.log("🎉 Database seeded successfully!");

    // Display some stats
    const userCount = await User.countDocuments();
    const channelCount = await Channel.countDocuments();
    const videoCount = await Video.countDocuments();

    console.log("\n📊 Database Stats:");
    console.log(`   Users: ${userCount}`);
    console.log(`   Channels: ${channelCount}`);
    console.log(`   Videos: ${videoCount}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    console.error("Error details:", error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
