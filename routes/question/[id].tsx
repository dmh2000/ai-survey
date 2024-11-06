import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import Navigation from "../../components/Navigation.tsx";
import { db } from "../../utils/db.ts";
import word_clean from "../../utils/words.ts";
import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
await ammonia.init();

interface QuestionData {
  question: {
    id: number;
    question: string;
    answers: Array<{
      id: number;
      answer: string;
      selected: boolean;
    }>;
    comment: {
      id: number;
      text: string;
    };
  };
  totalQuestions: number;
}

export const handler: Handlers<QuestionData> = {
  GET: (req, ctx) => {
    const cookies = getCookies(req.headers);
    if (cookies.survey_done === "true") {
      return new Response("Already done!", {
        status: 303,
        headers: { location: "/results" },
      });
    }

    const questionId = parseInt(ctx.params.id);
    const questions = db.getQuestions();
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return new Response("Question not found", {
        status: 303,
        headers: { location: "/results" },
      });
    }

    const answers = db.getAnswers(questionId).map((a) => ({
      id: a.id,
      answer: a.answer,
      selected: false,
    }));

    return ctx.render({
      question: {
        id: question.id,
        question: question.question,
        answers,
        comment: {
          id: question.id,
          text: "",
        },
      },
      totalQuestions: questions.length,
    });
  },

  POST: async (req) => {
    const formData = await req.formData();
    const questionId = parseInt(formData.get("questionId")?.toString() || "0");
    const submitType = formData.get("submitType");

    // Handle answers
    const answers = formData.getAll("answers");
    for (const answerId of answers) {
      db.incrementAnswerCount(Number(answerId));
    }

    // Handle comment
    const comment = formData.get(`comment-${questionId}`);
    if (comment && typeof comment === "string") {
      const xss = ammonia.clean(comment);
      const words = word_clean(xss);
      db.saveComment(questionId, words);
    }

    const headers = new Headers();

    if (submitType === "submit") {
      setCookie(headers, {
        name: "survey_done",
        value: "true",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      });
      headers.set("location", "/results");
    } else {
      // Navigate to next or previous question
      const questions = db.getQuestions();
      const currentIndex = questions.findIndex((q) => q.id === questionId);
      let nextId;

      if (submitType === "next" && currentIndex < questions.length - 1) {
        nextId = questions[currentIndex + 1].id;
      } else if (submitType === "back" && currentIndex > 0) {
        nextId = questions[currentIndex - 1].id;
      } else {
        nextId = questions[0].id;
      }

      headers.set("location", `/question/${nextId}`);
    }

    return new Response("", {
      status: 303,
      headers,
    });
  },
};

export default function Question({ data }: PageProps<QuestionData>) {
  const { question, totalQuestions } = data;

  return (
    <>
      <Head>
        <title>Question {question.id} - Reno Developer AI Survey</title>
      </Head>
      <Navigation />
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold mb-8">
          Question {question.id} of {totalQuestions}
        </h1>
        <form method="POST">
          <input type="hidden" name="questionId" value={question.id} />

          <div class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">{question.question}</h2>
            <div class="space-y-2">
              {question.answers.map((a) => (
                <div key={a.id} class="flex items-center">
                  <input
                    type="checkbox"
                    id={`answer-${a.id}`}
                    name="answers"
                    value={a.id}
                    checked={a.selected}
                    class="mr-2"
                  />
                  <label htmlFor={`answer-${a.id}`}>{a.answer}</label>
                </div>
              ))}
            </div>
            <div class="mt-4">
              <label htmlFor={`comment-${question.id}`} class="block mb-2">
                Additional Comments:
              </label>
              <textarea
                id={`comment-${question.id}`}
                name={`comment-${question.id}`}
                rows={3}
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional comments here..."
              ></textarea>
            </div>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              name="submitType"
              value="back"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              disabled={question.id === 1}
            >
              Back
            </button>
            <button
              type="submit"
              name="submitType"
              value="next"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
            <button
              type="submit"
              name="submitType"
              value="submit"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Survey
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
