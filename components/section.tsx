import { PropsWithChildren } from "react";
type Props = PropsWithChildren<{
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}>;
export function Section({
  id,
  className = "",
  title,
  subtitle,
  children,
}: Props) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 ${className}`}>
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-display">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
