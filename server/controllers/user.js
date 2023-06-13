const { generateToken } = require("../helper/library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const newUser = async (req, res) => {
  try {
    const isEmailRegistered = await User.findOne({ email: req.body.email });
    if (isEmailRegistered) {
      return res.status(409).json({
        error: true,
        ok: false,
        message: "Email already registered",
        data: null,
      });
    }
    const user = await User.create(req.body);
    if (user) {
      return res.status(200).json({
        error: false,
        ok: true,
        message: "User registered successfully",
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      error: true,
      ok: false,
      message: "Users fetched successfully",
      data: users,
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

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "User fetched successfully",
      data: user,
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

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    await User.findByIdAndDelete(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "User deleted successfully",
      data: user,
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

const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params._id);
    await User.findByIdAndUpdate(req.params._id, req.body);
    user = await User.findById(req.params._id);
    return res.status(200).json({
      error: false,
      ok: true,
      message: "User updated successfully",
      data: user,
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

const checkUser = async (req, res, next, _id) => {
  try {
    req.user = await User.findById(req.params._id);
    if (!req.user) {
      return res.status(404).json({
        error: true,
        ok: false,
        message: "User not found",
        data: null,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      error: true,
      ok: false,
      message: error.message,
      data: error.stack,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        error: true,
        ok: false,
        message: "Email or password is incorrect",
        data: null,
      });
    }
    if (await user.matchPassword(req.body.password)) {
      return res.status(200).json({
        error: false,
        ok: true,
        message: "User registered successfully",
        data: {
          _id: user._id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          status: user.status,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        },
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

const Auth = (req, res, next) => {
  try {
    const token = req.get("authorization");
    if (!token)
      return res.status(401).json({
        ok: false,
        error: true,
        message: "Unauthorized",
        data: null,
      });
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token.split(" ")[1], jwtSecret, (err, user) => {
      if (err && err?.message === "TokenExpiredError")
        return res.status(403).json({
          ok: false,
          error: true,
          message: "Token Expired",
          data: null,
        });
      if (err)
        return res.status(401).json({
          ok: false,
          error: true,
          message: "Invalid Token",
          data: err.message,
          jwtSecret,
        });
      req.user = user;
      next();
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

const addSongToLikes = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.user.email });
    let user1 = await User.findOneAndUpdate(
      { email: req.user.user.email },
      { likes: [...user.likes, req.body._id] },
      {
        new: true,
      }
    );
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Song added to my likes",
      data: user1,
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

const removeSongFromLikes = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.user.email });
    let likes = user.likes.filter((like) => like !== req.body._id);
    let user1 = await User.findOneAndUpdate(
      { email: req.user.user.email },
      { likes },
      {
        new: true,
      }
    );
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Song removed from my likes",
      data: user1,
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

const myLikes = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.user.email });
    return res.status(200).json({
      error: false,
      ok: true,
      message: "Song removed from my likes",
      data: user.likes,
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
};
