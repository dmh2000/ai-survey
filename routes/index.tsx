import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Reno Developer AI Survey</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold mb-4">Reno Developer AI Survey</h1>
        <p class="mb-4">
          Welcome to our survey about AI tools usage among developers. This survey aims to understand which AI technologies
          are most popular in the developer community.
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
        </div>
      </div>
    </>
  );
}
