import React, { useState, useEffect } from 'react';
import Header from './Header';

const MainPage = ({ onNavigate }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Моковые данные психологов (в будущем заменится на API Spring Boot)
  const mockPsychologists = [
    {
      id: 1,
      name: 'Иванова Анна Сергеевна',
      specialty: 'Клинический психолог',
      experience: '8 лет опыта',
      description: 'Специализируюсь на работе с тревожными расстройствами и паническими атаками. Использую когнитивно-поведенческую терапию.',
      features: ['Тревожность', 'Панические атаки', 'КПТ'],
      price: '3500 руб./сессия'
    },
    {
      id: 2,
      name: 'Петров Дмитрий Владимирович',
      specialty: 'Психотерапевт',
      experience: '12 лет опыта',
      description: 'Работаю с депрессивными состояниями и нарушениями сна. Интегративный подход с элементами гештальт-терапии.',
      features: ['Депрессия', 'Нарушения сна', 'Гештальт-терапия'],
      price: '4000 руб./сессия'
    },
    {
      id: 3,
      name: 'Сидорова Елена Михайловна',
      specialty: 'Нейропсихолог',
      experience: '6 лет опыта',
      description: 'Специализация: навязчивые состояния, ОКР, работа с травмой. Использую методы экспозиционной терапии.',
      features: ['ОКР', 'Травма', 'Экспозиционная терапия'],
      price: '3200 руб./сессия'
    },
    {
      id: 4,
      name: 'Козлов Алексей Игоревич',
      specialty: 'Семейный психолог',
      experience: '10 лет опыта',
      description: 'Помогаю в решении семейных конфликтов, проблем в отношениях, а также работаю с личностными кризисами.',
      features: ['Семейная терапия', 'Отношения', 'Кризисы'],
      price: '3800 руб./сессия'
    },
    {
      id: 5,
      name: 'Никитина Мария Александровна',
      specialty: 'Детский психолог',
      experience: '7 лет опыта',
      description: 'Специализируюсь на работе с детьми и подростками. Помогаю с тревожностью, адаптацией, школьными проблемами.',
      features: ['Дети', 'Подростки', 'Адаптация'],
      price: '3000 руб./сессия'
    },
    {
      id: 6,
      name: 'Фёдоров Сергей Петрович',
      specialty: 'Кризисный психолог',
      experience: '15 лет опыта',
      description: 'Работа с острыми кризисными состояниями, ПТСР, суицидальными мыслями. Экстренная психологическая помощь.',
      features: ['Кризис', 'ПТСР', 'Экстренная помощь'],
      price: '4500 руб./сессия'
    }
  ];

  useEffect(() => {
    // Имитация загрузки данных с API
    setTimeout(() => {
      setPsychologists(mockPsychologists);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPsychologists = psychologists.filter(psychologist =>
    psychologist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    psychologist.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    psychologist.features.some(feature => 
      feature.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleBookSession = (psychologistId) => {
    console.log('Запись на сессию к психологу:', psychologistId);
    alert('Функция записи на сессию будет доступна после подключения бэкенда');
  };

  const handleViewProfile = (psychologistId) => {
    console.log('Просмотр профиля психолога:', psychologistId);
    alert('Детальный просмотр профиля будет доступен после подключения бэкенда');
  };

  return (
    <div className="main-app">
      <Header onNavigate={onNavigate} />
      
      <main className="main-content">
        {/* Баннер с описанием сервиса */}
        <section className="hero-section">
          <h1>Профессиональная психологическая помощь</h1>
          <p className="hero-description">
            Если вы или ваши близкие столкнулись с депрессией, тревожным расстройством, 
            паническими атаками, нарушениями сна, навязчивыми состояниями или другими 
            психиатрическими проблемами — важно вовремя обратиться за профессиональной помощью.
          </p>
        </section>

        {/* Секция с психологами */}
        <section className="psychologists-section">
          <div className="section-header">
            <h2>Наши специалисты</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Поиск по имени или специализации..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {loading ? (
            <div className="loading-message">
              Загрузка списка психологов...
            </div>
          ) : (
            <>
              {filteredPsychologists.length === 0 ? (
                <div className="no-results">
                  Психологи по вашему запросу не найдены
                </div>
              ) : (
                <div className="psychologists-grid">
                  {filteredPsychologists.map(psychologist => (
                    <div key={psychologist.id} className="psychologist-card">
                      <div className="psychologist-header">
                        <div className="psychologist-avatar">
                          {getInitials(psychologist.name)}
                        </div>
                        <div className="psychologist-info">
                          <h3>{psychologist.name}</h3>
                          <div className="psychologist-specialty">
                            {psychologist.specialty}
                          </div>
                          <div className="psychologist-experience">
                            {psychologist.experience}
                          </div>
                        </div>
                      </div>
                      
                      <p className="psychologist-description">
                        {psychologist.description}
                      </p>
                      
                      <div className="psychologist-features">
                        {psychologist.features.map((feature, index) => (
                          <span key={index} className="feature-tag">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="psychologist-price">
                        <strong>{psychologist.price}</strong>
                      </div>
                      
                      <div className="psychologist-actions">
                        <button 
                          className="action-btn"
                          onClick={() => handleViewProfile(psychologist.id)}
                        >
                          Подробнее
                        </button>
                        <button 
                          className="action-btn primary"
                          onClick={() => handleBookSession(psychologist.id)}
                        >
                          Записаться
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default MainPage;