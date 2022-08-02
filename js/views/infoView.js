class InfoView {
    _parentElement = document.querySelector(".infos");
    _data;

    render(data) {
        this._data = data;

        const time = this._calcTime();
        $(".total-time span").text(`${time[0]}:${time[1].padStart(2, "0")}`);
        $(".total-exercises span").text(
            `1/${this._data.numExercises ? this._data.numExercises : 1}`
        );
        $(".total-sets span").text(
            `1/${this._data.numSets ? this._data.numSets : 1}`
        );
    }

    _calcTime() {
        const numExercises = this._data.numExercises
            ? this._data.numExercises
            : 1;
        const timeExercise = this._data.timeExercise;
        const restExercise = this._data.restExercise;
        const numSets = this._data.numSets ? this._data.numSets : 1;
        const restSet = this._data.restSet;

        const total =
            numSets > 1
                ? ((timeExercise + restExercise) * numExercises -
                      restExercise) *
                      numSets +
                  (numSets * restSet - restSet)
                : (timeExercise + restExercise) * numExercises - restExercise;
        const mins = Math.floor(total / 60);
        const secs = (total % 60).toString();
        return [mins, secs];
    }
}

export default new InfoView();
