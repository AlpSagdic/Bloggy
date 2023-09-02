const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

const PostModel = mongoose.model("Post", PostSchema);

mongoose.connect(
  `mongodb+srv://react-blog:${process.env.MONGO_PASSWORD}@cluster0.sinxnto.mongodb.net/react-blog`
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new UserModel({
      username,
      password: bcrypt.hashSync(password, 12),
    });
    await newUser.save();

    const token = jwt.sign({ username, id: newUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token).json("ok");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userInfo = await UserModel.findOne({ username });
    if (!userInfo) {
      return res.status(401).json({ error: "Wrong credentials" });
    }

    const passOk = bcrypt.compareSync(password, userInfo.password);
    if (passOk) {
      const token = jwt.sign(
        { username, id: userInfo._id },
        `${process.env.SECRET}`,
        {}
      );
      res.cookie("token", token).json({
        id: userInfo._id,
        username,
      });
    } else {
      return res.status(401).json({ error: "Wrong credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, `${process.env.SECRET}`, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid or expired" });
    } else {
      res.json(info);
    }
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, `${process.env.SECRET}`, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid or expired" });
    } else {
      const { title, summary, content } = req.body;
      try {
        const newPost = new PostModel({
          title,
          summary,
          content,
          cover: newPath,
          author: info.id,
        });

        await newPost.save();
        res.status(200).json({ message: "Post created successfully" });
      } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
});

app.get("/post", async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(posts);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Database Error" });
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.put("/post", upload.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, `${process.env.SECRET}`, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid or expired" });
    } else {
      const { id, title, summary, content } = req.body;
      try {
        const updatedPost = await PostModel.findById(id);

        if (!updatedPost) {
          return res.status(404).json({ message: "Post couldn't find!" });
        }

        const isAuthor =
          JSON.stringify(updatedPost.author) === JSON.stringify(info.id);

        if (!isAuthor) {
          return res.status(400).json("You're not the author!");
        }
        updatedPost.title = title;
        updatedPost.summary = summary;
        updatedPost.content = content;
        updatedPost.cover = newPath ? newPath : updatedPost.cover;
        await updatedPost.save();

        res.status(200).json({ message: "Post successfully updated" });
      } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
});

app.listen(4000);
