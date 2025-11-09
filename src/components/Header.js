import React from 'react';

const Header = ({ onNavigate }) => {
  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      console.log('Выход из аккаунта');
      onNavigate('login');
    }
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          Психологический Центр "Гармония"
        </div>
        
        <nav className="nav-menu">
          <button 
            className="nav-item"
            onClick={() => onNavigate('chat')}
          >
            💬 Чат
          </button>
          
          <button 
            className="nav-item"
            onClick={() => onNavigate('main')}
          >
            🏠 Главная
          </button>
          
          <button 
            className="nav-item"
            onClick={() => onNavigate('profile')}
          >
            👤 Профиль
          </button>
          
          <button 
            className="nav-item logout"
            onClick={handleLogout}
          >
            🚪 Выход
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;