import { Link } from '@tanstack/react-router'

export default function FinalCta() {
  return (
    <section className="marketing-section marketing-section-yellow marketing-cta-band">
      <div className="page-wrap px-4 sm:px-6 lg:px-8">
        <h2>Ready to automate your alerts?</h2>
        <p>Create an account, connect your broker, and install the desktop app to start.</p>
        <Link to="/signup" className="btn-black">
          Get started free
        </Link>
      </div>
    </section>
  )
}
