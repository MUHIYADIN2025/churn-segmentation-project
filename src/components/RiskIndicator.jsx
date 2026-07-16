const RiskIndicator = ({ level }) => {
  const colors = {
    'Low Risk': 'from-emerald-500 to-green-500',
    'Medium Risk': 'from-amber-500 to-orange-500',
    'High Risk': 'from-rose-500 to-red-500',
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-glow">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Risk Level</p>
      <div className={`mt-3 h-3 rounded-full bg-gradient-to-r ${colors[level] || colors['Low Risk']}`} />
      <p className="mt-3 text-xl font-semibold text-white">{level}</p>
    </div>
  );
};

export default RiskIndicator;
