class TestCase {
    #pass;
    constructor() {
        this.#pass = true;
    }

    run() {
        let total = 8;
        for (let i = 1; i <= total; i++) {
            this[`testcase${i}`]();
        }
        if (this.#pass) {
            console.log("PASSED");
        }
    }

    #isEqual(array1, array2) {
        return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
    }

    #check(start, end, want, msg) {
        let got = new DateTimeDiff(start, end).toArray();
        if (!this.#isEqual(want, got)) {
            console.log("FAILED:", msg);
            console.log("-> want:", want);
            console.log("-> got:", got);
            this.#pass = false;
        }
    }

    testcase1() {
        let start = new Date("2020-02-06 10:24:00");
        let end = new Date("2022-02-06 10:23:00");
        let want = [1, 11, 30, 23, 59, 0];
        this.#check(start, end, want, "testcase1");
    }

    testcase2() {
        let start = new Date("2020-05-06 10:24:00");
        let end = new Date("2022-05-06 10:23:00");
        let want = [1, 11, 29, 23, 59, 0];
        this.#check(start, end, want, "testcase2");
    }

    testcase3() {
        let start = new Date("2020-01-06 10:24:00");
        let end = new Date("2022-01-06 10:23:00");
        let want = [1, 11, 30, 23, 59, 0];
        this.#check(start, end, want, "testcase3");
    }

    testcase4() {
        let start = new Date("2020-01-06 10:24:00");
        let end = new Date("2022-01-10 10:23:00");
        let want = [2, 0, 3, 23, 59, 0];
        this.#check(start, end, want, "testcase4");
    }

    testcase5() {
        let start = new Date("2020-01-06 10:24:10");
        let end = new Date("2022-02-06 10:24:00");
        let want = [2, 0, 30, 23, 59, 50];
        this.#check(start, end, want, "testcase5");
    }

    testcase6() {
        let start = new Date("2020-02-06 10:24:10");
        let end = new Date("2022-01-05 09:23:00");
        let want = [1, 10, 29, 22, 58, 50];
        this.#check(start, end, want, "testcase6");
    }

    testcase7() {
        let start = new Date("2020-02-06 10:24:00");
        let end = new Date("2022-02-06 10:24:00");
        let want = [2, 0, 0, 0, 0, 0];
        this.#check(start, end, want, "testcase7");
    }

    testcase8() {
        let start = new Date("2020-01-01 00:00:01");
        let end = new Date("2022-01-01 00:00:00");
        let want = [1, 11, 30, 23, 59, 59];
        this.#check(start, end, want, "testcase8");
    }
}

const testcase = new TestCase();
testcase.run();
