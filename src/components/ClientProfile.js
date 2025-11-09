import React, { useState } from 'react';
import Header from './Header';

const ClientProfile = ({ onNavigate }) => {
  const [clientData, setClientData] = useState({
    lastName: 'Иванов',
    firstName: 'Иван',
    middleName: 'Иванович'
  });

  const [psychologist, setPsychologist] = useState({
    lastName: 'Петрова',
    firstName: 'Мария',
    middleName: 'Сергеевna',
    specialty: 'Клинический психолог',
    experience: '8 лет опыта'
  });

  const timeLeft = '24:00:00';
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(clientData);

  const reportHistory = [
    '2025.01.03',
    '2025.01.02',
    '2025.01.01'
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      setClientData(editForm);
    } else {
      setEditForm(clientData);
    }
    setIsEditing(!isEditing);
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Загружено изображение:', file.name);
      alert('Изображение успешно загружено!');
    }
  };

  const handleRefusePsychologist = () => {
    if (window.confirm('Вы уверены, что хотите отказаться от психолога?')) {
      setPsychologist(null);
      alert('Вы отказались от психолога');
    }
  };

  const handleStartChat = () => {
    onNavigate('chat');
  };

  return (
    <div className="main-app">
      <Header onNavigate={onNavigate} />
      
      <main className="profile-content">
        <div className="profile-container">
          {/* Левая колонка - Профиль клиента */}
          <div className="profile-left">
            <div className="profile-card">
              <div className="profile-header">
                <div className="logo-section">
                  <div className="logo">Психологический Центр "Гармония"</div>
                </div>
                
                <div className="profile-info">
                  {isEditing ? (
                    <div className="edit-form">
                      <div className="form-group-profile">
                        <label>Фамилия:</label>
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => handleEditChange('lastName', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                      <div className="form-group-profile">
                        <label>Имя:</label>
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => handleEditChange('firstName', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                      <div className="form-group-profile">
                        <label>Отчество:</label>
                        <input
                          type="text"
                          value={editForm.middleName}
                          onChange={(e) => handleEditChange('middleName', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="info-row">
                        <span className="label">Фамилия:</span>
                        <span className="value">{clientData.lastName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Имя:</span>
                        <span className="value">{clientData.firstName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Отчество:</span>
                        <span className="value">{clientData.middleName}</span>
                      </div>
                    </>
                  )}
                </div>

                <button 
                  className={`edit-btn ${isEditing ? 'save' : ''}`}
                  onClick={handleEditToggle}
                >
                  {isEditing ? 'Сохранить' : 'Изменить'}
                </button>
              </div>

              <div className="reports-section">
                <h3>История отчетов</h3>
                <div className="reports-list">
                  {reportHistory.map((date, index) => (
                    <div key={index} className="report-item">
                      {date}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - Ежедневный отчет и психолог */}
          <div className="profile-right">
            {/* Ежедневный отчет */}
            <div className="daily-report-card">
              <h3>Ежедневный отчет</h3>
              <div className="timer">{timeLeft}</div>
              
              <div className="image-upload-section">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input-profile"
                />
                <label htmlFor="image-upload" className="upload-label">
                  📸 Загрузите изображение
                </label>
              </div>
            </div>

            {/* Карточка психолога */}
            {psychologist ? (
              <div className="psychologist-card">
                <h3>Ваш Психолог</h3>
                <div className="psychologist-info">
                  <div className="info-row">
                    <span className="label">Фамилия:</span>
                    <span className="value">{psychologist.lastName}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Имя:</span>
                    <span className="value">{psychologist.firstName}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Отчество:</span>
                    <span className="value">{psychologist.middleName}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Специализация:</span>
                    <span className="value">{psychologist.specialty}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Опыт:</span>
                    <span className="value">{psychologist.experience}</span>
                  </div>
                </div>

                <div className="psychologist-actions">
                  <button 
                    className="action-btn-profile refuse-btn"
                    onClick={handleRefusePsychologist}
                  >
                    отказаться от психолога
                  </button>
                  <button 
                    className="action-btn-profile chat-btn"
                    onClick={handleStartChat}
                  >
                    Чат
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-psychologist-card">
                <h3>Психолог не назначен</h3>
                <p>Вы можете выбрать психолога на главной странице</p>
                <button 
                  className="action-btn-profile primary"
                  onClick={() => onNavigate('main')}
                >
                  Выбрать психолога
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientProfile;