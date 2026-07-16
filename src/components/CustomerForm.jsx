import ModelSelector from './ModelSelector';

const selectClasses = 'w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-100 outline-none';
const inputClasses = 'w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-100 outline-none';

const fieldSections = [
  {
    title: 'Customer Profile',
    fields: [
      { label: 'Gender', key: 'gender', type: 'select', options: ['Male', 'Female'] },
      { label: 'Senior Citizen', key: 'SeniorCitizen', type: 'checkbox' },
      { label: 'Partner', key: 'Partner', type: 'select', options: ['Yes', 'No'] },
      { label: 'Dependents', key: 'Dependents', type: 'select', options: ['Yes', 'No'] },
    ],
  },
  {
    title: 'Plan & Usage',
    fields: [
      { label: 'Tenure (months)', key: 'tenure', type: 'number' },
      { label: 'Phone Service', key: 'PhoneService', type: 'select', options: ['Yes', 'No'] },
      { label: 'Multiple Lines', key: 'MultipleLines', type: 'select', options: ['Yes', 'No', 'No phone service'] },
      { label: 'Internet Service', key: 'InternetService', type: 'select', options: ['DSL', 'Fiber optic', 'No'] },
    ],
  },
  {
    title: 'Services',
    fields: [
      { label: 'Online Security', key: 'OnlineSecurity', type: 'select', options: ['Yes', 'No', 'No internet service'] },
      { label: 'Online Backup', key: 'OnlineBackup', type: 'select', options: ['Yes', 'No', 'No internet service'] },
      { label: 'Device Protection', key: 'DeviceProtection', type: 'select', options: ['Yes', 'No', 'No internet service'] },
      { label: 'Tech Support', key: 'TechSupport', type: 'select', options: ['Yes', 'No', 'No internet service'] },
      { label: 'Streaming TV', key: 'StreamingTV', type: 'select', options: ['Yes', 'No', 'No internet service'] },
      { label: 'Streaming Movies', key: 'StreamingMovies', type: 'select', options: ['Yes', 'No', 'No internet service'] },
    ],
  },
  {
    title: 'Billing',
    fields: [
      { label: 'Contract', key: 'Contract', type: 'select', options: ['Month-to-month', 'One year', 'Two year'] },
      { label: 'Paperless Billing', key: 'PaperlessBilling', type: 'select', options: ['Yes', 'No'] },
      { label: 'Payment Method', key: 'PaymentMethod', type: 'select', options: ['Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)'] },
      { label: 'Monthly Charges', key: 'MonthlyCharges', type: 'number' },
      { label: 'Total Charges', key: 'TotalCharges', type: 'number' },
    ],
  },
];

const CustomerForm = ({ formData, updateField, onSubmit, loading, error }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    className="space-y-6"
  >
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-glow sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Customer Prediction Form</h2>
        <p className="mt-1 text-sm text-slate-400">Enter client profile data and score churn risk instantly.</p>
      </div>

      <div className="mb-6">
        <ModelSelector value={formData.model} onChange={updateField} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fieldSections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{section.title}</h3>
            <div className="space-y-3">
              {section.fields.map((field) => (
                <label key={field.key} className="block text-sm text-slate-200">
                  <span className="mb-1.5 block text-slate-300">{field.label}</span>
                  {field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={Boolean(formData[field.key])}
                      onChange={(e) => updateField(field.key, e.target.checked ? 1 : 0)}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-900"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className={selectClasses}
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      step={field.key === 'MonthlyCharges' || field.key === 'TotalCharges' ? '0.01' : '1'}
                      value={formData[field.key]}
                      onChange={(e) => updateField(field.key, field.key === 'tenure' ? Number(e.target.value) : Number(e.target.value))}
                      className={inputClasses}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-300">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Scoring customer…' : 'Generate Prediction'}
      </button>
    </div>
  </form>
);

export default CustomerForm;
