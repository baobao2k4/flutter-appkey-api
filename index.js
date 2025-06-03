const express = require("express");
const cors = require("cors");
const { networkInterfaces } = require("os");

const app = express();
app.use(cors());
app.use(express.json());

const allowedAppKeys = [
  "key-l7xhlil6zm32",
  "key-914l0e2efamq",
  "key-jlto05054ch3",
  "key-9tiacuck0xs2",
  "key-ojxq55sh1xnj",
  "key-be3k5f5wz64i",
  "key-k03jwaq2ps8z",
  "key-7t67l4lkzg8s",
  "key-dkazr6t1qkzx",
  "key-gpnhj8017zop",
  "key-xt5p9m2nv8ky",
  "key-h4w7r6q1j9fs",
  "key-u2y8i5n3b7vx",
  "key-a9c4e6m8k2dl",
  "key-z7x1w3v5t9nh",
  "key-q6s4f2g8p0jm",
  "key-b5n7m9k3h1yl",
  "key-r8t2v4x6c9ws",
  "key-d1f3g5h7j9kl",
  "key-m2n4b6v8c0xz"
];

// Object lưu trạng thái khóa của các key
const lockedKeys = {};

app.get("/api/check-key", (req, res) => {
  const appKey = req.query.appKey;

  if (!appKey || !allowedAppKeys.includes(appKey)) {
    return res.status(403).json({ message: "appKey không hợp lệ" });
  }

  if (lockedKeys[appKey]) {
    return res.status(403).json({ message: "appKey đã bị khóa" });
  }

  return res.json({ status: "ok" });
});

app.post("/api/lock-key", (req, res) => {
  const { appKey } = req.body;

  if (!appKey || !allowedAppKeys.includes(appKey)) {
    return res.status(403).json({ message: "appKey không hợp lệ" });
  }

  lockedKeys[appKey] = true;
  return res.json({ message: "Đã khóa key thành công" });
});

app.post("/api/unlock-key", (req, res) => {
  const { appKey } = req.body;

  if (!appKey || !allowedAppKeys.includes(appKey)) {
    return res.status(403).json({ message: "appKey không hợp lệ" });
  }

  delete lockedKeys[appKey];
  return res.json({ message: "Đã mở khóa key thành công" });
});

app.get("/api/key-status", (req, res) => {
  const { appKey } = req.query;

  if (!appKey || !allowedAppKeys.includes(appKey)) {
    return res.status(403).json({ message: "appKey không hợp lệ" });
  }

  return res.json({
    appKey,
    isLocked: !!lockedKeys[appKey]
  });
});

// 🔥 Sửa phần chạy server phù hợp với Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API check-key đang chạy tại http://localhost:${PORT}`);

  // Log địa chỉ IP cục bộ nếu chạy máy thật
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`🌐 Có thể truy cập tại: http://${net.address}:${PORT}`);
      }
    }
  }
});
