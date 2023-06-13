const jwt = require("jsonwebtoken");

const generateToken = ({
  _id,
  name,
  mobile,
  email,
  status,
  isAdmin,
  likes,
}) => {
  return jwt.sign(
    { user: { _id, name, mobile, email, status, isAdmin, likes } },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

module.exports = {
  generateToken,
};
