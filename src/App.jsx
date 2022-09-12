import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {StockOverviewPage} from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';
import './App.css';
import { WatchListProvider } from './context/watchListContext';

export default function App() {
  return (
    <main className='container'>
      <WatchListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListProvider>
    </main>
  )
}
