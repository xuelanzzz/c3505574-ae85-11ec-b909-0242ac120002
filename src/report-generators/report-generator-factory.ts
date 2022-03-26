import { ReportType } from "../models/enum";
import { DiagnosticReporter } from "./diagnostic-report-generator";
import { FeedbackReportGenerator } from "./feedback-report-generator";
import { ProgressReportGenerator } from "./progress-report-generator";
import { ReportGenerator } from "./report-generator";

export class ReportGeneratorFactory {
  constructor() {}
  public getReportGenerator(reportType: ReportType): ReportGenerator {
    switch (reportType) {
      case ReportType.Progress:
        return new ProgressReportGenerator();
        break;
      case ReportType.Diagnostic:
        return new DiagnosticReporter();
        break;
      case ReportType.Feedback:
        return new FeedbackReportGenerator();
        break;
    }
  }
}
