const STEPS = [
  {
    step: '1',
    title: 'Install Notification Watcher',
    description: 'Download the desktop app for macOS or Windows and grant notification permissions.',
  },
  {
    step: '2',
    title: 'Sign in with your account',
    description: 'Use the same email and password as the web platform. The app connects automatically.',
  },
  {
    step: '3',
    title: 'Alerts execute as trades',
    description: 'When a Discord alert arrives, AI parses it and your broker places the order if validation passes.',
  },
] as const

export default function HowItWorks() {
  return (
    <section className="marketing-section page-wrap px-4">
      <h2 className="marketing-section-title">How it works</h2>
      <p className="marketing-section-subtitle">Three steps from alert to filled order.</p>
      <div className="step-list">
        {STEPS.map((item) => (
          <article key={item.step} className="step-item">
            <span className="step-number">{item.step}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
