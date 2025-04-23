import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { AuthProvider } from './context/AuthContext';     
import { OfferProvider } from './context/OfferContext';     

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OfferProvider>        
          <App />
        </OfferProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
