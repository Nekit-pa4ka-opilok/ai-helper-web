import React, { useState } from 'react';

const PsychologistAuth = ({ onBack, onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    experience: '',
    education: '',
    licenseNumber: '',
    licenseFile: null,
    description: '',
    phone: '',
    hourlyRate: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'Имя обязательно';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Фамилия обязательна';
      }
      if (!formData.specialization.trim()) {
        newErrors.specialization = 'Специализация обязательна';
      }
      if (!formData.experience) {
        newErrors.experience = 'Опыт работы обязателен';
      }
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = 'Номер лицензии обязателен';
      }
      if (!formData.licenseFile) {
        newErrors.licenseFile = 'Файл лицензии обязателен';
      }
    }

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userData = {
        ...formData,
        role: 'psychologist',
        registrationDate: new Date().toISOString(),
        status: 'pending' // статус проверки документов
      };
      
      if (isLogin) {
        onLogin(userData);
      } else {
        onRegister(userData);
      }
    }
  };

  return (
    <div className="psychologist-auth">
      <div className="auth-header">
        <button onClick={onBack} className="back-btn">← Назад</button>
        <h2>{isLogin ? 'Вход для психолога' : 'Регистрация психолога'}</h2>
        <p className="license-notice">
          {!isLogin && '⚠️ Для регистрации требуется подтверждение лицензии'}
        </p>
        <p>
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button 
            className="switch-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Имя *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Введите ваше имя"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Фамилия *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Введите вашу фамилию"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Специализация *</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={errors.specialization ? 'error' : ''}
                placeholder="Например: когнитивно-поведенческая терапия"
              />
              {errors.specialization && <span className="error-message">{errors.specialization}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience">Опыт работы (лет) *</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? 'error' : ''}
                  placeholder="0"
                  min="0"
                  max="50"
                />
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="hourlyRate">Ставка (руб/час)</label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="2000"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="education">Образование *</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Укажите ваше образование и квалификацию"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">О себе</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Расскажите о вашем подходе и опыте"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>

            <div className="license-section">
              <h4>Лицензия и документы</h4>
              
              <div className="form-group">
                <label htmlFor="licenseNumber">Номер лицензии *</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className={errors.licenseNumber ? 'error' : ''}
                  placeholder="Введите номер лицензии"
                />
                {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="licenseFile">Загрузите лицензию *</label>
                <input
                  type="file"
                  id="licenseFile"
                  name="licenseFile"
                  onChange={handleChange}
                  className={errors.licenseFile ? 'error' : ''}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <small>Поддерживаемые форматы: PDF, JPG, PNG (макс. 5MB)</small>
                {errors.licenseFile && <span className="error-message">{errors.licenseFile}</span>}
              </div>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Введите ваш email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="Введите пароль"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Повторите пароль"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
        )}

        {!isLogin && (
          <div className="terms-section">
            <label className="checkbox-label">
              <input type="checkbox" required />
              Я подтверждаю, что имею действующую лицензию на оказание психологических услуг и согласен с условиями платформы
            </label>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Войти' : 'Отправить на проверку'}
        </button>

        {!isLogin && (
          <p className="verification-notice">
            После регистрации ваш аккаунт будет проверен администрацией. Это может занять до 24 часов.
          </p>
        )}
      </form>
    </div>
  );
};

export default PsychologistAuth;