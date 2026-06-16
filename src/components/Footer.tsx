import { Link } from '@tanstack/react-router'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="page-wrap site-footer-inner">
        <p className="site-footer-copy">
          &copy; {year} Trade Platform. Not financial advice — trading involves risk.
        </p>
        <div className="site-footer-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/support">Support</Link>
        </div>
      </div>
    </footer>
  )
}
