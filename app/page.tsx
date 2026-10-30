import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { StatsStrip } from "@/components/site/stats";
import { Ticker } from "@/components/site/ticker";
import { RoastMenu } from "@/components/site/roasts";
import { RoastCurve } from "@/components/site/curve";
import { Plans } from "@/components/site/plans";
import { FAQ } from "@/components/site/faq";
import { Newsletter } from "@/components/site/newsletter";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <StatsStrip />
        <Ticker />
        <RoastMenu />
        <RoastCurve />
        <Plans />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
