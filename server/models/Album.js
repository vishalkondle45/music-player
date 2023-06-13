// const { Chance } = require("chance");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const chance = new Chance();

const AlbumSchema = new Schema(
  {
    // _id: {
    //   type: String,
    //   default: chance.guid(),
    // },
    title: {
      type: String,
      required: true,
    },
    music: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada", "English"],
      required: true,
      default: "Telugu",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", AlbumSchema);
