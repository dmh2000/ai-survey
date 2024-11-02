import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../utils/db.ts";

interface CommentsData {
  comments: Array<{
    question: string;
    comment: string;
  }>;
}

export const handler: Handlers<CommentsData> = {
  GET: (_req, ctx) => {
    const comments = db.getComments();
    return ctx.render({ comments });
  },
};

export default function Comments({ data }: PageProps<CommentsData>) {
  return (
    <>
      <Head>
        <title>Survey Comments - Reno Developer AI Survey</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold mb-8">Survey Comments</h1>
        {data.comments.length === 0 ? (
          <p class="text-gray-600">No comments have been submitted yet.</p>
        ) : (
          <div class="space-y-8">
            {Object.entries(
              data.comments.reduce((acc, curr) => {
                if (!acc[curr.question]) {
                  acc[curr.question] = [];
                }
                acc[curr.question].push(curr.comment);
                return acc;
              }, {} as Record<string, string[]>)
            ).map(([question, comments]) => (
              <div key={question} class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">{question}</h2>
                <div class="space-y-3 pl-4">
                  {comments.map((comment, idx) => (
                    <p key={idx} class="text-gray-700 whitespace-pre-wrap border-l-4 border-gray-200 pl-4">
                      {comment}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div class="mt-8">
          <a
            href="/"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
}
