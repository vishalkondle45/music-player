const express = require("express");
const {
  newUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  checkUser,
  login,
  Auth,
  addSongToLikes,
  myLikes,
  removeSongFromLikes,
} = require("../controllers/user");
const router = express.Router();

// GET  - Get All Users
// POST - New User
router.route("/").get(getAllUsers).post(newUser);
router.route("/addSongToLikes").put(Auth, addSongToLikes);
router.route("/removeSongFromLikes").put(Auth, removeSongFromLikes);
router.route("/myLikes").get(Auth, myLikes);

// GET    - Get User
// DELETE - Delete User
// PUT    - Update User
router.route("/:_id").get(getUser).put(updateUser).delete(deleteUser);

// Check whether user is present or not
router.param("_id", checkUser);

// Login Route
router.route("/login").post(login);
router.route("/protected").post(Auth, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;
