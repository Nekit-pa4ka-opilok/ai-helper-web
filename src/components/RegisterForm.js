import React, { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';

const RegisterForm = ({ onRegisterSuccess, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    userType: 'client'
  });
  
  const [licenseFile, setLicenseFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (e) => {
    const newUserType = e.target.value;
    setFormData(prev => ({
      ...prev,
      userType: newUserType
    }));
    
    // Сбрасываем файл лицензии при смене типа пользователя
    if (newUserType === 'client') {
      setLicenseFile(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setLicenseFile(file);
        setErrors(prev => ({ ...prev, license: '' }));
      } else {
        setErrors(prev => ({ ...prev, license: 'Пожалуйста, загрузите файл в формате PDF' }));
      }
    }
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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'ФИО обязательно';
    }

    if (!formData.phone) {
      newErrors.phone = 'Телефон обязателен';
    }

    if (formData.userType === 'psychologist' && !licenseFile) {
      newErrors.license = 'Лицензия обязательна для психологов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Данные регистрации:', {
        ...formData,
        licenseFile: licenseFile ? licenseFile.name : null
      });
      onRegisterSuccess(formData.userType);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <UserTypeSelector 
        userType={formData.userType}
        onUserTypeChange={handleUserTypeChange}
      />

      <div className="form-row">
        <div className="form-group">
          <label>ФИО *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={errors.fullName ? 'error' : ''}
            placeholder="Введите ваше полное имя"
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="example@mail.ru"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Телефон *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'error' : ''}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Пароль *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Минимум 6 символов"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Подтверждение пароля *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Повторите пароль"
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>
      </div>

      {formData.userType === 'psychologist' && (
        <div className="form-row">
          <div className="form-group">
            <label>Лицензия психолога (PDF) *</label>
            <div className="file-upload">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className="file-upload-label">
                {licenseFile ? `Выбран файл: ${licenseFile.name}` : 'Выберите файл лицензии'}
              </div>
            </div>
            {errors.license && <span className="error-text">{errors.license}</span>}
            <small className="file-hint">
              Для регистрации в качестве психолога необходимо загрузить скан лицензии в формате PDF
            </small>
          </div>
        </div>
      )}

      <button type="submit" className="submit-btn">
        Зарегистрироваться как {formData.userType === 'client' ? 'клиент' : 'психолог'}
      </button>

      <div className="form-footer">
        <p>Уже есть аккаунт? 
          <button 
            type="button" 
            className="forgot-password"
            onClick={() => onNavigate('login')}
            style={{marginLeft: '5px'}}
          >
            Войдите
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;