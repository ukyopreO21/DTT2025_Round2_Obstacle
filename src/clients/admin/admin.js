const socket = io();

var interval;

const startRound = () => {
    socket.emit("startRound");
};

const openQuestion = (btn) => {
    const num = Number(btn.name);
    console.log(num);
    socket.emit("openQuestion", num);
};

socket.on("_openQuestion", (data) => {
    document.getElementById("question").textContent = `[${data.length}] ` + data.question;
});

const timer = (num) => {
    clearInterval(interval);
    let time = num;
    interval = setInterval(() => {
        time--;
        if (time == 0) {
            clearInterval(interval);
        }
        document.getElementById("time").textContent = time;
    }, 1000);
};

const timing = (btn) => {
    const time = Number(btn.name);
    socket.emit("timing", time);
    timer(time);
};
