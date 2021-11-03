const Router = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = new Router();

const secretKey = "mern-secret-key";

router.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorted than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const user = await new User({ email, password: hashPassword });
      await user.save();
      return res.json({ massage: "User was created " });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user don't found" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(404).json({ message: "invalid password" });
    }
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "24h" });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

module.exports = router;
