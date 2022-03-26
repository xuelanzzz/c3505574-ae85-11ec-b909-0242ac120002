import { DataStore } from "../services/data.store";
import { ReportGenerator } from "./report-generator";

export class DiagnosticReporter extends ReportGenerator {
  public generateReport(studentId: string): string {
    const dataStore = DataStore.getInstance();
    console.log('dataStore', dataStore);
    console.log('studentId', studentId);
    return '';
  }
}
