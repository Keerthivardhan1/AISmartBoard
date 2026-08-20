import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function MaskRevealImage({ src, alt }) {

    const ref = useRef();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end center"]
    });

    const maskSize = useTransform(
  scrollYProgress,
  [0, 1],
  ["0% 100%", "100% 100%"]
);

    return (
        <motion.div
            ref={ref}
            className="mask-image"
            style={{
                WebkitMaskSize: maskSize,
                maskSize: maskSize
            }}
        >
            <img src={src} alt={alt}/>
        </motion.div>
    )
}

export default MaskRevealImage;