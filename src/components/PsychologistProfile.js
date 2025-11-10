import React, { useState } from 'react';
import Header from './Header';

const PsychologistProfile = ({ onNavigate }) => {
  const [psychologistData, setPsychologistData] = useState({
    lastName: 'Петрова',
    firstName: 'Мария',
    middleName: 'Сергеевна',
    specialty: 'Клинический психолог',
    experience: '8 лет опыта',
    education: 'МГУ, факультет психологии',
    description: 'Специализируюсь на работе с тревожными расстройствами и паническими атаками. Использую когнитивно-поведенческую терапию и методы релаксации.',
    photo: null
  });

  const [clients, setClients] = useState([
    { id: 1, name: 'Иванов Иван Иванович', status: 'critical', lastSession: '2024.01.15' },
    { id: 2, name: 'Смирнова Анна Петровна', status: 'stable', lastSession: '2024.01.14' },
    { id: 3, name: 'Козлов Алексей Викторович', status: 'warning', lastSession: '2024.01.13' },
    { id: 4, name: 'Никитина Елена Сергеевна', status: 'stable', lastSession: '2024.01.12' },
    { id: 5, name: 'Фёдоров Дмитрий Олегович', status: 'critical', lastSession: '2024.01.11' }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(psychologistData);

  const handleEditToggle = () => {
    if (isEditing) {
      setPsychologistData(editForm);
    } else {
      setEditForm(psychologistData);
    }
    setIsEditing(!isEditing);
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPsychologistData(prev => ({
          ...prev,
          photo: e.target.result
        }));
        setEditForm(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartChat = (clientId) => {
  console.log('Начат чат с клиентом:', clientId);
  onNavigate('chat');
};

  const handleRemoveClient = (clientId, clientName) => {
    if (window.confirm(`Вы уверены, что хотите удалить клиента ${clientName} из списка?`)) {
      setClients(prev => prev.filter(client => client.id !== clientId));
      alert(`Клиент ${clientName} удален из списка`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#ef4444'; // красный
      case 'warning': return '#f59e0b'; // желтый
      case 'stable': return '#10b981'; // зеленый
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'critical': return 'Критическое состояние';
      case 'warning': return 'Требует внимания';
      case 'stable': return 'Стабильное состояние';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="main-app">
      <Header onNavigate={onNavigate} />
      
      <main className="profile-content">
        <div className="profile-container">
          {/* Левая колонка - Профиль психолога */}
          <div className="profile-left">
            <div className="profile-card">
              <div className="profile-header">
                <div className="logo-section">
                  <div className="logo">Психологический Центр "Гармония"</div>
                </div>
                
                <div className="psychologist-photo-section">
                  <div className="photo-upload">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="file-input-profile"
                    />
                    <label htmlFor="photo-upload" className="photo-upload-label">
                      {psychologistData.photo ? (
                        <img 
                          src={psychologistData.photo} 
                          alt="Фото психолога" 
                          className="psychologist-photo"
                        />
                      ) : (
                        <div className="photo-placeholder">
                          📷<br />
                          Загрузить фото
                        </div>
                      )}
                    </label>
                  </div>
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
                      <div className="form-group-profile">
                        <label>Специализация:</label>
                        <input
                          type="text"
                          value={editForm.specialty}
                          onChange={(e) => handleEditChange('specialty', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                      <div className="form-group-profile">
                        <label>Опыт:</label>
                        <input
                          type="text"
                          value={editForm.experience}
                          onChange={(e) => handleEditChange('experience', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                      <div className="form-group-profile">
                        <label>Образование:</label>
                        <input
                          type="text"
                          value={editForm.education}
                          onChange={(e) => handleEditChange('education', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="info-row">
                        <span className="label">Фамилия:</span>
                        <span className="value">{psychologistData.lastName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Имя:</span>
                        <span className="value">{psychologistData.firstName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Отчество:</span>
                        <span className="value">{psychologistData.middleName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Специализация:</span>
                        <span className="value">{psychologistData.specialty}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Опыт:</span>
                        <span className="value">{psychologistData.experience}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Образование:</span>
                        <span className="value">{psychologistData.education}</span>
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

              {/* Дополнительная информация психолога */}
              <div className="psychologist-description-section">
                <h3>О себе</h3>
                {isEditing ? (
                  <textarea
                    value={editForm.description}
                    onChange={(e) => handleEditChange('description', e.target.value)}
                    className="description-textarea"
                    placeholder="Расскажите о своем подходе к работе, методах терапии и специализации..."
                    rows="4"
                  />
                ) : (
                  <div className="description-text">
                    {psychologistData.description}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Правая колонка - Список клиентов */}
          <div className="profile-right">
            <div className="clients-card">
              <h3>Мои клиенты</h3>
              <div className="clients-list">
                {clients.length === 0 ? (
                  <div className="no-clients">
                    <p>У вас пока нет клиентов</p>
                  </div>
                ) : (
                  clients.map(client => (
                    <div key={client.id} className="client-item">
                      <div 
                        className="client-status-indicator"
                        style={{ backgroundColor: getStatusColor(client.status) }}
                        title={getStatusText(client.status)}
                      />
                      <div className="client-info">
                        <div className="client-name">{client.name}</div>
                        <div className="client-last-session">
                          Последняя сессия: {client.lastSession}
                        </div>
                      </div>
                      <div className="client-actions">
                        <button 
                          className="client-action-btn chat-btn"
                          onClick={() => handleStartChat(client.id)}
                          title="Начать чат"
                        >
                          💬
                        </button>
                        <button 
                          className="client-action-btn remove-btn"
                          onClick={() => handleRemoveClient(client.id, client.name)}
                          title="Удалить клиента"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="clients-stats">
                <div className="stat-item">
                  <span className="stat-label">Всего клиентов:</span>
                  <span className="stat-value">{clients.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label" style={{color: '#ef4444'}}>Критические:</span>
                  <span className="stat-value">
                    {clients.filter(c => c.status === 'critical').length}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label" style={{color: '#f59e0b'}}>Требуют внимания:</span>
                  <span className="stat-value">
                    {clients.filter(c => c.status === 'warning').length}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label" style={{color: '#10b981'}}>Стабильные:</span>
                  <span className="stat-value">
                    {clients.filter(c => c.status === 'stable').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PsychologistProfile;