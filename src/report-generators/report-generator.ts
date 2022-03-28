import {Assessment, Question, Response, Student} from "../models/interface";
import {DataStore} from "../services/data.store";

export class ReportGenerator {
  private readonly dataStore: DataStore;
  protected readonly student: Student;
  protected readonly students: Student[];
  protected readonly assessments: Assessment[];
  protected readonly responses: Response[];
  protected readonly questions: Question[];

  constructor(protected studentId: string) {
    this.dataStore = DataStore.getInstance();
    this.students = this.dataStore.getStudents();
    const studentIdx = this.students.findIndex(student => student.id === studentId);
    if (studentIdx < 0) {
      throw new Error(`Can't find student ${studentId}`);
    }
    this.student = this.students[studentIdx];
    this.assessments = this.dataStore.getAssessments();
    this.responses = this.dataStore.getResponses();
    this.questions = this.dataStore.getQuestions();
  }

  public generateReport(): string {
    return '';
  }
}
