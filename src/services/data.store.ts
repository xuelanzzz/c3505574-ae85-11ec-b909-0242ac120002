import { Assessment, Question, Student, Response } from "../models/interface";
import {sortDateDesc} from "../utils";
/**
 * Singleton Data Store service
 */
export class DataStore {
  private static instance: DataStore;
  private readonly students: Student[];
  private readonly assessments: Assessment[];
  private readonly questions: Question[];
  private readonly responses: Response[];

  private constructor() {
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

  public getResponses(sort = true): Response[] {
    return sort?
        this.responses.sort((r1, r2) => sortDateDesc(r1.completed, r2.completed))
      : this.responses;
  }
}
