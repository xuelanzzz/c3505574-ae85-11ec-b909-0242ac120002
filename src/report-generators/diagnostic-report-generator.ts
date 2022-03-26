import dayjs from "dayjs";
import { DataStore } from "../services/data.store";
import { ReportGenerator } from "./report-generator";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {Assessment, Question, Response, Student} from "../models/interface";

export class DiagnosticReporter extends ReportGenerator {
  constructor() {
    super();
    dayjs.extend(customParseFormat);
  }

  public generateReport(studentId: string): string {
    const errors = [];
    const dataStore = DataStore.getInstance();
    const responses = dataStore.getResponses();
    const questions = dataStore.getQuestions();

    const student = dataStore.getStudents().find((stu) => stu.id === studentId);
    if (!student) {
      throw new Error(`Can\'t find student ${studentId}`);
    }

    const studentLatestResponse = responses.find(
      (response) => response.student.id === student.id && response.completed
    );
    if (!studentLatestResponse) {
      throw new Error(`Can\'t find response for student ${student.id}`);
    }

    const assessment = dataStore
      .getAssessments()
      .find(
        (assessment) => assessment.id === studentLatestResponse.assessmentId
      );
    if (!assessment) {
      throw new Error(
        `Can\'t find assessment ${studentLatestResponse.assessmentId} for student ${student.id}`
      );
    }

      const resultsByStrand = this.getDiagnosticResults(studentLatestResponse, questions);
      const overallResult = Object.keys(resultsByStrand).reduce(
      (prev, curr) => {
        prev.correct = prev.correct + resultsByStrand[curr].correct;
        prev.total = prev.total + resultsByStrand[curr].total;
        return prev;
      },
      {
        total: 0,
        correct: 0,
      }
    );
    return this.getDiagnosticOutput(
      student,
      assessment,
      studentLatestResponse,
      overallResult,
      resultsByStrand
    );
  }

    private getDiagnosticResults(studentLatestResponse: Response, questions: Question[]) {
        const resultsByStrand: {
            [strand: string]: {
                total: number;
                correct: number;
            };
        } = {};
        studentLatestResponse?.responses.forEach((response) => {
            const question = questions.find(
                (question) => question.id === response.questionId
            );
            if (question) {
                if (resultsByStrand[question.strand]) {
                    resultsByStrand[question.strand].total++;
                    resultsByStrand[question.strand].correct =
                        response.response === question.config.key
                            ? resultsByStrand[question.strand].correct++
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

    private getDiagnosticOutput(
    student: Student,
    assessment: Assessment,
    studentLatestResponse: Response,
    overallResult: { total: number; correct: number },
    resultsByStrand: { [p: string]: { total: number; correct: number } }
  ) {
    const fullName = `${student.firstName} ${student.lastName}`;
    const date = dayjs(
      studentLatestResponse.completed,
      "DD/MM/YYYY HH:mm:ss"
    ).format("Dt[h] MMMM YYYY hh:mm A");
    const resultByStrand = `${Object.keys(resultsByStrand)
      .map(
        (strand) =>
          `${strand}: ${resultsByStrand[strand].correct} out of ${resultsByStrand[strand].total} correct`
      )
      .join("\n")}`;
    return `${fullName} recently completed ${assessment.name} on ${date}\nHe got ${overallResult.correct} questions right out of ${overallResult.total}. Details by strand given below:\n\n${resultByStrand}`;
  }
}
