import { MotionConfig } from "motion/react";
import { IoiStyles } from "./ui";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { RenditionDemo } from "./RenditionDemo";
import { Formats } from "./Formats";
import { CacheDemo } from "./CacheDemo";
import { Integrations } from "./Integrations";
import { StickerWall } from "./StickerWall";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { Footer } from "./Footer";

export default function Ioi() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="io-root relative min-h-screen overflow-x-clip">
        <IoiStyles />
        <Nav />
        <main>
          <Hero />
          <RenditionDemo />
          <Formats />
          <CacheDemo />
          <Integrations />
          <StickerWall />
          <Pricing />
          <Faq />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
