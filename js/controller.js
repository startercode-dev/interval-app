import * as model from "./model.js";
import TimerView from "./views/timerView.js";
import InfoView from "./views/infoView.js";

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

$(".input").change(() => {
    model.updateTime();
    $(".info--title").text("custom");
    TimerView.render(model.state.setting);
    InfoView.render(model.state.setting);
});
