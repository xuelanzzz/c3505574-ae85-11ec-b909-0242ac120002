import { ReportType } from "./models/enum";
import { CliCommand } from "./models/interface";
import { ReportGeneratorFactory } from "./report-generators/report-generator-factory";

export class CliCommandHandler {

  public handle(command: CliCommand) {
    this.validateCommand(command);
    const reportFactory = new ReportGeneratorFactory(command.studentId);
    const generator = reportFactory.getReportGenerator(command.reportType);
    const result = generator.generateReport();
    console.log(result);
  }

  private validateCommand(command: CliCommand): void {
    const errors = [];
    if (!(command.reportType in ReportType)) {
      errors.push(new Error("Invalid report type"));
    }

    if (!command.studentId) {
      errors.push(new Error("Student ID is required"));
    }
    if (errors.length > 0) {
      throw errors;
    }
  }
}
