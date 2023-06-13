const Album = require("../models/Album");

const newAlbum = async (req, res) => {
  try {
    const isPresent = await Album.findOne({
      title: req.body.title,
      language: req.body.language,
    });
    if (isPresent) {
      return res.status(409).json({
        error: true,
        ok: false,
        message: "Album already exists",
        data: isPresent,
      });
    }
    const album = await Album.create(req.body);
    if (album) {
      return res.status(200).json({
        error: false,
        ok: true,
        message: "Album registered successfully",
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

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    return res.status(200).json({
      error: true,
      ok: false,
      message: "Albums fetched successfully",
      data: albums,
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

const getAlbumList = async (req, res) => {
  try {
    const albums = await Album.aggregate([
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
      message: "Album list fetched successfully",
      data: albums,
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

const getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Album fetched successfully",
      data: album,
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

const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params._id);
    await Album.findByIdAndDelete(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Album deleted successfully",
      data: album,
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

const updateAlbum = async (req, res) => {
  try {
    let album = await Album.findById(req.params._id);
    await Album.findByIdAndUpdate(req.params._id, req.body);
    album = await Album.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Album updated successfully",
      data: album,
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
  newAlbum,
  getAllAlbums,
  getAlbum,
  deleteAlbum,
  updateAlbum,
  getAlbumList,
};
