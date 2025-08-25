import { PropsWithChildren } from "react";
import { Section } from "@/components/section";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <div className="pt-24">
      <Section
        title="Blog"
        subtitle="Local MDX posts with theme-aware components."
      >
        <article className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </article>
      </Section>
    </div>
  );
}
