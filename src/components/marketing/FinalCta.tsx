import { Link } from '@tanstack/react-router'

export default function FinalCta() {
  return (
    <section className="marketing-cta-band">
      <div className="page-wrap px-4">
        <h2>Ready to automate your alerts?</h2>
        <p>Create an account, connect your broker, and install the desktop app to start.</p>
        <Link to="/signup" className="btn-primary">
          Get started free
        </Link>
      </div>
    </section>
  )
}
