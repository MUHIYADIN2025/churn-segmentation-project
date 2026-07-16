import { useEffect, useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import LoadingSpinner from '../components/LoadingSpinner';
import PredictionCard from '../components/PredictionCard';
import RiskIndicator from '../components/RiskIndicator';
import SegmentCard from '../components/SegmentCard';
import { usePrediction } from '../hooks/usePrediction';
import { checkHealth } from '../services/api';

const Prediction = () => {
  const { formData, updateField, submitPrediction, result, loading, error, riskLevel } = usePrediction();
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    const ping = async () => {
      try {
        await checkHealth();
        setBackendStatus('online');
      } catch {
        setBackendStatus('offline');
      }
    };

    ping();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 shadow-glow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">AI prediction playground</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Customer churn scoring engine</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Submit a customer profile to receive real-time churn probability, segment assignment, and retention guidance.</p>
          </div>
          <div className={`rounded-full px-4 py-2 text-sm font-medium ${backendStatus === 'online' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
            Backend: {backendStatus === 'online' ? 'Connected' : 'Unavailable'}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CustomerForm formData={formData} updateField={updateField} onSubmit={submitPrediction} loading={loading} error={error} />

        <div className="space-y-6">
          {loading ? (
            <LoadingSpinner />
          ) : result ? (
            <>
              <PredictionCard result={result} riskLevel={riskLevel} />
              <RiskIndicator level={riskLevel} />
              <SegmentCard segmentId={result.segment_id} />
            </>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
              <h3 className="text-xl font-semibold text-white">Prediction Preview</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">The result card will appear here after you submit a customer profile and the backend returns a churn score.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
