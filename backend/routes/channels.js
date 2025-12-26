import express from "express";
import { protect } from "../middleware/auth.js";
import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

const router = express.Router();

// Create a new channel
router.post("/", protect, async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    const channelExists = await Channel.findOne({ channelName });
    if (channelExists) {
      return res.status(400).json({ message: "Channel name already exists" });
    }

    const channel = await Channel.create({
      channelName,
      owner: req.user._id,
      description,
      channelBanner,
    });

    // Add channel to user's channels array
    req.user.channels.push(channel._id);
    await req.user.save();

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get channel by ID
router.get("/:id", async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "username avatar")
      .populate({
        path: "videos",
        populate: {
          path: "uploader",
          select: "username avatar",
        },
      });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's channels
router.get("/user/:userId", async (req, res) => {
  try {
    const channels = await Channel.find({ owner: req.params.userId });
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update channel
router.put("/:id", protect, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Check if user owns the channel
    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete channel
router.delete("/:id", protect, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Check if user owns the channel
    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete all videos in the channel
    await Video.deleteMany({ channelId: channel._id });

    // Remove channel from user's channels array
    await req.user.updateOne({ $pull: { channels: channel._id } });

    await channel.deleteOne();
    res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
