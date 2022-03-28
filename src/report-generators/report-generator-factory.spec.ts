import {ReportGeneratorFactory} from "./report-generator-factory";
import {ReportType} from "../models/enum";
import {ProgressReportGenerator} from "./progress-report-generator";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {DiagnosticReporter} from "./diagnostic-report-generator";
import {FeedbackReportGenerator} from "./feedback-report-generator";


describe('ReportGeneratorFactory', () => {
    dayjs.extend(isSameOrAfter);
    it('Should return ProgressReportGenerator if report type is Progress', () => {
        const studentId = 'student1'
        const generator = new ReportGeneratorFactory(studentId).getReportGenerator(ReportType.Progress);
        expect(generator instanceof ProgressReportGenerator).toBe(true);
    })

    it('Should return FeedbackReportGenerator if report type is Feedback', () => {
        const studentId = 'student1'
        const generator = new ReportGeneratorFactory(studentId).getReportGenerator(ReportType.Feedback);
        expect(generator instanceof FeedbackReportGenerator).toBe(true);
    })

    it('Should return ProgressReportGenerator if report type is diagnostic', () => {
        const studentId = 'student1'
        const generator = new ReportGeneratorFactory(studentId).getReportGenerator(ReportType.Diagnostic);
        expect(generator instanceof DiagnosticReporter).toBe(true);
    })
})