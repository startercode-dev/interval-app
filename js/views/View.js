"use strict";

export default class View {
    _data;

    render(data) {
        this._data = data;
        this._generateView();
    }

    getTotal() {
        const { numExercises, timeExercise, restExercise, numSets, restSet } =
            this._data;

        return numSets > 1
            ? ((timeExercise + restExercise) * numExercises - restExercise) *
                  numSets +
                  (numSets * restSet - restSet)
            : (timeExercise + restExercise) * numExercises - restExercise;
    }
}
