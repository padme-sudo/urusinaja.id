import { motion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Jeda animasi dalam detik. */
  delay?: number;
  /** Jarak geser awal dalam px. */
  y?: number;
}

/** Fade + geser naik saat masuk viewport (sekali saja). */
export function Reveal({ children, className, style, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
