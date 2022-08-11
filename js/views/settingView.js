"use strict";

import View from "./View.js";

class settingView extends View {
    addHandlerInputChanges(handler) {
        $(".input").change(() => {
            handler();
        });
    }

    addHandlerTabs() {
        $(".tabs--tab").click((e) => {
            $(".tabs--tab, .tabs-content").removeClass("is-active");
            $(
                `.tab--${e.target.dataset.tab}, .content--${e.target.dataset.tab}`
            ).addClass("is-active");
        });
    }

    addHandlerStartBtn(handler) {
        $(".btn--start").click((e) => {
            handler(e);

            e.target.disabled = true;
            $(".input-form input").prop("disabled", true);
            $(".btn--reset").prop("disabled", false);
            $(".btn--pause").prop("disabled", false);
        });
    }
}

export default new settingView();
