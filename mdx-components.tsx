import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

// Import client components; it's OK to reference them here.
// Next.js will place a client boundary around them automatically.
import { Callout } from '@/components/mdx/callout';
import { Tabs, Tab } from '@/components/mdx/tabs';
import { Video } from '@/components/mdx/video-embed';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map markdown elements
    a: (props: any) => <Link {...props} className="underline decoration-2 underline-offset-4" />,
    // Expose custom components
    Callout,
    Tabs,
    Tab,
    Video,
    // Allow local overrides
    ...components,
  };
}
