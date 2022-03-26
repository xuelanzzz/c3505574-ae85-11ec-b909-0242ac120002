import { DataStore } from "../services/data.store";
import { ReportGenerator } from "./report-generator";

export class FeedbackReportGenerator extends ReportGenerator {
  constructor(protected studentId: string) {
    super(studentId);
  }
  public generateReport(): string {
    const dataStore = DataStore.getInstance();
    return '';
  }
}
