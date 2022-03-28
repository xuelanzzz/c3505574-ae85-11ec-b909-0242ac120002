import { ReportType } from "./enum";

export interface CliCommand {
  studentId: string;
  reportType: ReportType;
}
export interface Assessment {
  id:        string;
  name:      string;
  questions: AssessmentQuestion[];
}
export interface AssessmentQuestion {
  questionId: string;
  position:   number;
}

export interface Question {
  id:     string;
  stem:   string;
  type:   string;
  strand: string;
  config: Config;
}

export interface Config {
  options: Option[];
  key:     string;
  hint:    string;
}
export interface Option {
  id:    string;
  label: string;
  value: string;
}

export interface Response {
  id:           string;
  assessmentId: string;
  assigned:     string;
  started:      string;
  completed?:   string;
  student:      Student;
  responses:    ResponseElement[];
  results:      Results;
}

export interface ResponseElement {
  questionId: string;
  response:   string;
}

export interface Results {
  rawScore: number;
}

export interface Student {
  id:        string;
  yearLevel: number;
  firstName: string;
  lastName:  string;
}

export interface AssessmentResultDict {
  [strand: string]: {
    total: number;
    correct: number;
  }
}

export interface SummaryResult {
  total: number;
  correct: number;
}