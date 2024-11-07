import { Handlers } from "$fresh/server.ts";
import { db } from "../utils/db.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET: (_req, _ctx) => {
    const questions = db.getQuestions();
    const firstQuestionId = questions[0]?.id || 1;

    const cookies = getCookies(_req.headers);
    console.log("questions.tsx", cookies);

    const headers = new Headers();
    headers.set("location", `/question/${firstQuestionId}`);

    return new Response("", {
      status: 303,
      headers,
    });
  },
};
