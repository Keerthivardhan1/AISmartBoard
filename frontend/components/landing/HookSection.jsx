import { motion } from "motion/react";

function HookSection() {
  return (
    <section className="hook-section">
      <div className="hook-container">
        <div className="hook-content">
          <motion.p
            className="hook-eyebrow"
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
          >
            01 — THE HOOK
          </motion.p>

          <motion.h1
            className="hook-title"
            initial={{ opacity: 0, y: 60, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
          >
            I didn't plan <br className="hidden sm:inline" />
            to build this.
          </motion.h1>

          <motion.div
            className="question-note"
            initial={{ opacity: 0, rotate: -10, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              type: "spring",
            }}
            viewport={{ once: true }}
          >
            AI SmartBoard
          </motion.div>

          <motion.p
          
            className="question-caption"
            initial={{ opacity: 0, y: 80, rotate: -3 }}
            whileInView={{ opacity: 1, y: 30, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
          >
            Designed for desktop first. Switch to a laptop or monitor for optimal performance.
          </motion.p>
        </div>

        <motion.div
          className="hook-image-wrapper"
          initial={{ opacity: 0, y: 50, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <img
            className="hook-image"
            src="/ui.png"
            alt="sample"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default HookSection;