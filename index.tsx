
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import CSS tổng hợp

const rootElement = document.getElementById('root');

// Chỉ mount React nếu tìm thấy thẻ root (Tránh lỗi khi chạy bản Vanilla JS)
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
