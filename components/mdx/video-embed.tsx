export function Video({ src, title = "Video" }: { src: string; title?: string }) {
  return (
    <div className="not-prose aspect-video w-full overflow-hidden rounded-xl glass">
      <iframe className="w-full h-full" src={src} title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
    </div>
  );
}
