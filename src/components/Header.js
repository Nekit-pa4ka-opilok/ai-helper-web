import React from 'react';
import logo from '../assets/Ellipse29.svg';

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
        <div className="logo-section">
          <img src={logo} alt="Логотип Гармония" className="logo-image" />
          <span className="logo-text">Гармония</span>
        </div>
        
        <nav className="nav-menu">
          <button 
            className="nav-item"
            onClick={() => onNavigate('chat')}
          >
            Чат
          </button>
          
          <button 
            className="nav-item"
            onClick={() => onNavigate('main')}
          >
            Главная
          </button>
          
          <button 
            className="nav-item"
            onClick={() => onNavigate('profile')}
          >
            Профиль
          </button>
          
          <button 
            className="nav-item logout"
            onClick={handleLogout}
          >
            Выход
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;