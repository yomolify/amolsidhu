'use client';
import { useState } from "react";
export function Tabs({ children }: { children: React.ReactNode }) {
  const items = Array.isArray(children) ? children : [children]; const [i, setI] = useState(0);
  return (
    <div className="not-prose glass rounded-2xl p-3">
      <div className="flex gap-2 flex-wrap">
        {items.map((child: any, idx: number) => (
          <button key={idx} onClick={() => setI(idx)} className={`px-3 py-1 rounded-xl text-sm ${i === idx ? "btn-shimmer text-white" : "glass"}`}>
            {child.props?.title ?? `Tab ${idx+1}`}
          </button>
        ))}
      </div>
      <div className="mt-3">{items[i]}</div>
    </div>
  );
}
export function Tab({ children }: { title?: string; children: React.ReactNode }) { return <div className="p-2">{children}</div>; }
