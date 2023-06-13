const express = require("express");
const {
  getAllAlbums,
  newAlbum,
  getAlbumList,
} = require("../controllers/album.js");
const router = express.Router();

router.route("/").get(getAllAlbums).post(newAlbum);
router.route("/list").get(getAlbumList);

router
  .route("/:_id")
  .get((req, res) => {
    // Get Specific Album
    res.send(`Get Album ID - ${req.params._id}`);
  })
  .delete((req, res) => {
    // Delete Album
    res.send(`Delete Album ID - ${req.params._id}`);
  })
  .put((req, res) => {
    // Update Album
    res.send(`Update Album ID - ${req.params._id}`);
  });

const albums = [
  { _id: 1, name: "vishal" },
  { _id: 2, name: "ankita" },
];

router.param("_id", (req, res, next, _id) => {
  req.album = albums.find((album) => album._id === Number(_id));
  next();
});

module.exports = router;
