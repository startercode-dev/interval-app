import View from "./View.js";

class settingView extends View {
    addHandlerInputChanges(handler) {
        $(".input").change(() => {
            handler();
        });
    }

    addHandlerTabs(handler) {
        $(".tabs--tab").click((e) => {
            handler(e);
        });
    }

    addHandlerStartBtn(handler) {
        $(".btn--start").click((e) => {
            handler(e);
        });
    }
}

export default new settingView();
