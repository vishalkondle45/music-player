const express = require("express");
const { getAllSongs, newSong } = require("../controllers/song");
const router = express.Router();

router.route("/").get(getAllSongs).post(newSong);

router
  .route("/:_id")
  .get((req, res) => {
    // Get Specific Song
    res.send(`Get Song ID - ${req.params._id} ${req.song.name}`);
  })
  .delete((req, res) => {
    // Delete Song
    res.send(`Delete Song ID - ${req.params._id} ${req.song.name}`);
  })
  .put((req, res) => {
    // Update Song
    res.send(`Update Song ID - ${req.params._id} ${req.song.name}`);
  });

const songs = [
  { _id: 1, name: "vishal" },
  { _id: 2, name: "ankita" },
];

router.param("_id", (req, res, next, _id) => {
  req.song = songs.find((song) => song._id === Number(_id));
  next();
});

module.exports = router;
