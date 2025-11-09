import React, { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';

const LoginForm = ({ onLoginSuccess, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'client'
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      userType: e.target.value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Данные входа:', formData);
      onLoginSuccess(formData.userType);
    }
  };

  const handleForgotPassword = () => {
    alert('Функция восстановления пароля временно недоступна');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <UserTypeSelector 
        userType={formData.userType}
        onUserTypeChange={handleUserTypeChange}
      />

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="Введите ваш email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Введите ваш пароль"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
      </div>

      <div className="form-options">
        <label className="remember-me">
          <input type="checkbox" />
          <span>Запомнить меня</span>
        </label>
        <button 
          type="button" 
          className="forgot-password"
          onClick={handleForgotPassword}
        >
          Забыли пароль?
        </button>
      </div>

      <button type="submit" className="submit-btn">
        Войти как {formData.userType === 'client' ? 'клиент' : 'психолог'}
      </button>

      <div className="form-footer">
        <p>Впервые у нас? 
          <button 
            type="button" 
            className="forgot-password"
            onClick={() => onNavigate('register')}
            style={{marginLeft: '5px'}}
          >
            Зарегистрируйтесь
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;