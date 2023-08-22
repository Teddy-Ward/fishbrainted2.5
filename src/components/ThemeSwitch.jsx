import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useState, useEffect } from 'react'

const ThemeSwitch = () => {
  const { switcher, themes, currentTheme, status } = useThemeSwitcher();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(previous => {
      switcher({ theme: previous ? themes.light : themes.dark });
      return !previous;
    });
  };

  return (
    <div className="theme-button">

    <div data-hide-on-theme="light" >
      <img
        src="/light.png"
        alt="light"
        width={25}
        height={25}
        onClick={toggleDarkMode}
      />

    </div>

    <div data-hide-on-theme="dark">
      <img
        src="/dark.png"
        alt="dark"
        width={25}
        height={25}
        onClick={toggleDarkMode}
      />
    </div>
  </div>
  );
};

export default ThemeSwitch