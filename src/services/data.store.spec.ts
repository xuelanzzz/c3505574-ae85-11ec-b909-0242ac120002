import {DataStore} from "./data.store";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

describe('DataStore', () => {
    dayjs.extend(isSameOrAfter);
    const dataStore = DataStore.getInstance();
    it('should have students data once store is initialised', () => {
        expect(dataStore.getStudents().length).toBeGreaterThan(0);
    })

    it('should have assessments data once store is initialised', () => {
        expect(dataStore.getAssessments().length).toBeGreaterThan(0);
    })

    it('should have questions data once store is initialised', () => {
        expect(dataStore.getQuestions().length).toBeGreaterThan(0);
    })

    it('should have responses data once store is initialised', () => {
        expect(dataStore.getResponses().length).toBeGreaterThan(0);
    })
})