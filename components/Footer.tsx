const LINKS = [
  { label: "Portfolio", href: "https://philipalgebrink.se" },
  { label: "GitHub", href: "https://github.com/philipalgebrink" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/philip-%C3%A4lgebrink-27a9a2280/",
  },
  { label: "X", href: "https://x.com/king666xd" },
];

export default function Footer() {
  return (
    <footer className="mt-4 flex flex-col items-center gap-3 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
      <p>
        Built by <span className="text-zinc-300">Philip Älgebrink</span> to keep
        an eye on my own GitHub activity.
      </p>
      <div className="flex gap-4">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-brand"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
