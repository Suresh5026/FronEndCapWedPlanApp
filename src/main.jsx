import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/CSS/style.css'
import AuthContextProvider from './assets/Context/Auth';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AuthContextProvider>
       <App />
    </AuthContextProvider>
  </Router>,
)
