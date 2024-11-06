import { Handlers } from "$fresh/server.ts";
import { db } from "../utils/db.ts";

export const handler: Handlers = {
  GET: async (_req, _ctx) => {
    const questions = db.getQuestions();
    const firstQuestionId = questions[0]?.id || 1;
    
    return new Response("Redirecting to first question", {
      status: 303,
      headers: { location: `/question/${firstQuestionId}` },
    });
  },
};
