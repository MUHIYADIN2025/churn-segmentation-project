import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

const sampleData = [
  { name: 'Low', value: 42 },
  { name: 'Medium', value: 28 },
  { name: 'High', value: 30 },
];

const segmentData = [
  { name: 'Segment 0', value: 18 },
  { name: 'Segment 1', value: 24 },
  { name: 'Segment 2', value: 16 },
];

const historyData = [
  { day: 'Mon', score: 0.41 },
  { day: 'Tue', score: 0.56 },
  { day: 'Wed', score: 0.47 },
  { day: 'Thu', score: 0.69 },
  { day: 'Fri', score: 0.74 },
  { day: 'Sat', score: 0.62 },
];

const Dashboard = () => {
  const cards = [
    { label: 'Total Predictions', value: '128', accent: 'from-cyan-500 to-blue-500' },
    { label: 'Churn Customers', value: '41', accent: 'from-rose-500 to-red-500' },
    { label: 'Retained Customers', value: '87', accent: 'from-emerald-500 to-green-500' },
    { label: 'Average Risk Score', value: '63.2%', accent: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Operations dashboard</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Churn analytics overview</h2>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-glow">
            <div className={`h-2 rounded-full bg-gradient-to-r ${card.accent}`} />
            <p className="mt-4 text-sm text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
          <h3 className="text-lg font-semibold text-white">Churn Risk Distribution</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sampleData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={2}>
                  <Cell fill="#22d3ee" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
          <h3 className="text-lg font-semibold text-white">Customer Segment Distribution</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="value" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-glow">
        <h3 className="text-lg font-semibold text-white">Prediction History Trend</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
