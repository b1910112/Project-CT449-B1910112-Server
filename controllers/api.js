const Post = require("../models/posts");
const fs = require("fs");

module.exports = class API {
    // Lấy tất cả bài đăng
    static async fetchAllPost(req, res){
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message});
        }
    }

    // Lấy bài đăng bằng ID
    static async fetchPostByID(req, res){
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // Tạo một bài đăng mới
    static async createPost(req, res){
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try {
            await Post.create(post);
            res.status(201).json({ message: "Truyện được đăng thành công!"});
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    // Cập nhật một bài đăng
    static async updatePost(req, res){
        const id = req.params.id;
        let new_image = "";
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: 'Chỉnh sửa truyện thành công!' });
        } catch (err) {
            res.status(404).json({ message: err.message});
        }
    }

    // Xóa một bài đăng
    static async deletePost(req, res){
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if(result.imgae != '' ) {
                try {
                    fs.unlinkSync('./uploads/' +result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: "Xóa truyện thành công! "});
        } catch (err) {
            res.status(404).json({ message: err.message});
        }
    }

    // Tìm kiếm bài đăng
    static async searchPosts(req, res) {
        try {
            const query = req.query.q;
            console.log("Searching for posts with title containing:", query);
    
            const results = await Post.find({
                title: { $regex: query, $options: "i" },
            });
    
            console.log("Search results:", results);
    
            return res.json(results);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm bài đăng:", error);
            res.status(500).json({ error: "Lỗi khi tìm kiếm bài đăng", details: error.message });
        }
    }
};
