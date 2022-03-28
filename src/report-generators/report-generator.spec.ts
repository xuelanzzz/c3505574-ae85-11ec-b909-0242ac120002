import {ReportGenerator} from "./report-generator";

describe('ReportGenerator', () => {
    it('Should throw error if student does not exist', () => {
        const studentId = 'demo'
        expect(() => new ReportGenerator(studentId)).toThrow(`Can't find student ${studentId}`)
    })

    it('Should not throw error if student exists', () => {
        const studentId = 'student1'
        expect(() => new ReportGenerator(studentId)).not.toThrow(`Can't find student ${studentId}`)
    })
})