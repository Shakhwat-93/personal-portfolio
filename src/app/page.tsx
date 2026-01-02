import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Projects from "@/components/home/Projects";
import Process from "@/components/home/Process";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Process />
      <Contact />
    </main>
  );
}
