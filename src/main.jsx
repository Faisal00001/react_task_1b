import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'
import router from './Router/Router';
import AuthProvider from './Provider/AuthContext';
import GlobalProvider from './Provider/GlobalContext';
import "./App.css"
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <GlobalProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </GlobalProvider>
  </AuthProvider>

)
