import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Predict' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
];

const Navbar = ({ theme, toggleTheme }) => (
  <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-semibold text-white">Telco Churn Intelligence</h1>
        <p className="text-sm text-slate-400">AI-powered segmentation & risk scoring</p>
      </div>
      <div className="flex items-center gap-2">
        <nav className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-300 hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-sm text-slate-200 transition hover:bg-white/10"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </header>
);

export default Navbar;
