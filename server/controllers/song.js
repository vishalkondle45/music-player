const Song = require("../models/Song");

const newSong = async (req, res) => {
  try {
    const isPresent = await Song.findOne({
      link: req.body.link,
    });
    if (isPresent) {
      return res.status(409).json({
        error: true,
        ok: false,
        message: "Song already exists",
        data: isPresent,
      });
    }
    const song = await Song.create(req.body);
    if (song) {
      return res.status(200).json({
        error: false,
        ok: true,
        message: "Song registered successfully",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      ok: false,
      message: error.message,
      data: error.stack,
    });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $addFields: {
          album: { $toObjectId: "$album" },
        },
      },
      {
        $lookup: {
          from: "albums",
          localField: "album",
          foreignField: "_id",
          as: "albums",
        },
      },
    ]);
    return res.status(200).json({
      error: true,
      ok: false,
      message: "Songs fetched successfully",
      data: songs,
      // .sort(() => Math.random() - 0.5),
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      ok: false,
      message: error.message,
      data: error.stack,
    });
  }
};

const getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Song fetched successfully",
      data: song,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      ok: false,
      message: error.message,
      data: error.stack,
    });
  }
};

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params._id);
    await Song.findByIdAndDelete(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Song deleted successfully",
      data: song,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      ok: false,
      message: error.message,
      data: error.stack,
    });
  }
};

const updateSong = async (req, res) => {
  try {
    let song = await Song.findById(req.params._id);
    await Song.findByIdAndUpdate(req.params._id, req.body);
    song = await Song.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Song updated successfully",
      data: song,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      ok: false,
      message: error.message,
      data: error.stack,
    });
  }
};

module.exports = {
  newSong,
  getAllSongs,
  getSong,
  deleteSong,
  updateSong,
};
