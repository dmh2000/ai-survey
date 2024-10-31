import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";

export interface Question {
  id: number;
  question: string;
}

export interface Answer {
  id: number;
  question_id: number;
  answer: string;
  count: number;
}

export class Database {
  private db: DB;

  constructor() {
    this.db = new DB("./data/survey.db");
    this.init();
  }

  private init() {
    const schema = Deno.readTextFileSync("./data/schema.sql");
    this.db.execute(schema);
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
    this.db.query(
      "UPDATE ANSWERS SET count = count + 1 WHERE id = ?",
      [answerId]
    );
  }
}

export const db = new Database();
