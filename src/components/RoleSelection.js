import React from 'react';

const RoleSelection = ({ onRoleSelect }) => {
  return (
    <div className="role-selection">
      <div className="role-header">
        <h2>Выберите вашу роль</h2>
        <p>Пожалуйста, выберите как вы хотите использовать платформу</p>
      </div>

      <div className="role-cards">
        <div className="role-card" onClick={() => onRoleSelect('client')}>
          <div className="role-icon">👤</div>
          <h3>Клиент</h3>
          <p>Ищу психологическую помощь и поддержку</p>
          <ul>
            <li>Консультации с психологами</li>
            <li>Запись на сессии</li>
            <li>Личный дневник</li>
          </ul>
          <button className="role-select-btn">Выбрать</button>
        </div>

        <div className="role-card psychologist" onClick={() => onRoleSelect('psychologist')}>
          <div className="role-icon">🧠</div>
          <h3>Психолог</h3>
          <p>Оказываю психологическую помощь</p>
          <ul>
            <li>Работа с клиентами</li>
            <li>Ведение расписания</li>
            <li>Профессиональное сообщество</li>
            <li className="important">Требуется лицензия</li>
          </ul>
          <button className="role-select-btn">Выбрать</button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;