import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useId,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react';

// --- Brand colors for particles ---
const BRAND_COLORS = ['#1863DC', '#07406B', '#2AA7DF'];

// --- Module-scoped particle ID counter (fix #2) ---
let nextParticleId = 0;

// --- Types ---
type ElasticButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ElasticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: ReactMouseEvent<HTMLElement>) => void;
  className?: string;
  disabled?: boolean;
  variant?: ElasticButtonVariant;
}

// --- Particle types ---
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

// --- Particle burst component ---
function ParticleBurst({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.x,
            y: p.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: p.x + p.vx,
            y: p.y + p.vy + 30, // gravity pull
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: p.color,
            pointerEvents: 'none',
            top: 0,
            left: 0,
            zIndex: 50,
          }}
        />
      ))}
    </>
  );
}

// --- Spawn particles helper ---
function spawnParticles(
  clickX: number,
  clickY: number,
  count: number,
): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
    const speed = 40 + Math.random() * 60;
    return {
      id: nextParticleId++,
      x: clickX,
      y: clickY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 20,
      size: 3 + Math.random() * 2,
      color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
    };
  });
}

// --- Variant configs ---
const variantConfig = {
  primary: {
    hoverScale: 1.03,
    tapScale: 0.97,
    particleCount: { min: 8, max: 12 },
    elasticMorph: true,
    borderUnderline: false,
    ghostNudge: false,
  },
  secondary: {
    hoverScale: 1.02,
    tapScale: 0.98,
    particleCount: { min: 4, max: 6 },
    elasticMorph: true,
    borderUnderline: true,
    ghostNudge: false,
  },
  ghost: {
    hoverScale: 1,
    tapScale: 1,
    particleCount: { min: 0, max: 0 },
    elasticMorph: false,
    borderUnderline: false,
    ghostNudge: true,
  },
} as const;

// --- Hoisted flip animation config (fix #6) ---
const flipAnimationConfig = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
  transition: { duration: 0.15, ease: 'easeOut' as const },
} as const;

// --- Main component ---
export default function ElasticButton({
  children,
  href,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
}: ElasticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const flipKey = useId();

  const config = variantConfig[variant];

  // --- Clear timeout on unmount (fix #1) ---
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // --- Elastic morph springs ---
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 15, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 15, stiffness: 300 });

  // Scale transforms: cap the translation to subtle range
  const translateX = useTransform(springX, (v) => v * 0.08);
  const translateY = useTransform(springY, (v) => v * 0.12);

  // Ghost nudge: subtle translateX on hover
  const ghostNudgeX = useSpring(0, { damping: 20, stiffness: 300 });

  // --- Handlers ---
  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || disabled) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);

      if (config.elasticMorph) {
        cursorX.set(offsetX);
        cursorY.set(offsetY);
      }
    },
    [config.elasticMorph, cursorX, cursorY, disabled],
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setHovered(true);
    if (config.ghostNudge) {
      ghostNudgeX.set(4);
    }
  }, [disabled, config.ghostNudge, ghostNudgeX]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    cursorX.set(0);
    cursorY.set(0);
    if (config.ghostNudge) {
      ghostNudgeX.set(0);
    }
  }, [cursorX, cursorY, config.ghostNudge, ghostNudgeX]);

  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      if (disabled) return;
      onClick?.(e);

      const { min, max } = config.particleCount;
      if (max <= 0) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Keyboard activation sends clientX/clientY as 0 (fix #4)
      const isKeyboard = e.clientX === 0 && e.clientY === 0;
      const clickX = isKeyboard ? rect.width / 2 : e.clientX - rect.left;
      const clickY = isKeyboard ? rect.height / 2 : e.clientY - rect.top;
      const count = min + Math.floor(Math.random() * (max - min + 1));
      const newParticles = spawnParticles(clickX, clickY, count);
      setParticles(newParticles);

      // Remove particles after animation (fix #1: store timeout in ref)
      timeoutRef.current = setTimeout(() => setParticles([]), 450);
    },
    [disabled, onClick, config.particleCount],
  );

  // --- Build motion style for the outer wrapper ---
  const wrapperStyle = config.elasticMorph
    ? { x: translateX, y: translateY }
    : config.ghostNudge
      ? { x: ghostNudgeX }
      : {};

  // --- Shared inner content ---
  const innerContent = (
    <>
      {/* Text flip wrapper */}
      <span
        style={{
          display: 'inline-flex',
          overflow: 'hidden',
          position: 'relative',
          alignItems: 'center',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={hovered ? `${flipKey}-hovered` : `${flipKey}-idle`}
            initial={flipAnimationConfig.initial}
            animate={flipAnimationConfig.animate}
            exit={flipAnimationConfig.exit}
            transition={flipAnimationConfig.transition}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {children}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Secondary variant: animated border underline */}
      {config.borderUnderline && (
        <motion.span
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: '#1863DC',
            transformOrigin: 'left',
            scaleX: 0,
          }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      )}
    </>
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...wrapperStyle,
        position: 'relative',
        display: 'inline-block',
      }}
      whileHover={config.hoverScale !== 1 ? { scale: config.hoverScale } : undefined}
      whileTap={config.tapScale !== 1 ? { scale: config.tapScale } : undefined}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
    >
      {/* Type-safe tag rendering (fix #5) with disabled anchor support (fix #3) */}
      {href ? (
        <a
          href={disabled ? undefined : href}
          className={className}
          onClick={handleClick}
          aria-disabled={disabled ? 'true' : undefined}
          tabIndex={disabled ? -1 : undefined}
        >
          {innerContent}
        </a>
      ) : (
        <button
          type="button"
          className={className}
          disabled={disabled}
          onClick={handleClick}
        >
          {innerContent}
        </button>
      )}

      {/* Particle burst layer */}
      <AnimatePresence>
        {particles.length > 0 && <ParticleBurst particles={particles} />}
      </AnimatePresence>
    </motion.div>
  );
}
