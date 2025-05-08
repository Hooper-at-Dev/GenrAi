import FeaturedCourses from "./components/ui/FeaturedCources";
import HeroSection from "./components/ui/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <div>
        <HeroSection/>
        <FeaturedCourses/>
      </div>
    </main>
  );
}
