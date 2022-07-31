const tabsContainer = document.querySelector(".tabs-head");
const tabs = document.querySelectorAll(".tabs--tab");
const tabsContent = document.querySelectorAll(".tabs-content");

// SETTINGS TABS
tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target;

    tabs.forEach((t) => t.classList.remove("is-active"));
    tabsContent.forEach((tc) => tc.classList.remove("is-active"));
    clicked.classList.add("is-active");
    document
        .querySelector(`.content--${clicked.dataset.tab}`)
        .classList.add("is-active");
});

// GET USR INPUT TOTAL TIME
const getTotalTime = (e) => {
    e.preventDefault();
    const inputTime = $("#inputTime").val() * 1;
    const inputRest = $("#inputRest").val() * 1;
    const inputExercise = $("#inputExercise").val() * 1;
    const inputSet = $("#inputSet").val() * 1;
    const inputSetRest = $("#inputSetRest").val() * 1;

    const totalTime =
        (inputTime + inputRest) * inputExercise + inputSet * inputSetRest;

    const minutes = Math.floor(totalTime / 60);
    const seconds = (totalTime % 60).toString();
    const time = `${minutes}:${seconds.padStart(2, "0")}`;

    $(".total-time span").text(time);
};

$(".btn").click((e) => getTotalTime(e));
