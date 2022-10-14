export default class View {
    _data;

    render(data) {
        this._data = data;
        this._generateView();
    }

    getTotal() {
        const { numExercise, timeExercise, restExercise, numSet, restSet } =
            this._data;

        const total =
            numSet > 1
                ? ((timeExercise + restExercise) * numExercise - restExercise) *
                      numSet +
                  (numSet * restSet - restSet)
                : (timeExercise + restExercise) * numExercise - restExercise;

        return total;
    }
}
