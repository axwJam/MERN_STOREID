import express from "express";
import { authModel } from "../model/authModel.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new authModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      full_name: req.body.full_name,
      no_handphone: req.body.no_handphone,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await authModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const { username, email } = user;
    if (!validPassword) return res.status(400).json("Wrong password");
    return res.status(200).json({ username, email, accessToken });
  } catch (err) {
    const message = "You're not connect";
    return res.status(500).json({ message });
  }
});

export default router;
