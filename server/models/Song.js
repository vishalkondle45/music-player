// const { Chance } = require("chance");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    // _id: {
    //   type: String,
    //   default: generateId(),
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", SongSchema);
