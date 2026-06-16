type HeroHighlightProps = {
  children: string
  variant: 'yellow' | 'pink'
}

export default function HeroHighlight({ children, variant }: HeroHighlightProps) {
  return (
    <span className={`hero-highlight hero-highlight-${variant}`}>
      <span className="hero-highlight-text">{children}</span>
      <span className="hero-highlight-mark" aria-hidden="true" />
    </span>
  )
}
