import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

const themes = {
  light: 'light',
  dark: 'dark',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeSwitcherProvider defaultTheme='dark' themeMap={themes}>
          <App />
    </ThemeSwitcherProvider>

  </React.StrictMode>,
)
