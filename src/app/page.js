import Image from "next/image";
import Banner from "./components/banner";
import Features from "./components/features";
import Showcase from "./components/showcase";
import Testimonials from "./components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Banner />
      <Showcase />
      <Features />
      <Testimonials />
    </div>
  );
}
