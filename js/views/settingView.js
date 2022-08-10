"use strict";

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

    addHandlerPauseBtn(handler) {
        $(".btn--pause").click((e) => {
            handler(e);
        });
    }

    addHandlerResumeBtn(handler) {
        $(".btn--resume").click((e) => {
            handler(e);
        });
    }

    addHandlerResetBtn(handler) {
        $(".btn--reset").click((e) => {
            handler(e);
        });
    }
}

export default new settingView();
