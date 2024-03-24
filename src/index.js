import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SeatDataProvider } from './context/SeatDataProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SeatDataProvider>
      <App />

    </SeatDataProvider>
  </React.StrictMode>
);

