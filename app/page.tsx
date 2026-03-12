import { ExampleSVG } from '@/assets/svgs/ExampleSVG';
import { TestIconSVG } from '@/assets/svgs/TestIconSVG';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Project Initialized</h1>
        <div className="flex items-center gap-4">
          <p>Next.js setup complete (Standard Image Support Active).</p>
          <TestIconSVG
            height={100}
            width={100}
            fill="pink"
            stroke="green"
            strokeWidth={0.5}
          />
          <ExampleSVG />
        </div>
      </main>
    </div>
  );
}
