const Playlist = require("../models/Playlist");

const newPlaylist = async (req, res) => {
  try {
    const isPresent = await Playlist.findOne({
      title: req.body.title,
      user: req.body.user,
    });
    if (isPresent) {
      return res.status(409).json({
        error: true,
        ok: false,
        message: "Playlist already exists",
        data: isPresent,
      });
    }
    const playlist = await Playlist.create(req.body);
    if (playlist) {
      return res.status(200).json({
        error: false,
        ok: true,
        message: "Playlist registered successfully",
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

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    return res.status(200).json({
      error: true,
      ok: false,
      message: "Playlists fetched successfully",
      data: playlists,
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

const getPlaylistList = async (req, res) => {
  try {
    const playlists = await Playlist.aggregate([
      {
        $project: {
          _id: 0,
          value: "$_id",
          label: { $concat: ["$title", " - ", "$language"] },
        },
      },
    ]);
    return res.status(200).json({
      error: true,
      ok: false,
      message: "Playlist list fetched successfully",
      data: playlists,
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

const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Playlist fetched successfully",
      data: playlist,
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

const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params._id);
    await Playlist.findByIdAndDelete(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Playlist deleted successfully",
      data: playlist,
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

const updatePlaylist = async (req, res) => {
  try {
    let playlist = await Playlist.findById(req.params._id);
    await Playlist.findByIdAndUpdate(req.params._id, req.body);
    playlist = await Playlist.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Playlist updated successfully",
      data: playlist,
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
  newPlaylist,
  getAllPlaylists,
  getPlaylist,
  deletePlaylist,
  updatePlaylist,
  getPlaylistList,
};
