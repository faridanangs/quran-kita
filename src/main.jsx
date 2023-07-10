import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './final.css'
import { Provider } from 'react-redux'
import Store from './app/Store.jsx'
const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
