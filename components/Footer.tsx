export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-8">
      <div className="max-w-[96rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-sm text-muted-foreground">
          arnavmaha<span className="text-primary">.</span>dev
        </span>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Arnav Mahadev
          {process.env.NEXT_PUBLIC_LAST_UPDATED && (
            <> &middot; updated {process.env.NEXT_PUBLIC_LAST_UPDATED}</>
          )}
        </p>
      </div>
    </footer>
  )
}
