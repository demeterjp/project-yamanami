import Link from "next/link";

export default function Numbers() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">数字</h1>
        <p className="text-3xl mt-4">WORK IN PROGRESS</p>

        <Link
          href="/"
          className="inline-block mt-8 px-8 py-4 rounded-2xl bg-zinc-700 hover:bg-zinc-600 text-xl font-bold transition-all"
        >
          BACK
        </Link>
      </div>
    </main>
  );
}