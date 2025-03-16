import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="py-2 px-5 md:px-16 lg:px-24 xl:px-36">
      <Header/>
      <Hero/>
    </div>
  );
}
