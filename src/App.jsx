import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import About from './pages/About';

const App = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('telecom-theme');
    return storedTheme || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('telecom-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      {/* Navigation and theme toggle are shared across all views. */}
      <Navbar theme={theme} toggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <Routes>
        <Route path="/" element={<Prediction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
