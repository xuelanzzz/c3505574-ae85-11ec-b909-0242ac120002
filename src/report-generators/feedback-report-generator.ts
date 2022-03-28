import { ReportGenerator } from "./report-generator";
import { Option, Response, SummaryResult } from "../models/interface";
import dayjs from "dayjs";
import { getAssessmentResultsByStrand, getResultSummary } from "./shared";

export class FeedbackReportGenerator extends ReportGenerator {
  constructor(protected studentId: string) {
    super(studentId);
  }
  public generateReport(): string {
    const studentLatestResponse = this.responses.find(
      (response) =>
        response.student.id === this.student.id && response.completed
    );
    if (!studentLatestResponse) {
      throw new Error(`Can\'t find response for student ${this.student.id}`);
    }
    const feedback: Feedback[] = [];
    studentLatestResponse.responses.forEach((curr) => {
      const question = this.questions.find(
        (question) => question.id === curr.questionId
      );
      if (!question) {
        throw new Error(`Can\'t find question for question ${curr.questionId}`);
      }
      if (question.config.key !== curr.response) {
        const response = question.config.options.find(
          (option) => option.id === curr.response
        );
        if (!response) {
          throw new Error(`Can\'t find response for ${curr.questionId}`);
        }
        const correctAnswer = question.config.options.find(
          (option) => option.id === question.config.key
        );
        if (!correctAnswer) {
          throw new Error(`Can\'t find answer for ${question.id}`);
        }
        feedback.push({
          question: question.stem,
          response,
          correctAnswer,
          hint: question.config.hint,
        });
      }
    });
    const summaryResult = getResultSummary(
      getAssessmentResultsByStrand(studentLatestResponse, this.questions)
    );

    return this.getFeedbackOutput(
      feedback,
      studentLatestResponse,
      summaryResult
    );
  }

  private getFeedbackOutput(
    feedback: Feedback[],
    recentAssessmentResponse: Response,
    summaryResult: SummaryResult
  ): string {
    const assessment = this.assessments.find(
      (assessment) => assessment.id === recentAssessmentResponse.assessmentId
    );
    if (!assessment) {
      throw new Error(
        `Can\'t find assessment ${recentAssessmentResponse.assessmentId} for student ${this.student.id}`
      );
    }
    const nameAndDate = `${this.student.firstName} ${
      this.student.lastName
    } recently completed ${assessment.name} on ${dayjs(
      recentAssessmentResponse.completed,
      "DD/MM/YYYY HH:mm:ss"
    ).format("Dt[h] MMMM YYYY hh:mm A")}\n`;
    const shouldShowFeedback = summaryResult.correct < summaryResult.total;
    const result = `He got ${summaryResult.correct} questions right out of ${summaryResult.total}.${shouldShowFeedback ? 'Feedback for wrong answers given below\n\n' : '\n'}`;
    if (!shouldShowFeedback) {
      return `${nameAndDate}${result}`
    }
    const feedbackOutput = feedback
      .map(
        (f) =>
          `Question: ${f.question}\nYour answer: ${f.response.label} with value ${f.response.value}\nRight answer: ${f.correctAnswer.label} with value ${f.correctAnswer.value}\nHint: ${f.hint}\n`
      )
      .join("\n");
    return `${nameAndDate}${result}${feedbackOutput}`;
  }
}

interface Feedback {
  question: string;
  response: Option;
  correctAnswer: Option;
  hint: string;
}
