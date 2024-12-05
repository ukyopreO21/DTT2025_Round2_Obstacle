const socket = io();

var interval;
const audio = new Audio("");

socket.on("_startRound", (num) => {
    document.getElementById("obstacle-length").textContent = num;
});

socket.on("_openQuestion", (data) => {
    document.getElementById("animation").classList.remove("animation-10s", "animation-15s");
    void document.getElementById("animation").offsetWidth;

    document.getElementById("row").textContent = `Hàng ngang ${data.num} - ${25 - 5 * (data.num - 1)} điểm`;
    document.getElementById("row-length").textContent = `${data.length} kí tự`;
    document.getElementById("question-text").textContent = data.question;
});

socket.on("_timing", (time) => {
    clearInterval(interval);
    document.querySelector(".time").textContent = time;
    interval = setInterval(() => {
        time--;
        if (time == 0) {
            clearInterval(interval);
        }
        document.querySelector(".time").textContent = time;
    }, 1000);

    audio.pause();
    audio.src = `/src/assets/${time}s.mp3`;
    audio.play();

    document.getElementById("animation").classList.remove("animation-10s", "animation-15s");
    void document.getElementById("animation").offsetWidth;
    document.getElementById("animation").classList.add(`animation-${time}s`);
});

const removeBg = () => {
    document.getElementById("first-click").style.display = "none";
};
