import Image from "next/image";
import Banner from "./components/banner";
import Features from "./components/features";
import Showcase from "./components/showcase";
import Testimonials from "./components/testimonials";
import TileCalculator from "./components/tile-calculator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Banner />
      <Showcase />
      <TileCalculator />
      <Features />
      <Testimonials />
    </div>
  );
}
