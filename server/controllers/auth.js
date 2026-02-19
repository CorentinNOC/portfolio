const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "RANDOM_TOKEN_SECRET",
      { expiresIn: "24h" },
    );

    res.status(200).json({
      userId: user._id,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
