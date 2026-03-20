import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// Placeholder Pages
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import Sports from './pages/Sports';
import NewsImpact from './pages/NewsImpact';
import GlobeViewPage from './pages/GlobeViewPage';
import Arbitrage from './pages/Arbitrage';
import StocksCommodities from './pages/StocksCommodities';
import GodsEye from './pages/GodsEye';
import TradingAuth from './pages/TradingAuth';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/gods-eye" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gods-eye" element={<GodsEye />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/sports" element={<Sports />} />
          <Route path="/news" element={<NewsImpact />} />
          <Route path="/globe" element={<GlobeViewPage />} />
          <Route path="/arbitrage" element={<Arbitrage />} />
          <Route path="/stocks" element={<StocksCommodities />} />
          <Route path="/trade" element={<TradingAuth />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
