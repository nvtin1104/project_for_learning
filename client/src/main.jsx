import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './router/root'
import { HelmetProvider } from 'react-helmet-async'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <RootRouter />  
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
