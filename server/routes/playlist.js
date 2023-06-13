const express = require("express");
const {
  getAllPlaylists,
  newPlaylist,
  getPlaylistList,
} = require("../controllers/playlist.js");
const router = express.Router();

router.route("/").get(getAllPlaylists).post(newPlaylist);
router.route("/list").get(getPlaylistList);

router
  .route("/:_id")
  .get((req, res) => {
    // Get Specific Playlist
    res.send(`Get Playlist ID - ${req.params._id}`);
  })
  .delete((req, res) => {
    // Delete Playlist
    res.send(`Delete Playlist ID - ${req.params._id}`);
  })
  .put((req, res) => {
    // Update Playlist
    res.send(`Update Playlist ID - ${req.params._id}`);
  });

const playlists = [
  { _id: 1, name: "vishal" },
  { _id: 2, name: "ankita" },
];

router.param("_id", (req, res, next, _id) => {
  req.playlist = playlists.find((playlist) => playlist._id === Number(_id));
  next();
});

module.exports = router;
