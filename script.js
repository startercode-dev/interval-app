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

// GET CUSTOM TOTAL TIME
const getTotalTime = (e) => {
    e.preventDefault();
    const timeExercise = $("#timeExercise").val() * 1;
    const restExercise = $("#restExercise").val() * 1;
    const numExercises = $("#numExercises").val() * 1;
    const numSets = $("#numSets").val() * 1;
    const restSet = $("#restSet").val() * 1;

    const totalTime =
        (timeExercise + restExercise) * numExercises + numSets * restSet;

    const minutes = Math.floor(totalTime / 60);
    const seconds = (totalTime % 60).toString();
    const time = `${minutes}:${seconds.padStart(2, "0")}`;

    $(".total-time span").text(time);
};

$(".btn--start").click((e) => getTotalTime(e));
