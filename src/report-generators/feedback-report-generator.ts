import { DataStore } from "../services/data.store";
import { ReportGenerator } from "./report-generator";

export class FeedbackReportGenerator extends ReportGenerator {
  public generateReport(studentId: string): string {
    const dataStore = DataStore.getInstance();
    return '';
  }
}
