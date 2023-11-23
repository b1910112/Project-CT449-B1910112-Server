const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const multer = require("multer");

// Middleware cho multer để xử lý tải ảnh lên
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

// Định nghĩa các endpoint
router.get("/", API.fetchAllPost);   // Endpoint để lấy tất cả bài đăng
router.get("/:id", API.fetchPostByID);   // Endpoint để lấy một bài đăng theo ID
router.post("/", upload, API.createPost);   // Endpoint để tạo một bài đăng mới với ảnh
router.patch("/:id", upload, API.updatePost);   // Endpoint để cập nhật một bài đăng với ảnh
router.delete("/:id", API.deletePost);   // Endpoint để xóa một bài đăng
router.get("/search", API.searchPosts);   // Endpoint để tìm kiếm bài đăng

module.exports = router;
