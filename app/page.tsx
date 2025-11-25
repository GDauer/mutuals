
import Hero from "@/components/Hero";
import InfoCards from "@/components/InfoCards";
import MouseGradient from "@/components/mouse/MouseGradient";
import MouseFollower from "@/components/mouse/MouseFollower";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <MouseGradient />
      <MouseFollower />
      <Hero />
      <InfoCards />

      <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Mutuals. Todos os direitos reservados.
      </footer>
    </main>
  );
}
