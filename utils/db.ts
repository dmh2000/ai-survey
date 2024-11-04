import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

export interface Question {
  id: number;
  question: string;
  [key: string]: string | number;
}

export interface Answer {
  id: number;
  question_id: number;
  answer: string;
  count: number;
  [key: string]: string | number;
}

interface SurveyQuestion {
  id: number;
  question: string;
  answers: Array<{
    id: number;
    answer: string;
    selected: boolean;
  }>;
}

interface SurveyData {
  questions: SurveyQuestion[];
}

export class Database {
  private db: DB;

  constructor(dbPath?: string) {
    // Use in-memory database if no path provided, otherwise use file
    this.db = new DB(dbPath || ":memory:");
    this.init();
  }

  private init() {
    const schema = Deno.readTextFileSync("./data/schema.sql");
    this.db.execute(schema);
    this.initializeData();
  }

  private initializeData() {
    // Only initialize if the database is empty
    const count = this.db.query(
      "SELECT COUNT(*) as count FROM QUESTIONS"
    )[0][0];
    if (count === 0) {
      const surveyData = JSON.parse(
        Deno.readTextFileSync("./data/questions.json")
      ) as SurveyData;

      for (const q of surveyData.questions) {
        this.db.query("INSERT INTO QUESTIONS (id, question) VALUES (?, ?)", [
          q.id,
          q.question,
        ]);

        for (const a of q.answers) {
          this.db.query(
            "INSERT INTO ANSWERS (id, question_id, answer, count) VALUES (?, ?, ?, 0)",
            [a.id, q.id, a.answer]
          );
        }
      }
    }
  }

  public getQuestions(): Question[] {
    return this.db.queryEntries<Question>("SELECT * FROM QUESTIONS");
  }

  public getAnswers(questionId: number): Answer[] {
    return this.db.queryEntries<Answer>(
      "SELECT * FROM ANSWERS WHERE question_id = ?",
      [questionId]
    );
  }

  public incrementAnswerCount(answerId: number) {
    this.db.query("UPDATE ANSWERS SET count = count + 1 WHERE id = ?", [
      answerId,
    ]);
  }

  public saveComment(questionId: number, comment: string) {
    this.db.query(
      "INSERT INTO COMMENTS (question_id, comment_text) VALUES (?, ?)",
      [questionId, comment]
    );
  }

  public getComments(): Array<{ question: string; comment: string }> {
    return this.db.queryEntries(
      `SELECT q.question, c.comment_text as comment,
              q.id as question_id
       FROM COMMENTS c 
       JOIN QUESTIONS q ON q.id = c.question_id 
       ORDER BY q.id, c.id`
    );
  }
}

// set dbPath as undefined to use in-memory database
const dbPath = "./data/survey.db";
export const db = new Database(dbPath);
