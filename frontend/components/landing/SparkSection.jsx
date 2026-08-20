import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import MaskRevealImage from "./MaskRevealImage";
import HandWrittenNote from "./HandWrittenNote";

function SparkSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

  return (
    <section ref={sectionRef} className="spark-section">
      <div className="spark-content">
        <motion.p
          className="spark-eyebrow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          02 — THE SPARK
        </motion.p>

        <motion.h2 className="spark-title">
          For the past few days,
          <br />
          <span>YouTube</span>
          kept showing me
          <br />
          these...
        </motion.h2>

        <motion.div
          className="spark-image-wrapper"
          style={{
            scale: imageScale,
            y: imageY,
          }}
        >
          <MaskRevealImage
            src="/smartboard-inspiration.webp"
            alt="Smartboard inspiration"
          />
        </motion.div>

        <HandWrittenNote>
    wait... that's actually cool.
  </HandWrittenNote>
      </div>
    </section>
  );
}

export default SparkSection;
