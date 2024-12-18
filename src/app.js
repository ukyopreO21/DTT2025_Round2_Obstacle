//node_modules
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;
const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./clients/projector/projector.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "./clients/admin/admin.html"));
});

app.use("/src/assets", express.static(path.join(__dirname, "./assets")));

const clientsPath = path.join(__dirname, "./clients");
const clientFolders = ["projector", "admin"];
clientFolders.forEach((folder) => {
    app.use(`/src/clients/${folder}`, express.static(path.join(clientsPath, folder)));
});

server.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

const lengths = [8, 7, 15, 7, 6, 8];
const questions = [
    `Giới hạn sinh quyển của địa cầu bao gồm toàn bộ phần thuỷ quyển, phần trên của thạch quyển và một phần thấp có chiều cao khoảng 20km thuộc về lớp "vỏ bọc" nào bảo vệ Trái Đất khỏi phần lớn các tác động của vũ trụ?`,
    `Nhà bác học người Hà Lan Christiaan Huygens đã là người đầu tiên đưa ra lý thuyết về bản chất của loại sóng đặc biệt nào vào thế kỉ 17?`,
    `Do ảnh hưởng của môi trường đặc biệt nào trên Trái Đất mà la bàn (kim chỉ Nam) có thể hoạt động để xác định phương hướng địa lý?`,
    `Saint Petersburg là một thành phố ở Liên Bang Nga thường xảy ra một hiện tượng trong khoảng từ giữa tháng 5 đến giữa tháng 7 được gọi là "bạch dạ". "Dạ" là từ Hán Việt chỉ khoảng thời gian nào trong ngày?`,
    `RGB, RYB, CMYK, HSB là một số hệ thống khác nhau của yếu tố nào trong lĩnh vực in ấn và thiết kế kỹ thuật số?`,
];

io.on("connection", (socket) => {
    socket.on("startRound", () => {
        io.emit("_startRound", lengths[5]);
    });

    socket.on("openQuestion", (question) => {
        io.emit("_openQuestion", { num: question, question: questions[question - 1], length: lengths[question - 1] });
    });

    socket.on("timing", (time) => {
        io.emit("_timing", time);
    });
});
