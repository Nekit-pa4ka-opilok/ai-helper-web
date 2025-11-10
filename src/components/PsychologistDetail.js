import React, { useState } from 'react';
import Header from './Header';

const PsychologistDetail = ({ onNavigate, psychologistId }) => {
  // Моковые данные психологов
  const psychologistsData = {
    1: {
      id: 1,
      name: 'Иванова Анна Сергеевна',
      specialty: 'Клинический психолог',
      experience: '8 лет опыта',
      education: 'МГУ, факультет психологии, кандидат психологических наук',
      description: 'Специализируюсь на работе с тревожными расстройствами и паническими атаками. Использую когнитивно-поведенческую терапию и методы релаксации. Помогаю клиентам справляться с фобиями, социальной тревожностью и обсессивно-компульсивным расстройством.',
      methods: ['Когнитивно-поведенческая терапия', 'Экспозиционная терапия', 'Методы релаксации', 'Работа с дыханием'],
      price: '3500 руб./сессия',
      sessionDuration: '50 минут',
      languages: ['Русский', 'Английский'],
      rating: 4.8,
      reviews: 127,
      photo: null,
      workingHours: [
        { day: 'Пн', hours: '09:00 - 18:00' },
        { day: 'Вт', hours: '09:00 - 18:00' },
        { day: 'Ср', hours: '10:00 - 19:00' },
        { day: 'Чт', hours: '09:00 - 18:00' },
        { day: 'Пт', hours: '09:00 - 17:00' },
        { day: 'Сб', hours: '10:00 - 15:00' },
        { day: 'Вс', hours: 'Не работает' }
      ]
    },
    2: {
      id: 2,
      name: 'Петров Дмитрий Владимирович',
      specialty: 'Психотерапевт',
      experience: '12 лет опыта',
      education: 'СПбГУ, медицинская психология, доктор психологических наук',
      description: 'Работаю с депрессивными состояниями и нарушениями сна. Интегративный подход с элементами гештальт-терапии. Специализируюсь на работе с кризисными состояниями, потерей смысла жизни и экзистенциальными проблемами.',
      methods: ['Гештальт-терапия', 'Экзистенциальная терапия', 'Арт-терапия', 'Телесно-ориентированная терапия'],
      price: '4000 руб./сессия',
      sessionDuration: '60 минут',
      languages: ['Русский'],
      rating: 4.9,
      reviews: 89,
      photo: null,
      workingHours: [
        { day: 'Пн', hours: '10:00 - 19:00' },
        { day: 'Вт', hours: '10:00 - 19:00' },
        { day: 'Ср', hours: '10:00 - 19:00' },
        { day: 'Чт', hours: '10:00 - 19:00' },
        { day: 'Пт', hours: '10:00 - 18:00' },
        { day: 'Сб', hours: '11:00 - 16:00' },
        { day: 'Вс', hours: 'Не работает' }
      ]
    }
  };

  const psychologist = psychologistsData[psychologistId] || psychologistsData[1];
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      alert('Пожалуйста, выберите дату и время для записи');
      return;
    }
    
    console.log('Запись на сессию:', {
      psychologist: psychologist.name,
      date: selectedDate,
      time: selectedTime
    });
    
    alert(`Вы успешно записались на сессию к ${psychologist.name} на ${selectedDate} в ${selectedTime}`);
    onNavigate('main');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <div className="main-app">
      <Header onNavigate={onNavigate} />
      
      <main className="detail-content">
        <div className="detail-container">
          {/* Левая колонка - Информация о психологе */}
          <div className="detail-left">
            <div className="psychologist-card">
              <div className="psychologist-header">
                <div className="psychologist-avatar large">
                  {getInitials(psychologist.name)}
                </div>
                <div className="psychologist-main-info">
                  <h1>{psychologist.name}</h1>
                  <div className="specialty">{psychologist.specialty}</div>
                  <div className="experience">{psychologist.experience}</div>
                  
                  <div className="rating-section">
                    <div className="rating">
                      {renderStars(psychologist.rating)}
                      <span className="rating-value">{psychologist.rating}</span>
                    </div>
                    <div className="reviews">{psychologist.reviews} отзывов</div>
                  </div>
                </div>
              </div>

              <div className="psychologist-details">
                <div className="detail-section">
                  <h3>О специалисте</h3>
                  <p>{psychologist.description}</p>
                </div>

                <div className="detail-section">
                  <h3>Образование</h3>
                  <p>{psychologist.education}</p>
                </div>

                <div className="detail-section">
                  <h3>Методы работы</h3>
                  <div className="methods-list">
                    {psychologist.methods.map((method, index) => (
                      <span key={index} className="method-tag">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Языки</h3>
                  <div className="languages-list">
                    {psychologist.languages.map((language, index) => (
                      <span key={index} className="language-tag">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>График работы</h3>
                  <div className="working-hours">
                    {psychologist.workingHours.map((day, index) => (
                      <div key={index} className="working-day">
                        <span className="day">{day.day}:</span>
                        <span className="hours">{day.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - Запись на сессию */}
          <div className="detail-right">
            <div className="booking-card">
              <h3>Запись на сессию</h3>
              
              <div className="price-section">
                <div className="price">{psychologist.price}</div>
                <div className="duration">{psychologist.sessionDuration}</div>
              </div>

              <div className="booking-form">
                <div className="form-group">
                  <label>Выберите дату:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="date-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label>Выберите время:</label>
                  <div className="time-slots">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="book-btn primary"
                  onClick={handleBookSession}
                  disabled={!selectedDate || !selectedTime}
                >
                  Записаться на сессию
                </button>
              </div>

              <div className="booking-info">
                <h4>Что включено в сессию:</h4>
                <ul>
                  <li>Диагностическая беседа</li>
                  <li>Индивидуальный подход</li>
                  <li>Конфиденциальность</li>
                  <li>Рекомендации для самостоятельной работы</li>
                </ul>
              </div>
            </div>

            <div className="actions-card">
              <button 
                className="action-btn secondary"
                onClick={() => onNavigate('main')}
              >
                ← Назад к списку
              </button>
              
              <button 
                className="action-btn chat-btn"
                onClick={() => onNavigate('chat')}
              >
                Написать сообщение
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PsychologistDetail;