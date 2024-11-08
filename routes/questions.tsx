import { Handlers } from "$fresh/server.ts";
import { db, Question } from "../utils/db.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET: (_req, _ctx) => {
    try {
      const questions: Question[] = db.getQuestions();
      if (questions.length === 0) {
        return new Response("No questions found", { status: 404 });
      }
      const firstQuestionId = questions[0]?.id;

      const cookies = getCookies(_req.headers);
      console.log("questions.tsx", cookies);

      const headers = new Headers();
      headers.set("location", `/question/${firstQuestionId}`);

      return new Response("", {
        status: 303,
        headers,
      });
    } catch (e) {
      console.error(e);
      return new Response("Something went wrong", { status: 500 });
    }
  },
};
