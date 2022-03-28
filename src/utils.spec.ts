import {sortDateAsc, sortDateDesc} from "./utils";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";

describe('utils', () => {
    dayjs.extend(customParseFormat)
    dayjs.extend(isSameOrAfter);

    it('should sort date desc', () => {
        const date1 = '16/12/2019 10:00:00';
        const date2 = '18/12/2020 10:00:00';
        expect(sortDateDesc(date1, date2)).toBe(1);
    })

    it('should sort date asc', () => {
        const date1 = '16/12/2019 10:00:00';
        const date2 = '18/12/2021 10:00:00';
        expect(sortDateAsc(date1, date2)).toBe(-1);
    })
})