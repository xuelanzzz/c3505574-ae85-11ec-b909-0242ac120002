import { Assessment, Question, Student, Response } from "../models/interface";

/**
 * Singleton Data Store service
 */
export class DataStore {
  private static instance: DataStore;
  private students: Student[];
  private assessments: Assessment[];
  private questions: Question[];
  private responses: Response[];

  constructor() {
    this.students = require("../../data/students.json");
    this.assessments = require("../../data/assessments.json");
    this.questions = require("../../data/questions.json");
    this.responses = require("../../data/student-responses.json");
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }

    return DataStore.instance;
  }

  public getStudents(): Student[] {
    return this.students;
  }

  public getAssessments(): Assessment[] {
    return this.assessments;
  }

  public getQuestions(): Question[] {
    return this.questions;
  }

  public getResponses(): Response[] {
    return this.responses;
  }
}
