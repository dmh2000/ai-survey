import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
// import Navigation from "../components/Navigation.tsx";
import { db } from "../utils/db.ts";
import { Answer, Question } from "../utils/db.ts";

interface ResultsData {
  results: Array<{
    question: Question;
    answers: Answer[];
  }>;
}

export const handler: Handlers<ResultsData> = {
  GET: (_req, ctx) => {
    const questions = db.getQuestions();
    const results = questions.map((q) => ({
      question: q,
      answers: db.getAnswers(q.id)
    }));

    return ctx.render({ results });
  },
};

export default function Results({ data }: PageProps<ResultsData>) {
  return (
    <>
      <Head>
        <title>Survey Results - Reno Developer AI Survey</title>
      </Head>
      {/* <Navigation /> */}
      <div class="p-4 mx-auto max-w-screen-md">
        <div class="flex gap-4 mb-8">
          <a
            href="/"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Home
          </a>
          <a
            href="/comments"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            View Comments
          </a>
        </div>
        <h1 class="text-4xl font-bold mb-8">Survey Completed : Results</h1>
        {data.results.map(({ question, answers }) => (
          <div key={question.id} class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">{question.question}</h2>
            <div>
              <table class="w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th class="border p-2 text-left">Answer</th>
                    <th class="border p-2 text-left">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((answer) => (
                    <tr key={answer.id}>
                      <td class="border p-2">{answer.answer}</td>
                      <td class="border p-2">{answer.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
