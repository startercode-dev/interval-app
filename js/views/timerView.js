class TimerView {
    _parentElement = document.querySelector(".timer");
    _data;

    render(data) {
        this._data = data;

        const time = this._calcTime();
        const timeExercise = this._timeExercise();
        $(".timer-clock__remain").text(
            `time remain: ${time[0]}:${time[1].toString().padStart(2, "0")}`
        );

        $(".timer-clock__label").text(
            `${timeExercise[0]}:${timeExercise[1].toString().padStart(2, "0")}`
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

    _timeExercise() {
        const timeExercise = this._data.timeExercise;
        const mins = Math.floor(timeExercise / 60);
        const secs = (timeExercise % 60).toString();
        return [mins, secs];
    }
}

export default new TimerView();
