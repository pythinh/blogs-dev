const startDate = new Date("2020-02-06 10:24:00");
const dayInMonthOfYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dayInMonthOfLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

window.addEventListener("load", () => {
    displayTime();
})

class DateTimeDiff {
    #start;
    #end;
    constructor(start, end) {
        this.#start = start;
        this.#end = end;
        this.year = 0, this.month = 0, this.day = 0;
        this.hour = 0, this.minute = 0, this.second = 0;
        this.#calcDiff();
    }

    // month: index from 0
    #totalDayInMonth(year, month) {
        // check leap year
        if ((year % 4 == 0) && (year % 100 != 0) | (year % 400 == 0)) {
            return dayInMonthOfLeapYear[month];
        } else {
            return dayInMonthOfYear[month];
        }
    }

    // HH:MM:SS
    #formatTime() {
        if (this.hour < 10) {
            this.hour = `0${this.hour}`;
        }
        if (this.minute < 10) {
            this.minute = `0${this.minute}`;
        }
        if (this.second < 10) {
            this.second = `0${this.second}`;
        }
    }

    #calcDiff() {
        let delta = this.#end.getTime() - this.#start.getTime();
        if (delta <= 0) {
            return;
        }

        // handle second
        delta = this.#end.getSeconds() - this.#start.getSeconds();
        if (delta >= 0) {
            this.second += delta;
        } else {
            this.second += 60 + delta;
            this.minute -= 1;
        }

        // handle minute
        delta = this.#end.getMinutes() - this.#start.getMinutes();
        if (delta >= 0 && this.minute == 0) {
            this.minute = delta;
        } else {
            this.minute += 60 + delta;
            this.hour -= 1;
        }

        // handle hour
        delta = this.#end.getHours() - this.#start.getHours();
        if (delta >= 0 && this.hour == 0) {
            this.hour = delta;
        } else {
            this.hour += 24 + delta;
            this.day -= 1;
        }

        // handle day
        delta = this.#end.getDate() - this.#start.getDate();
        if (delta >= 0 && this.day == 0) {
            this.day = delta;
        } else {
            // if the month is Jan, will get Dec of the previous year
            if (this.#start.getMonth() === 0) {
                this.day += this.#totalDayInMonth(this.#start.getFullYear() - 1, 11) + delta;
            } else {
                this.day += this.#totalDayInMonth(this.#start.getFullYear(), this.#start.getMonth() - 1) + delta;
            }
            this.month -= 1;
        }

        // handle month
        delta = this.#end.getMonth() - this.#start.getMonth();
        if (delta >= 0 && this.month == 0) {
            this.month = delta;
        } else {
            this.month += 12 + delta;
            this.year -= 1;
        }

        // handle year
        this.year += this.#end.getFullYear() - this.#start.getFullYear();

        this.#formatTime();
    }

    toString() {
        return `${this.year} năm ${this.month} tháng ${this.day} ngày ${this.hour} giờ ${this.minute} phút ${this.second} giây`;
    }

    toArray() {
        return [this.year, this.month, this.day, parseInt(this.hour), parseInt(this.minute), parseInt(this.second)];
    }
}

function displayTime() {
    let currentDate = new Date();
    let deltaDate = new DateTimeDiff(startDate, currentDate);

    // update time
    document.getElementById("time-year").innerText = deltaDate.year;
    document.getElementById("time-month").innerText = deltaDate.month;
    document.getElementById("time-day").innerText = deltaDate.day;
    document.getElementById("time-hour").innerText = deltaDate.hour;
    document.getElementById("time-minute").innerText = deltaDate.minute;
    document.getElementById("time-second").innerText = deltaDate.second;
    setTimeout(displayTime, 1000);
}
