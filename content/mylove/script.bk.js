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

        // handle year
        this.year = this.#end.getFullYear() - this.#start.getFullYear();

        // handle month
        let deltaMonth = this.#end.getMonth() - this.#start.getMonth();
        if (deltaMonth > 0) {
            this.month = deltaMonth;
        } else {
            this.month = 12 + deltaMonth;
            this.year -= 1;
        }

        // handle day
        let deltaDay = this.#end.getDate() - this.#start.getDate();
        if (deltaDay > 0) {
            this.day = deltaDay;
        } else {
            // if the month is Jan, will get Dec of the previous year
            if (this.#start.getMonth() === 0) {
                this.day = this.#totalDayInMonth(this.#start.getFullYear() - 1, 11) + deltaDay;
            } else {
                this.day = this.#totalDayInMonth(this.#start.getFullYear(), this.#start.getMonth() - 1) + deltaDay;
            }
            this.month -= 1;
        }

        // handle hour
        let deltaHour = this.#end.getHours() - this.#start.getHours();
        if (deltaHour > 0) {
            this.hour = deltaHour;
        } else {
            this.hour = 24 + deltaHour;
            this.day -= 1;
        }

        // handle minute
        let deltaMinute = this.#end.getMinutes() - this.#start.getMinutes();
        if (deltaMinute > 0) {
            this.minute = deltaMinute;
        } else {
            this.minute = 60 + deltaMinute;
            this.hour -= 1;
        }

        // handle second
        let deltaSecond = this.#end.getSeconds() - this.#start.getSeconds();
        if (deltaSecond >= 0) {
            this.second = deltaSecond;
        } else {
            this.second = 60 + deltaSecond;
            this.minute -= 1;
        }

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
