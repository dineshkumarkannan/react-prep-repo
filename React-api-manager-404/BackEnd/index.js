const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;
const SECRET = "supersecretkey";

// In-memory storage
let posts = [];
let users = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user", password: "user123" },
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, user: { username } });
});

// Get all posts
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts);
});

// Create a post
app.post("/posts", authenticateToken, (req, res) => {
  const { title, body } = req.body.body;
  if (!title || !body)
    return res.status(400).json({ message: "Title and body required" });

  const newPost = {
    id: posts.length + 1,
    title,
    body,
    userId: req.user.id,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post
app.put("/posts/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body.body;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.userId !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  if (title) post.title = title;
  if (body) post.body = body;
  res.json(post);
});

// Delete a post
app.delete("/posts/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === parseInt(id));
  if (postIndex === -1)
    return res.status(404).json({ message: "Post not found" });
  if (posts[postIndex].userId !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  posts.splice(postIndex, 1);
  res.json({ message: "Post deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
