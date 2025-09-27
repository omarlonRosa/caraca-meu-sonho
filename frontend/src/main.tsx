import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // 1. Importe o BrowserRouter
import { AuthProvider } from './contexts/AuthContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  throw new Error("Client ID do Google não encontrado. Verifique o arquivo .env.local");
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
       <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
