// import các modules
require("dotenv").config();   // Sử dụng dotenv để đọc biến môi trường từ file .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();   // Tạo một ứng dụng Express
const port = process.env.PORT;   // Lấy cổng từ biến môi trường hoặc mặc định là 5000 nếu không có

// Middleware
app.use(cors());   // Sử dụng middleware Cors để xử lý Cross-Origin Resource Sharing
app.use(express.json());   // Cho phép ứng dụng đọc JSON từ các yêu cầu
app.use(express.urlencoded({extended: true}));   // Cho phép ứng dụng đọc dữ liệu từ các yêu cầu có kiểu dữ liệu x-www-form-urlencoded
app.use(express.static("uploads"));   // Cho phép truy cập các tệp tĩnh trong thư mục "uploads"

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Connect to the database!'))
    .catch(err => console.log(err));

// Tiền tố cho các routes
app.use("/api/post", require("./routes/routes"));

// Khởi động server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
