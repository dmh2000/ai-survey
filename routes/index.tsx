import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET: (_req, ctx) => {
    const cookies = getCookies(_req.headers);
    if (cookies.survey_done == "true") {
      return new Response("Already done!", {
        status: 303,
        headers: { location: "/results" },
      });
    }
    return ctx.render({});
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Reno Developer AI Survey</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold mb-4">Reno Developer AI Survey</h1>
        <p class="mb-4">
          Welcome to our survey about AI tools usage among developers. This
          survey aims to understand which AI technologies are most popular in
          the developer community.
        </p>
        <div class="flex gap-4">
          <a
            href="/questions"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Take Survey
          </a>
          <a
            href="/results"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            View Results
          </a>
          <a
            href="/comments"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            View Comments
          </a>
        </div>
      </div>
    </>
  );
}
