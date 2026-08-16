type DecorProps = { className?: string; delay?: number };

function wrap(className = "", delay = 0) {
  return {
    className: `pointer-events-none absolute select-none float-slow ${className}`,
    style: { animationDelay: `${delay}s` },
  };
}

export function TealCircle({ className, delay }: DecorProps) {
  return (
    <div {...wrap(className, delay)} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="46" className="fill-teal" />
      </svg>
    </div>
  );
}

export function OrangeHalf({ className, delay }: DecorProps) {
  return (
    <div {...wrap(className, delay)} aria-hidden>
      <svg viewBox="0 0 100 60" className="h-full w-full">
        <path d="M0 60 A50 50 0 0 1 100 60 Z" className="fill-tangerine" />
      </svg>
    </div>
  );
}

export function Clover({ className, delay }: DecorProps) {
  return (
    <div {...wrap(className, delay)} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <g className="fill-forest">
          <circle cx="50" cy="28" r="21" />
          <circle cx="72" cy="50" r="21" />
          <circle cx="50" cy="72" r="21" />
          <circle cx="28" cy="50" r="21" />
        </g>
        <circle cx="50" cy="50" r="9" className="fill-sunny" />
      </svg>
    </div>
  );
}

export function Sunburst({ className, delay }: DecorProps) {
  return (
    <div {...wrap(className, delay)} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="47"
            y="2"
            width="6"
            height="26"
            rx="3"
            className="fill-tangerine"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="16" className="fill-sunny" />
      </svg>
    </div>
  );
}

export function Squiggle({ className, delay }: DecorProps) {
  return (
    <div {...wrap(className, delay)} aria-hidden>
      <svg viewBox="0 0 120 40" className="h-full w-full">
        <path
          d="M2 30 Q 20 2 38 30 T 74 30 T 110 30"
          fill="none"
          className="stroke-grape"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
