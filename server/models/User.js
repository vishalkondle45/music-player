const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      length: 30,
      required: true,
    },
    email: {
      type: String,
      length: 30,
      unique: true,
    },
    password: {
      type: String,
      length: 256,
      required: true,
    },
    status: {
      type: Boolean,
      default: 1,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: 0,
      required: true,
    },
    likes: [],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
