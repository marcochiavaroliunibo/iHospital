const moment = require('moment');
const {now} = require("moment");

const valChart = [
    { "hr": getRandom(55,110), "press_min": getRandom(70,90), "press_max": getRandom(110,135), "freq_resp": getRandom(3,18), date: (new Date()) },
]

let counter = 0;

function updateValueChart() {

    const lastDay = moment(valChart[0].date, 'hh:mm:ss').add(1, 'seconds');
    let hr, press_min, press_max, freq_resp, date;

    hr = valChart[0].hr + getRandom(-5,5);
    press_min = valChart[0].press_min + getRandom(-5,5);
    press_max = valChart[0].press_max + getRandom(-5,5);
    freq_resp = valChart[0].freq_resp + getRandom(-5,5);

    // range data
    if (hr < 40 || hr > 160) hr = 100;
    if (press_min < 50 || press_min > 110) press_min = 80;
    if (press_max < 90 || press_max > 145) press_max = 120;
    if (freq_resp < 1 || freq_resp > 30) freq_resp = 15;

    valChart.unshift({
        hr, press_min, press_max, freq_resp, date: lastDay.format('hh:mm:ss'),
    });
    counter++;

}

module.exports = { valChart, updateValueChart }

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}