const SegmentCard = ({ segmentId }) => {
  const content = {
    0: { title: 'Stable Customer', description: 'Lower churn likelihood with strong retention behavior.' },
    1: { title: 'Watchlist Segment', description: 'Moderate risk profile needing proactive engagement.' },
    2: { title: 'High Risk Customer Group', description: 'Likely to churn and should receive retention offers.' },
  };

  const current = content[segmentId] || content[2];

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-blue-600/20 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Segment ID</p>
      <div className="mt-3 text-5xl font-semibold text-white">{segmentId ?? '—'}</div>
      <h3 className="mt-4 text-xl font-semibold text-white">{current.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{current.description}</p>
    </div>
  );
};

export default SegmentCard;
