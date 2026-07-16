const About = () => (
  <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-glow">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">About the platform</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">Telecom Customer Intelligence Suite</h2>
      <p className="mt-4 text-base leading-7 text-slate-400">
        This experience combines a modern React interface with a FastAPI predictive engine to help telecom teams score customer churn risk, understand segmentation patterns, and act on retention opportunities.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold text-white">What it does</h3>
          <p className="mt-2 text-sm text-slate-400">Predicts churn probability, identifies segment clusters, and provides a polished dashboard for business teams.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold text-white">How it works</h3>
          <p className="mt-2 text-sm text-slate-400">The frontend sends structured customer data to the backend API and renders the response in a professional, responsive UI.</p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
