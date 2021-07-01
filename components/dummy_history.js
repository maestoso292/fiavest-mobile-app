import History from "./history-models";

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const HISTORY_DATA = {
    1 : new History(
        "1",
        "date 1",
        "5099 Airasia",
        (Math.random() * 100).toFixed(2)
    ),
    2 : new History(
        "2",
        "date 2",
        "5283 Ewint",
        (Math.random() * 100).toFixed(2)
    ),
    3 : new History(
        "3",
        "date 3",
        "1724 Paramon",
        (Math.random() * 100).toFixed(2)
    ),
    4 : new History(
        "4",
        "date 4",
        "7471 Eden",
        (Math.random() * 100).toFixed(2)
    ),
    5 : new History(
        "5",
        "date 5",
        "7088 Pohuat",
        (Math.random() * 100).toFixed(2)
    ),
    6 : new History(
        "6",
        "date 6",
        "5062 Huayang",
        (Math.random() * 100).toFixed(2)
    ),
};