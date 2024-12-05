import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface QuizTransitionProps {
  children: ReactNode;
}

const slideVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export const QuizTransition = ({ children }: QuizTransitionProps) => (
  <motion.div
    initial="enter"
    animate="center"
    exit="exit"
    variants={slideVariants}
    transition={{ type: "tween", duration: 0.3 }}
    className="w-full"
  >
    {children}
  </motion.div>
);
