const mongoose = require("mongoose");

// Định nghĩa schema cho bài đăng
const postSchema = mongoose.Schema({
    title: { type: String, required: true },   // Tiêu đề của bài đăng, bắt buộc
    category: { type: String, required: true },   // Danh mục của bài đăng, bắt buộc
    content: { type: String, required: true },   // Nội dung của bài đăng, bắt buộc
    image: { type: String, required: true },   // Tên file hình ảnh liên quan đến bài đăng, bắt buộc
    created: {
        type: Date,
        default: Date.now,   // Ngày tạo mặc định là ngày hiện tại
    },
});

// Xuất mô hình (model) Post dựa trên schema đã định nghĩa
module.exports = mongoose.model("Post", postSchema);
