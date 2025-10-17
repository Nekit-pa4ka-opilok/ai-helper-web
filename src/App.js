import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import './styles/App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    // В реальном приложении здесь был бы API запрос
    console.log('Вход выполнен:', userData);
    setCurrentUser(userData);
  };

  const handleRegister = (userData) => {
    // В реальном приложении здесь был бы API запрос
    console.log('Регистрация:', userData);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {currentUser ? (
        <div className="welcome-container">
          <h1>Добро пожаловать, {currentUser.email}!</h1>
          <button onClick={handleLogout} className="logout-btn">
            Выйти
          </button>
        </div>
      ) : (
        <AuthPage onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
}

export default App;