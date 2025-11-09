import React from 'react';

const UserTypeSelector = ({ userType, onUserTypeChange, disabled = false }) => {
  const options = [
    {
      value: 'client',
      label: 'Клиент',
      description: 'Ищу психологическую помощь',
      icon: '👤'
    },
    {
      value: 'psychologist',
      label: 'Психолог',
      description: 'Оказываю психологическую помощь',
      icon: '🧠'
    }
  ];

  return (
    <div className="user-type-selector">
      <label className="selector-label">Я регистрируюсь как:</label>
      <div className="user-type-options">
        {options.map(option => (
          <div
            key={option.value}
            className={`user-type-card ${userType === option.value ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onUserTypeChange({ target: { value: option.value } })}
          >
            <div className="card-header">
              <div className="option-icon">{option.icon}</div>
              <div className="option-text">
                <div className="option-label">{option.label}</div>
                <div className="option-description">{option.description}</div>
              </div>
              <div className="radio-indicator">
                <div className="radio-circle">
                  {userType === option.value && <div className="radio-dot" />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;