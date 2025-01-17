import express from "express";
import { authModel } from "../model/authModel.mjs";
import { verifyToken } from "../middleware/middleware.mjs";
import upload from "../multer.config.mjs";
import cloudinary from "../cloudinaryConfig.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/alluser", async (req, res) => {
  try {
    const result = await authModel.find({});
    if (!result) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Cannot Find data" });
  }
});

router.delete("/alluser", async (req, res) => {
  try {
    const result = await authModel.deleteMany({});
    if (!result) {
      return res.status(404).json({ message: "user cannot delete" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Cannot Delete" });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await authModel.findById(userId);
    if (!result) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Cannot Find data" });
  }
});

router.delete("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await authModel.findByIdAndDelete(userId);
    if (result) {
      res.status(200).json({ message: "done, already deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Cannot delete data" });
  }
});

router.delete("/user/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await authModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "done, already deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Cannot delete data" });
  }
});

router.put("/user", verifyToken, upload.single("image"), async (req, res) => {
  const userId = req.user.id;
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "product" });
      imageUrl = result.secure_url;
    }
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updatedProduct = await authModel.findByIdAndUpdate(userId, { ...req.body, password: hashedPassword, image: imageUrl }, { new: true });
      return res.status(200).json(updatedProduct);
    } else {
      const updatedProduct = await authModel.findByIdAndUpdate(userId, { ...req.body, image: imageUrl }, { new: true });
      return res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message });
  }
});

export default router;
