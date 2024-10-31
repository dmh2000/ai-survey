import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Navigation from "../components/Navigation.tsx";
import { db } from "../utils/db.ts";

interface SurveyData {
  questions: Array<{
    id: number;
    question: string;
    answers: Array<{
      id: number;
      answer: string;
    }>;
  }>;
}

export const handler: Handlers<SurveyData> = {
  GET: async (_req, ctx) => {
    const questions = db.getQuestions();
    const surveyData: SurveyData = {
      questions: await Promise.all(
        questions.map(async (q) => ({
          id: q.id,
          question: q.question,
          answers: db.getAnswers(q.id),
        }))
      ),
    };
    return ctx.render(surveyData);
  },

  POST: async (req) => {
    const formData = await req.formData();
    const answers = formData.getAll("answers");
    
    for (const answerId of answers) {
      db.incrementAnswerCount(Number(answerId));
    }

    return new Response("", {
      status: 303,
      headers: { Location: "/results" },
    });
  },
};

export default function Questions({ data }: PageProps<SurveyData>) {
  return (
    <>
      <Head>
        <title>Survey Questions - Reno Developer AI Survey</title>
      </Head>
      <Navigation />
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold mb-8">AI Developer Survey</h1>
        <form method="POST">
          {data.questions.map((q) => (
            <div key={q.id} class="mb-8">
              <h2 class="text-2xl font-semibold mb-4">{q.question}</h2>
              <div class="space-y-2">
                {q.answers.map((a) => (
                  <div key={a.id} class="flex items-center">
                    <input
                      type="checkbox"
                      id={`answer-${a.id}`}
                      name="answers"
                      value={a.id}
                      class="mr-2"
                    />
                    <label htmlFor={`answer-${a.id}`}>{a.answer}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Survey
          </button>
        </form>
      </div>
    </>
  );
}
