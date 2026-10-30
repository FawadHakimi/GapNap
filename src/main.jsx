import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import { migrateStorage } from './utils/migrate';

migrateStorage(); // must run before the app reads localStorage

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
