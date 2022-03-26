import { ReportGenerator } from "./report-generator";
import dayjs from "dayjs";
import { sortDateAsc } from "../utils";

export class ProgressReportGenerator extends ReportGenerator {
  constructor(protected studentId: string) {
    super(studentId);
  }
  public generateReport(): string {
    const studentAssessments = this.responses.filter(
      (response) => response.student.id === this.studentId && response.completed
    );
    const progressDict: ProgressDict = {};
    studentAssessments.forEach((studentAssessment) => {
      const assessment = this.assessments.find(
        (assessment) => assessment.id === studentAssessment.assessmentId
      );
      if (!assessment) {
        throw new Error(`Assessment ${studentAssessment.id} is invalid`);
      }
      if (progressDict[assessment.id]) {
        progressDict[assessment.id].count++;
      } else {
        progressDict[assessment.id] = {
          assessmentId: studentAssessment.assessmentId,
          assessmentType: assessment.name,
          count: 1,
          totalQuestions: studentAssessment.responses.length,
          attempts: [],
        };
      }

      progressDict[assessment.id].attempts.push(<Attempt>{
        completedDate: studentAssessment.completed,
        score: studentAssessment.results.rawScore,
      });
    });
    return Object.keys(progressDict)
      .map((key) => this.getProgressResult(progressDict[key]))
      .join("\n");
  }

  private getProgressResult(progress: Progress): string {
    const fullName = `${this.student.firstName} ${this.student.lastName}`;
    const summary = `${fullName} has completed ${progress.count} in total. Date and raw score given below:\n`;
    const attemptsOutput = progress.attempts
      .sort((attempt1, attempt2) =>
        sortDateAsc(attempt1.completedDate, attempt2.completedDate)
      )
      .map(
        (attempt) =>
          `Date: ${dayjs(attempt.completedDate, "DD/MM/YYYY HH:mm:ss").format(
            "Dt[h] MMMM YYYY hh:mm A"
          )}, Raw Score: ${attempt.score} out of ${progress.totalQuestions}`
      )
      .join("\n");
    const attemptDiff =
      progress.attempts[0].score -
      progress.attempts[progress.attempts.length - 1].score;
    const insight = `${fullName} got ${Math.abs(attemptDiff)} ${
      attemptDiff > 0 ? "less" : "more"
    } correct in the recent completed assessment than the oldest`;

    return `${summary}${attemptsOutput}\n${insight}`;
  }
}
interface ProgressDict {
  [progressId: string]: Progress;
}

interface Progress {
  assessmentId: string;
  assessmentType: string;
  count: number;
  totalQuestions: number;
  attempts: Attempt[];
}

interface Attempt {
  completedDate: string;
  score: number;
}
