import SplashScreen from "@/components/SplashScreen";
import MovingBackground from "@/components/MovingBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Landing from "@/pages/Landing";
import Events from "@/pages/Events";

const Index = () => {
  return (
    <div className="relative noise-overlay">
      <MovingBackground />
      <ScrollProgress />
      <SplashScreen />

      {/* Spacer for splash screen scroll-away */}
      <div className="h-screen" />

      {/* About Us (Landing) */}
      <Landing />

      {/* Events below */}
      <Events />
    </div>
  );
};

export default Index;
