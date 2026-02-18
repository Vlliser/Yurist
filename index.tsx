
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Инициализация React приложения
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Ошибка при инициализации React:", error);
  }
} else {
  console.error("Критическая ошибка: Элемент #root не найден в DOM.");
}
