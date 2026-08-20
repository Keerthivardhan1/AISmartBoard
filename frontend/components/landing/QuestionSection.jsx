import { motion } from "motion/react";

function QuestionSection() {
  return (
    <section className="question-section">

      <div className="question-content">

        <motion.div
          className="question-line"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h1 className="question-word">WHAT</h1>
          <h1 className="question-word outline">IF</h1>
        </motion.div>

        <motion.div
          className="question-line right"
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h1 className="question-word">I COULD</h1>
        </motion.div>

        <motion.div
          className="question-line"
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h1 className="question-word">BUILD</h1>
        </motion.div>

        <p className="question-caption">
  So I asked myself...
</p>

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
          one?
        </motion.div>

      </div>

    </section>
  );
}

export default QuestionSection;