import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
}) => {
  const titleCharVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)", y: 50 },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
  };

  return (
    <div className={`flex justify-center flex-wrap ${className}`}>
      {text.split("\n").map((line, lineIndex) => (
        <div key={lineIndex} className="w-full flex justify-center flex-wrap">
          {Array.from(line).map((char, charIndex) => (
            <motion.span
              key={`${lineIndex}-${charIndex}`}
              className="inline-block mx-[0.1em] md:mx-[0.05em]"
              variants={titleCharVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: delay + (lineIndex * line.length + charIndex) * 0.15,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;
