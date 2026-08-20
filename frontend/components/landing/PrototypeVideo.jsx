import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function PrototypeVideo() {
  const ref = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);

  const handleTryNow = () => {
    navigate("/smartboard");
  }


  return (
    <motion.div
      ref={ref}
      className="prototype-video"
      style={{
        scale,
        y,
        borderRadius: radius,
      }}
    >
      <video
        src="/smartboard-demo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        color:"white",
        padding:"10px",
      }}
      >Would like to try: <button className="trynow" onClick={handleTryNow}>Try Now</button></motion.p>
    </motion.div>
  );
}

export default PrototypeVideo;