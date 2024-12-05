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

const lengths = [5, 5, 5, 5, 5, 5];
const questions = [`test1`, `test2`, `test3`, `test4`, `test5`];

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
