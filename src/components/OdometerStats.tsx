import { Fragment, useRef, useState, useEffect, type FC } from "react";
import { motion, useInView } from "motion/react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

const ALL_STATS: Stat[] = [
  { value: "40%", label: "Faster Processing" },
  { value: "12+", label: "Platforms Shipped" },
  { value: "4mo", label: "Average ROI" },
];

const MOBILE_STATS: Stat[] = ALL_STATS.filter((_, i) => i === 0 || i === 2);

// ─── Delays ─────────────────────────────────────────────────────────────────

function computeDelays(stats: Stat[]): number[] {
  const delays: number[] = [];
  let cumulative = 0;
  for (const stat of stats) {
    delays.push(cumulative);
    cumulative += stat.value.length * 80 + 200 + 300; // char stagger + label gap + buffer
  }
  return delays;
}

const DESKTOP_DELAYS = computeDelays(ALL_STATS);
const MOBILE_DELAYS = computeDelays(MOBILE_STATS);

// ─── FlipDigit ───────────────────────────────────────────────────────────────

interface FlipDigitProps {
  char: string;
  delay: number;
}

const FlipDigit: FC<FlipDigitProps> = ({ char, delay }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFlipped(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className="inline-block w-[0.65em] h-[1.2em] overflow-hidden relative"
      style={{
        perspective: 200,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
        background: "rgba(0,0,0,0.02)",
        borderRadius: 4,
      }}
    >
      {/* Outgoing "0" */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        style={{ backfaceVisibility: "hidden", transformOrigin: "bottom center" }}
        initial={{ rotateX: 0, opacity: 1 }}
        animate={flipped ? { rotateX: -90, opacity: 0 } : { rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
        0
      </motion.span>

      {/* Incoming digit */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        style={{ backfaceVisibility: "hidden", transformOrigin: "top center" }}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={flipped ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {char}
      </motion.span>
    </span>
  );
};

// ─── StatGroup ───────────────────────────────────────────────────────────────

interface StatGroupProps {
  stat: Stat;
  baseDelay: number;
}

function StatGroup({ stat, baseDelay }: StatGroupProps) {
  const chars = stat.value.split("");
  const lastCharDelay = baseDelay + (chars.length - 1) * 80;
  const labelDelay = lastCharDelay + 200;

  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), labelDelay);
    return () => clearTimeout(timer);
  }, [labelDelay]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-brand-navy flex">
        {chars.map((ch, i) => (
          <FlipDigit key={i} char={ch} delay={baseDelay + i * 80} />
        ))}
      </div>
      <motion.span
        className="text-xs text-brand-muted mt-2 tracking-wide uppercase"
        initial={{ opacity: 0, y: 6 }}
        animate={showLabel ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {stat.label}
      </motion.span>
    </div>
  );
}

// ─── Separator ───────────────────────────────────────────────────────────────

function Separator({ delay }: { delay: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      className="w-px h-12 bg-brand-gray/40"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// ─── OdometerStats ───────────────────────────────────────────────────────────

export default function OdometerStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setTriggered(true), 800);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className="absolute bottom-12 left-0 right-0 z-10">
      {/* Desktop: 3 stats */}
      <div className="hidden md:flex items-center justify-center gap-10 lg:gap-14">
        {triggered &&
          ALL_STATS.map((stat, i) => (
            <Fragment key={stat.value}>
              {i > 0 && <Separator delay={DESKTOP_DELAYS[i] - 200} />}
              <StatGroup stat={stat} baseDelay={DESKTOP_DELAYS[i]} />
            </Fragment>
          ))}
      </div>

      {/* Mobile: 2 stats */}
      <div className="flex md:hidden items-center justify-center gap-8">
        {triggered &&
          MOBILE_STATS.map((stat, i) => (
            <Fragment key={stat.value}>
              {i > 0 && <Separator delay={MOBILE_DELAYS[i] - 200} />}
              <StatGroup stat={stat} baseDelay={MOBILE_DELAYS[i]} />
            </Fragment>
          ))}
      </div>
    </div>
  );
}
