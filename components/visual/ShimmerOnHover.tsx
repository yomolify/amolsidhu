export default function ShimmerOnHover({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-xl ${className}`}
      aria-hidden
    >
      <span
        className="
          block h-full w-[140%] -translate-x-full
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          opacity-0 mix-blend-screen
          transition-opacity duration-200
          group-hover:opacity-60 group-hover:animate-shimmer
          motion-reduce:opacity-0
        "
      />
    </div>
  );
}
