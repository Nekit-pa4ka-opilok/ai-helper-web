import React, { useState } from 'react';
import Header from './Header';

const ChatPage = ({ onNavigate, userType }) => {
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [message, setMessage] = useState('');

  // Моковые данные для клиента
  const clientDialogs = [
    {
      id: 1,
      psychologist: {
        id: 1,
        name: 'Петрова Мария Сергеевна',
        specialty: 'Клинический психолог',
        avatar: 'MP',
        online: true
      },
      lastMessage: 'Добрый день! Как ваше самочувствие?',
      lastMessageTime: '12:30',
      unread: 2
    },
    {
      id: 2,
      psychologist: {
        id: 2,
        name: 'Сидоров Алексей Иванович',
        specialty: 'Семейный психолог',
        avatar: 'АС',
        online: false
      },
      lastMessage: 'Жду вашего отчета до вечера',
      lastMessageTime: 'Вчера',
      unread: 0
    }
  ];

  // Моковые данные для психолога
  const psychologistDialogs = [
    {
      id: 1,
      client: {
        id: 1,
        name: 'Иванов Иван Иванович',
        status: 'critical',
        avatar: 'ИИ',
        online: true
      },
      lastMessage: 'Здравствуйте, мне стало хуже',
      lastMessageTime: '12:25',
      unread: 3
    },
    {
      id: 2,
      client: {
        id: 2,
        name: 'Смирнова Анна Петровна',
        status: 'stable',
        avatar: 'СА',
        online: false
      },
      lastMessage: 'Спасибо, мне помогли ваши рекомендации',
      lastMessageTime: '10:15',
      unread: 0
    },
    {
      id: 3,
      client: {
        id: 3,
        name: 'Козлов Алексей Викторович',
        status: 'warning',
        avatar: 'КА',
        online: true
      },
      lastMessage: 'Можно задать вопрос?',
      lastMessageTime: '09:45',
      unread: 1
    }
  ];

  const dialogs = userType === 'psychologist' ? psychologistDialogs : clientDialogs;

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'stable': return '#10b981';
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

  const handleSelectDialog = (dialog) => {
    setSelectedDialog(dialog);
    setMessage('');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Отправлено сообщение:', message, 'в диалог:', selectedDialog.id);
      setMessage('');
      // Здесь будет логика отправки сообщения
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="main-app">
      <Header onNavigate={onNavigate} />
      
      <main className="chat-content">
        <div className="chat-container">
          {/* Список диалогов */}
          <div className="dialogs-sidebar">
            <div className="dialogs-header">
              <h2>{userType === 'psychologist' ? 'Мои клиенты' : 'Мои психологи'}</h2>
            </div>
            
            <div className="dialogs-list">
              {dialogs.map(dialog => (
                <div
                  key={dialog.id}
                  className={`dialog-item ${selectedDialog?.id === dialog.id ? 'active' : ''}`}
                  onClick={() => handleSelectDialog(dialog)}
                >
                  <div className="dialog-avatar">
                    {userType === 'psychologist' ? dialog.client.avatar : dialog.psychologist.avatar}
                  </div>
                  
                  <div className="dialog-info">
                    <div className="dialog-header">
                      <span className="dialog-name">
                        {userType === 'psychologist' ? dialog.client.name : dialog.psychologist.name}
                      </span>
                      <span className="dialog-time">{dialog.lastMessageTime}</span>
                    </div>
                    
                    <div className="dialog-preview">
                      <span className="last-message">{dialog.lastMessage}</span>
                      {dialog.unread > 0 && (
                        <span className="unread-count">{dialog.unread}</span>
                      )}
                    </div>

                    {userType === 'psychologist' && (
                      <div 
                        className="client-status"
                        style={{ color: getStatusColor(dialog.client.status) }}
                      >
                        {getStatusText(dialog.client.status)}
                      </div>
                    )}

                    {userType === 'client' && (
                      <div className="psychologist-specialty">
                        {dialog.psychologist.specialty}
                      </div>
                    )}
                  </div>

                  <div className="online-indicator">
                    {((userType === 'psychologist' && dialog.client.online) ||
                      (userType === 'client' && dialog.psychologist.online)) && (
                      <div className="online-dot" title="В сети" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Область чата */}
          <div className="chat-area">
            {selectedDialog ? (
              <>
                <div className="chat-header">
                  <div className="chat-partner-info">
                    <div className="partner-avatar">
                      {userType === 'psychologist' 
                        ? selectedDialog.client.avatar 
                        : selectedDialog.psychologist.avatar
                      }
                    </div>
                    <div className="partner-details">
                      <h3>
                        {userType === 'psychologist' 
                          ? selectedDialog.client.name 
                          : selectedDialog.psychologist.name
                        }
                      </h3>
                      {userType === 'psychologist' ? (
                        <span 
                          className="partner-status"
                          style={{ color: getStatusColor(selectedDialog.client.status) }}
                        >
                          {getStatusText(selectedDialog.client.status)}
                        </span>
                      ) : (
                        <span className="partner-specialty">
                          {selectedDialog.psychologist.specialty}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="chat-actions">
                    <button className="action-btn" title="Информация">
                      ℹ️
                    </button>
                    <button className="action-btn" title="Звонок">
                      📞
                    </button>
                  </div>
                </div>

                <div className="messages-container">
                  <div className="messages-list">
                    {/* Пример сообщений */}
                    <div className="message received">
                      <div className="message-content">
                        <p>Добрый день! Как ваше самочувствие?</p>
                        <span className="message-time">12:30</span>
                      </div>
                    </div>
                    
                    <div className="message sent">
                      <div className="message-content">
                        <p>Здравствуйте! Сегодня чувствую себя лучше</p>
                        <span className="message-time">12:32</span>
                      </div>
                    </div>
                    
                    <div className="message received">
                      <div className="message-content">
                        <p>Это отличные новости! Продолжайте следовать рекомендациям</p>
                        <span className="message-time">12:33</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="message-input-container">
                  <div className="message-input-wrapper">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Введите сообщение..."
                      className="message-input"
                      rows="1"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="send-btn"
                    >
                      📤
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-dialog-selected">
                <div className="no-dialog-content">
                  <div className="no-dialog-icon">💬</div>
                  <h3>Выберите диалог</h3>
                  <p>
                    {userType === 'psychologist' 
                      ? 'Выберите клиента из списка для начала общения' 
                      : 'Выберите психолога из списка для начала общения'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;