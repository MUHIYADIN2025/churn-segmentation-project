const ModelSelector = ({ value, onChange }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow">
    <label className="mb-2 block text-sm font-medium text-slate-200">ML Model</label>
    <select
      value={value}
      onChange={(e) => onChange('model', e.target.value)}
      className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-100 outline-none ring-0"
    >
      <option value="logistic_regression">Logistic Regression</option>
      <option value="random_forest">Random Forest</option>
    </select>
  </div>
);

export default ModelSelector;
