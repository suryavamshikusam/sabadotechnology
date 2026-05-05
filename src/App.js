import { useEffect, useState } from 'react';
import './App.css';
import { InfiniteGrid } from './components/ui/InfiniteGrid';

export default function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero" style={{ pointerEvents: 'auto' }}>
      <InfiniteGrid />

      <div className={`brand-row ${visible ? 'brand-visible' : ''}`}>
        <div className="logo-wrapper">
          <img src="/logo.png" alt="ST Logo" draggable="false" />
        </div>
        <div className="company-img-wrapper">
          <img
            src="/company.png"
            alt="Sabado Technologies"
            className="company-img"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}