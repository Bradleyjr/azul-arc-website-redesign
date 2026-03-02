interface SectionDividerProps {
  fromColor: string;
  toColor: string;
  id: string;
  flip?: boolean;
  height?: number;
  dramatic?: boolean;
}

export default function SectionDivider({
  fromColor,
  toColor,
  id,
  flip = false,
  height = 120,
  dramatic = false,
}: SectionDividerProps) {
  const animId = `divider-gradient-${id}`;
  const path = dramatic
    ? 'M0,0 C360,120 720,20 1080,100 S1440,40 1440,0 L1440,120 L0,120 Z'
    : 'M0,0 C480,100 960,10 1440,0 L1440,120 L0,120 Z';

  return (
    <div
      className="relative w-full pointer-events-none select-none"
      style={{
        marginTop: `-${height / 2}px`,
        marginBottom: `-${height / 2}px`,
        height: `${height}px`,
        transform: flip ? 'scaleY(-1)' : undefined,
        zIndex: 5,
      }}
    >
      <style>{`
        @keyframes ${animId} {
          0%, 100% { stop-color: ${fromColor}; }
          50% { stop-color: ${toColor}; }
        }
        @keyframes ${animId}-end {
          0%, 100% { stop-color: ${toColor}; }
          50% { stop-color: ${fromColor}; }
        }
      `}</style>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={animId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{
                stopColor: fromColor,
                animation: `${animId} 8s ease-in-out infinite`,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: toColor,
                animation: `${animId}-end 8s ease-in-out infinite`,
              }}
            />
          </linearGradient>
        </defs>
        <path d={path} fill={`url(#${animId})`} />
      </svg>
    </div>
  );
}
