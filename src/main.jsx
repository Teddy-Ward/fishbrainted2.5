import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

const themes = {
  light: './light.css',
  dark: './dark.css',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeSwitcherProvider defaultTheme='light' themeMap={themes}>
          <App />
    </ThemeSwitcherProvider>

  </React.StrictMode>,
)
