
'use strict';

const THEME_STORAGE_KEY = 'kt-theme';
const pageRoot = document.documentElement;
const themeButton = document.querySelector('.theme');
const yearElement = document.querySelector('#year');

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
  }
}

function updateThemeButton() {
  const isLightTheme = pageRoot.dataset.theme === 'light';

  themeButton.textContent = isLightTheme ? '☾' : '☼';
  themeButton.setAttribute(
    'aria-label',
    isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'
  );
}

function applyTheme(theme, shouldSave = false) {
  pageRoot.dataset.theme = theme;
  updateThemeButton();

  if (shouldSave) {
    saveTheme(theme);
  }
}

function toggleTheme() {
  const nextTheme = pageRoot.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme, true);
}

if (themeButton) {
  const savedTheme = getSavedTheme();
  const initialTheme = savedTheme === 'light' ? 'light' : 'dark';

  themeButton.hidden = false;
  applyTheme(initialTheme);
  themeButton.addEventListener('click', toggleTheme);
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
