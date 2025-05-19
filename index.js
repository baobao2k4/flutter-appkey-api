const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

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
  "key-gpnhj8017zop"
];

app.get("/api/check-key", (req, res) => {
  const appKey = req.query.appKey;

  if (!appKey || !allowedAppKeys.includes(appKey)) {
    return res.status(403).json({ message: "appKey không hợp lệ" });
  }

  return res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("✅ API check-key đang chạy tại http://localhost:3000");
});
