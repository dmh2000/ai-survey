export default function Navigation() {
  return (
    <nav class="bg-gray-800 p-4">
      <div class="max-w-screen-md mx-auto flex gap-4">
        <a href="/" class="text-white hover:text-gray-300">Home</a>
        <a href="/questions" class="text-white hover:text-gray-300">Survey</a>
        <a href="/results" class="text-white hover:text-gray-300">Results</a>
      </div>
    </nav>
  );
}
