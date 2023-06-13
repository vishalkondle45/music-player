const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    songs: {
      type: Array,
      required: true,
      default: [],
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", SongSchema);
