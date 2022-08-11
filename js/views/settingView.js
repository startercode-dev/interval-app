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
}

export default new settingView();
