import { motion } from "motion/react";
function HandWrittenNote({children}){

    return(
        <motion.div
            className="hand-note"
            initial={{
                opacity:0,
                rotate:-8,
                y:20
            }}
            whileInView={{
                opacity:1,
                rotate:-4,
                y:0
            }}
            transition={{
                duration:1
            }}
            viewport={{once:true}}
        >
            {children}
        </motion.div>
    )
}

export default HandWrittenNote;