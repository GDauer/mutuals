
import Hero from "@/components/Hero";
import InfoCards from "@/components/InfoCards";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <InfoCards />

      <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Mutuals. Todos os direitos reservados.
      </footer>
    </main>
  );
}
