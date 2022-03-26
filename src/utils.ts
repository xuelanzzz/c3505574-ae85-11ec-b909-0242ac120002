import dayjs from "dayjs";

export const sortDateDesc = (date1?: string, date2?: string) => {
    if (!date1 || !date2) {
        return 0;
    }
    return dayjs(date1, "DD/MM/YYYY HH:mm:ss").isSameOrAfter(dayjs(date2, "DD/MM/YYYY HH:mm:ss")) ? -1 : 1;
}

export const sortDateAsc = (date1?: string, date2?: string) => {
    if (!date1 || !date2) {
        return 0;
    }
    return dayjs(date2, "DD/MM/YYYY HH:mm:ss").isSameOrAfter(dayjs(date1, "DD/MM/YYYY HH:mm:ss")) ? -1 : 1;
}

