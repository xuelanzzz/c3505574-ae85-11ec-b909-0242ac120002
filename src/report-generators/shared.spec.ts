import {AssessmentResultDict} from "../models/interface";
import {getResultSummary} from "./shared";

describe('getResultSummary', () => {
    it('Should get result summary based on resultsByStrand', () => {
        const resultsByStrand: AssessmentResultDict = {
            a: {
                total: 5,
                correct: 3
            },
        };
        const result = getResultSummary(resultsByStrand);
        expect(result).toEqual({
            total: 5,
            correct: 3
        })
    })

    it('Should get result summary based on resultsByStrand with multiple strand', () => {
        const resultsByStrand: AssessmentResultDict = {
            a: {
                total: 5,
                correct: 3
            },
            b: {
                total: 5,
                correct: 5
            }
        };
        const result = getResultSummary(resultsByStrand);
        expect(result).toEqual({
            total: 10,
            correct: 8
        })
    })
})