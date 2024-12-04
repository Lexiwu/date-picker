import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Datepicker from './Datepicker';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Datepicker />
  </StrictMode>,
);
