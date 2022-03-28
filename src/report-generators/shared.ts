import {AssessmentResultDict, Question, Response, SummaryResult} from "../models/interface";

export const getAssessmentResultsByStrand = (studentLatestResponse: Response, questions: Question[]): AssessmentResultDict => {
    const resultsByStrand: AssessmentResultDict = {};
    studentLatestResponse.responses.forEach((response) => {
        const question = questions.find(
            (question) => question.id === response.questionId
        );
        if (question) {
            if (resultsByStrand[question.strand]) {
                resultsByStrand[question.strand].total++;
                resultsByStrand[question.strand].correct =
                    response.response === question.config.key
                        ? resultsByStrand[question.strand].correct + 1
                        : resultsByStrand[question.strand].correct;
            } else {
                resultsByStrand[question.strand] = {
                    total: 1,
                    correct: response.response === question.config.key ? 1 : 0,
                };
            }
        } else {
            throw new Error(`Can't find question id ${response.questionId}`);
        }
    });
    return resultsByStrand;
}

export const getResultSummary = (resultsByStrand: AssessmentResultDict): SummaryResult => {
    return Object.keys(resultsByStrand).reduce(
        (prev, curr) => {
            prev.correct = prev.correct + resultsByStrand[curr].correct;
            prev.total = prev.total + resultsByStrand[curr].total;
            return prev;
        },
        {
            total: 0,
            correct: 0,
        }
    )
}