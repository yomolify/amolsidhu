'use client';
import { MDXProvider } from "@mdx-js/react";
import { Callout } from "@/components/mdx/callout";
import { Tabs, Tab } from "@/components/mdx/tabs";
import { Video } from "@/components/mdx/video-embed";
import Link from "next/link";

const components = { Callout, Tabs, Tab, Video, a: (props: any) => <Link {...props} className="underline decoration-2 underline-offset-4" /> };
export default function MdxProvider({ children }: { children: React.ReactNode }) { return <MDXProvider components={components}>{children}</MDXProvider>; }
