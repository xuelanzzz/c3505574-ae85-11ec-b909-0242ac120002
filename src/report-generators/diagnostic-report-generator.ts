import dayjs from "dayjs";
import { ReportGenerator } from "./report-generator";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {Assessment, Response, Student} from "../models/interface";
import {getAssessmentResultsByStrand, getResultSummary} from "./shared";

export class DiagnosticReporter extends ReportGenerator {
  constructor(protected studentId: string) {
    super(studentId);
    dayjs.extend(customParseFormat);
  }

  public generateReport(): string {
    const studentLatestResponse = this.responses.find(
      (response) => response.student.id === this.student.id && response.completed
    );
    if (!studentLatestResponse) {
      throw new Error(`Can\'t find response for student ${this.student.id}`);
    }

    const assessment = this.assessments.find(
        (assessment) => assessment.id === studentLatestResponse.assessmentId
      );
    if (!assessment) {
      throw new Error(
        `Can\'t find assessment ${studentLatestResponse.assessmentId} for student ${this.student.id}`
      );
    }

      const resultsByStrand = getAssessmentResultsByStrand(studentLatestResponse, this.questions);
      const overallResult = getResultSummary(resultsByStrand);
    return this.getDiagnosticOutput(
      this.student,
      assessment,
      studentLatestResponse,
      overallResult,
      resultsByStrand
    );
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
