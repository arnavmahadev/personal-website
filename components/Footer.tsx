export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-sm text-zinc-600">
          arnav<span className="text-blue-500/70">.</span>dev
        </span>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Arnav Mahadev
        </p>
      </div>
    </footer>
  )
}
