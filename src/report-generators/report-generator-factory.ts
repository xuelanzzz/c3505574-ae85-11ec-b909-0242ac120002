import { ReportType } from "../models/enum";
import { DiagnosticReporter } from "./diagnostic-report-generator";
import { FeedbackReportGenerator } from "./feedback-report-generator";
import { ProgressReportGenerator } from "./progress-report-generator";
import { ReportGenerator } from "./report-generator";

export class ReportGeneratorFactory {
  constructor(private studentId: string) {}
  public getReportGenerator(reportType: ReportType): ReportGenerator {
    switch (reportType) {
      case ReportType.Progress:
        return new ProgressReportGenerator(this.studentId);
      case ReportType.Diagnostic:
        return new DiagnosticReporter(this.studentId);
      case ReportType.Feedback:
        return new FeedbackReportGenerator(this.studentId);
    }
  }
}
