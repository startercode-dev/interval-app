import View from './View.js';
import { formatTime } from '../helper.js';
import $ from 'jquery';

class infoView extends View {
    _generateView() {
        const total = this.getTotal();

        $('.info--title').text('custom workout');
        $('.total-time span').text(`${formatTime(total)}`);
        $('.total-exercises span').text(
            `1/${this._data.numExercise ? this._data.numExercise : 1}`
        );
        $('.total-sets span').text(
            `1/${this._data.numSet ? this._data.numSet : 1}`
        );
    }
}

export default new infoView();
