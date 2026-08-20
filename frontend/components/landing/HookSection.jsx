import { motion } from "motion/react";

function HookSection() {
    return (
        <section className="hook-section">

            <div className="hook-content">

                <motion.p
                    className="hook-eyebrow"
                    initial={{ opacity: 0, y: 30 , rotate:-3}}
                    whileInView={{ opacity: 1, y: 0 , rotate:0}}
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
                    initial={{ opacity: 0, y: 100, rotate:-3 }}
                    whileInView={{ opacity: 1, y: 0 , rotate:0}}
                    transition={{
                        duration: 1,
                        delay:0.25,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{
                        once: true,
                        amount: 0.5,
                    }}
                >
                    I didn't plan
                    <br />
                    to build this.
                </motion.h1>

            </div>

        </section>
    );
}

export default HookSection;