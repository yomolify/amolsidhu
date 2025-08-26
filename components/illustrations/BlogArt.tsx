export default function BlogArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={className}
      role="img"
      aria-label="Blog"
    >
      <rect
        width="800"
        height="420"
        rx="16"
        fill="currentColor"
        opacity="0.05"
      />
      {/* stacked papers */}
      <rect
        x="220"
        y="120"
        width="360"
        height="220"
        rx="16"
        fill="currentColor"
        opacity="0.10"
        transform="rotate(-3 220 120)"
      />
      <rect
        x="230"
        y="135"
        width="360"
        height="220"
        rx="16"
        fill="currentColor"
        opacity="0.14"
        transform="rotate(2 230 135)"
      />
      {/* Aa */}
      <text
        x="410"
        y="255"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontWeight="700"
        fontSize="96"
        fill="currentColor"
        opacity="0.55"
      >
        Aa
      </text>
      {/* lines */}
      <rect
        x="260"
        y="290"
        width="280"
        height="10"
        rx="5"
        fill="currentColor"
        opacity="0.18"
      />
      <rect
        x="300"
        y="310"
        width="200"
        height="8"
        rx="4"
        fill="currentColor"
        opacity="0.14"
      />
    </svg>
  );
}
