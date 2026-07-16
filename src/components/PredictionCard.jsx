const PredictionCard = ({ result, riskLevel }) => {
  const isChurn = result?.churn_prediction === 'Yes';
  const probability = result?.churn_probability ? result.churn_probability * 100 : 0;

  return (
    <div className={`rounded-3xl border p-6 shadow-glow ${isChurn ? 'border-rose-400/30 bg-rose-500/10' : 'border-emerald-400/30 bg-emerald-500/10'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Churn Prediction</p>
          <h3 className={`mt-2 text-3xl font-semibold ${isChurn ? 'text-rose-300' : 'text-emerald-300'}`}>
            {result?.churn_prediction || 'Pending'}
          </h3>
        </div>
        <div className={`rounded-2xl px-3 py-2 text-sm font-semibold ${isChurn ? 'bg-rose-500/20 text-rose-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
          {riskLevel}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="text-sm text-slate-400">Probability</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-4xl font-semibold text-white">{probability.toFixed(2)}%</span>
          <span className="pb-1 text-sm text-slate-400">confidence</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
