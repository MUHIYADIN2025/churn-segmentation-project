const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 text-slate-200 shadow-glow">
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
    <span>Running prediction model…</span>
  </div>
);

export default LoadingSpinner;
