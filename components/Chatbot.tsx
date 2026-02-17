'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { useChatbotContext } from '@/contexts/ChatbotContext';

const Chatbot: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalUrl, setProposalUrl] = useState('https://www.javanetict.com/proposal');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { isChatbotOpen, openChatbot, closeChatbot } = useChatbotContext();
  
  const {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
    suggestions,
  } = useChatbot();

  // Contact information
  const contactInfo = {
    whatsapp: '+2347030673089',
    phone: '+2349128688164',
    email: 'info@javanetict.com',
    whatsappUrl: 'https://wa.me/2347030673089',
    emailUrl: 'mailto:info@javanetict.com?subject=JavaNet%20EdTech%20Suite%20Inquiry'
  };

  // Dynamic quick questions
  const quickQuestions = [
    'What is JavaNet edTech Suite?',
    'What modules are included?',
    'How much does it cost?',
    'I am a School',
    'I am a University',
    'I am a Training Center',
    'Show me demo links',
    'Generate Proposal'
  ];

  // User type options
  const userTypes = ['School', 'University', 'Training Center', 'Government', 'Education Company'];

  // Simulate typing indicator
  useEffect(() => {
    if (loading) {
      setIsTyping(true);
    } else {
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, suggestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;
    
    const message = inputMessage.trim();
    setInputMessage('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    if (question === 'Generate Proposal') {
      window.open(proposalUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        sendMessage('Generate proposal');
      }, 300);
    } else {
      sendMessage(question);
    }
  };

  const handleDemoLink = (type: 'learning' | 'assess') => {
    const url = type === 'learning' 
      ? 'https://www.ischool.ng/ole_home'
      : 'https://www.ischool.ng/ola_home';
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    window.open(contactInfo.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneCall = () => {
    window.open(`tel:${contactInfo.phone}`, '_self');
  };

  const handleEmail = () => {
    window.open(contactInfo.emailUrl, '_self');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFollowUpSuggestions = () => {
    if (suggestions && suggestions.length > 0) {
      return suggestions;
    }
    
    // Get conversation state from last message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.isUser) return [];
    
    const messageContent = lastMessage.content.toLowerCase();
    
    // If modules were discussed
    if (messageContent.includes('module') || messageContent.includes('jn assess') || messageContent.includes('jn learning')) {
      return [
        'CBT Tests',
        'Live Virtual Classroom',
        'Generate Proposal'
      ];
    }
    
    // If demo was just shown
    if (messageContent.includes('ischool.ng') && messageContent.includes('demo')) {
      return [
        'Talk to sales team',
        'Generate proposal'
      ];
    }
    
    // If pricing was discussed
    if (messageContent.includes('₦') || messageContent.includes('$') || messageContent.includes('pricing')) {
      return [
        'Generate proposal',
        'Show me demo links'
      ];
    }
    
    // If contact/sales was discussed
    if (messageContent.includes('contact') || messageContent.includes('sales') || 
        messageContent.includes('whatsapp') || messageContent.includes('phone') || 
        messageContent.includes('email')) {
      return [
        'Schedule a call',
        'WhatsApp chat',
        'Send email'
      ];
    }
    
    // If proposal was mentioned
    if (messageContent.includes('proposal') || messageContent.includes('generate')) {
      return [
        'Discuss with sales team',
        'View demo links'
      ];
    }
    
    // If CBT tests were mentioned
    if (messageContent.includes('cbt') || messageContent.includes('test') || messageContent.includes('exam')) {
      return [
        'Virtual Classroom',
        'Generate Proposal',
        'View CBT Demo'
      ];
    }
    
    // If virtual classroom was mentioned
    if (messageContent.includes('virtual') || messageContent.includes('classroom') || messageContent.includes('online class')) {
      return [
        'CBT Tests',
        'Generate Proposal',
        'View Classroom Demo'
      ];
    }
    
    // If university asked about faculties
    if (messageContent.includes('faculties') || (messageContent.includes('university') && messageContent.includes('how many'))) {
      return [
        'Show me demo links',
        'Generate proposal',
        'Talk to sales team'
      ];
    }
    
    return [];
  };

  const followUpSuggestions = getFollowUpSuggestions();

  const getConversationStage = () => {
    if (messages.length === 0) return 'welcome';
    
    const lastBotMessage = messages.filter(m => !m.isUser).pop();
    if (!lastBotMessage) return 'welcome';
    
    const content = lastBotMessage.content.toLowerCase();
    
    if (content.includes('outside the scope')) return 'out_of_scope';
    if (content.includes('javanet') && content.includes('platform')) return 'about';
    if (content.includes('module') || content.includes('feature') || content.includes('jn assess') || content.includes('jn learning')) return 'modules';
    if (content.includes('price') || content.includes('cost') || content.includes('₦') || content.includes('$')) return 'pricing';
    if (content.includes('school') || content.includes('university') || content.includes('training') || content.includes('government') || content.includes('company')) return 'institution';
    if (content.includes('country') || content.includes('location')) return 'location';
    if (content.includes('user') || content.includes('student') || content.includes('how many') || content.includes('faculties')) return 'volume';
    if (content.includes('demo') || content.includes('ischool')) return 'demo';
    if (content.includes('proposal') || content.includes('generate')) return 'proposal';
    if (content.includes('contact') || content.includes('sales') || content.includes('whatsapp') || content.includes('phone') || content.includes('email')) return 'contact';
    if (content.includes('cbt') || content.includes('test') || content.includes('exam')) return 'cbt';
    if (content.includes('virtual') || content.includes('classroom')) return 'virtual_classroom';
    
    return 'general';
  };

  const conversationStage = getConversationStage();

  // Proposal Modal Component
  const ProposalModal = () => (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2500 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="bi bi-file-text me-2"></i>
              Generate Custom Proposal
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white"
              onClick={() => setShowProposalModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Our proposal generator will help you create a customized quote based on:</p>
            <ul>
              <li>Platform selection (CBT, Virtual Classroom, or both)</li>
              <li>Number of users</li>
              <li>Custom features needed</li>
              <li>Your location (for accurate pricing)</li>
            </ul>
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              You'll be able to download or share the proposal after generation.
            </div>
          </div>
          <div className="modal-footer">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowProposalModal(false)}
            >
              Later
            </button>
            <a 
              href={proposalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => {
                setShowProposalModal(false);
                sendMessage('Opening proposal generator');
              }}
            >
              <i className="bi bi-arrow-right-circle me-2"></i>
              Open Proposal Generator
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Chatbot Avatar */}
      <div 
        className="position-fixed d-flex align-items-center gap-2 chatbot-avatar"
        style={{
          bottom: '30px',
          right: '30px',
          zIndex: 2000,
          cursor: 'pointer',
        }}
        onClick={openChatbot}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openChatbot()}
        aria-label="Open JN Assistant chatbot"
      >
        <div 
          className="d-flex align-items-center gap-2 bg-primary text-white rounded-pill p-2 px-3 hover-lift"
          style={{
            transition: 'all 0.3s ease',
            boxShadow: 'none', // Removed shadow
            border: 'none',
          }}
        >
          <div className="position-relative">
            <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
                 style={{ width: '50px', height: '50px' }}>
              <i className="bi bi-robot fs-4"></i>
            </div>
            <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border-2 border-white online-indicator"
                 style={{ width: '12px', height: '12px' }}></div>
          </div>
          <div>
            <h6 className="mb-0 fw-bold text-warning">JN Assistant</h6>
            <small className="opacity-75">
              {isChatbotOpen ? 'Chatting...' : 'Click to chat'}
            </small>
          </div>
        </div>

        {messages.length > 0 && !isChatbotOpen && (
          <div className="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger"
               style={{ width: '20px', height: '20px' }}>
            <span className="visually-hidden">New messages</span>
          </div>
        )}

        {isChatbotOpen && (
          <button
            className="btn btn-danger rounded-circle ms-2"
            style={{
              width: '40px',
              height: '40px',
              boxShadow: 'none', // Removed shadow
              border: 'none',
            }}
            onClick={(e) => {
              e.stopPropagation();
              closeChatbot();
            }}
            aria-label="Close chatbot"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>

      {/* Proposal Modal */}
      {showProposalModal && <ProposalModal />}

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div 
          className="position-fixed rounded-3 overflow-hidden d-flex flex-column"
          style={{
            top: '70px',
            right: '30px',
            width: '400px',
            height: 'calc(100vh - 140px)',
            maxWidth: 'calc(100vw - 60px)',
            maxHeight: 'calc(100vh - 150px)',
            zIndex: 2500, // Increased z-index to be above everything
            backgroundColor: 'white',
            boxShadow: 'none', // Removed shadow
            border: '1px solid rgba(0,0,0,0.1)', // Added subtle border instead of shadow
            animation: 'messageIn 0.3s ease-out',
          }}
          role="dialog"
          aria-label="JN Assistant Chatbot"
        >
          {/* Chat Header */}
          <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center flex-shrink-0">
            <div className="d-flex align-items-center">
              <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                   style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-robot"></i>
              </div>
              <div>
                <h6 className="mb-0 text-white">JN Assistant</h6>
                <small>JavaNet EdTech Support</small>
              </div>
            </div>
            <div className="d-flex gap-2">

              <button
                className="btn btn-sm btn-outline-light"
                onClick={clearChat}
                title="Clear chat"
                aria-label="Clear chat history"
              >
                <i className="bi bi-trash"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={closeChatbot}
                title="Close chat"
                aria-label="Close chatbot"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          {/* Rest of the component remains the same */}
          {/* Chat Messages Area */}
          <div 
            className="flex-grow-1 p-3 bg-light overflow-auto"
            style={{ minHeight: 0 }}
          >
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center mb-4 message-bubble">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                     style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-robot fs-4"></i>
                </div>
                <h6 className="text-primary">Hello! I'm JN Assistant</h6>
                <p className="text-muted small">
                  I can guide you through our JavaNet edTech Suite - an all-in-one platform for CBT testing, virtual classrooms, and school management.
                </p>
                
                {/* Quick Questions */}
                <div className="mt-3">
                  <small className="text-muted d-block mb-2">Quick questions:</small>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleQuickQuestionClick(question)}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* User Type Selection */}
                <div className="mt-3">
                  <small className="text-muted d-block mb-2">I represent a:</small>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {userTypes.map((type, index) => (
                      <button
                        key={index}
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => sendMessage(`I am a ${type}`)}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 message-bubble ${message.isUser ? 'text-end' : 'text-start'}`}
              >
                <div
                  className={`d-inline-block p-3 rounded-3 ${message.isUser ? 'bg-primary text-white' : 'bg-white border'}`}
                  style={{ maxWidth: '85%', whiteSpace: 'pre-line' }}
                >
                  {message.isUser ? (
                    <p className="mb-1">{message.content}</p>
                  ) : (
                    <div>
                      <p className="mb-1">{message.content}</p>
                      
                      {/* Demo Links */}
                      {message.content.includes('ischool.ng') && (
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          <button 
                            onClick={() => handleDemoLink('learning')}
                            className="btn btn-sm btn-success"
                          >
                            <i className="bi bi-play-circle me-1"></i>JN Learning Demo
                          </button>
                          <button 
                            onClick={() => handleDemoLink('assess')}
                            className="btn btn-sm btn-info"
                          >
                            <i className="bi bi-clipboard-check me-1"></i>JN Assess Demo
                          </button>
                        </div>
                      )}
                      
                      {/* Proposal Link */}
                      {(message.content.includes('proposal') && message.content.includes('localhost:3000')) || 
                       (message.content.includes('proposal') && !message.content.includes('outside scope')) ? (
                        <div className="mt-2">
                          <a 
                            href={proposalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-warning proposal-link"
                          >
                            <i className="bi bi-file-text me-1"></i>Open Proposal Generator
                          </a>
                        </div>
                      ) : null}
                      
                      {/* Contact Buttons for out of scope messages */}
                      {message.content.includes('outside the scope') && (
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          <button
                            onClick={handleWhatsApp}
                            className="btn btn-sm btn-success"
                          >
                            <i className="bi bi-whatsapp me-1"></i>WhatsApp
                          </button>
                          <button
                            onClick={handlePhoneCall}
                            className="btn btn-sm btn-primary"
                          >
                            <i className="bi bi-telephone me-1"></i>Call Now
                          </button>
                          <button
                            onClick={handleEmail}
                            className="btn btn-sm btn-secondary"
                          >
                            <i className="bi bi-envelope me-1"></i>Send Email
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <small className={`opacity-75 d-block mt-1 ${message.isUser ? 'text-white-75' : 'text-muted'}`}>
                    {formatTime(message.timestamp)}
                  </small>
                </div>
              </div>
            ))}

            {/* Follow-up Suggestions */}
            {followUpSuggestions.length > 0 && !loading && (
              <div className="mt-3 mb-3">
                <small className="text-muted d-block mb-2">Suggested responses:</small>
                <div className="d-flex flex-wrap gap-2">
                  {followUpSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        if (suggestion === 'WhatsApp chat' || suggestion === 'WhatsApp') {
                          handleWhatsApp();
                        } else if (suggestion === 'Schedule a call' || suggestion === 'Call') {
                          handlePhoneCall();
                          setTimeout(() => {
                            sendMessage('Schedule a call');
                          }, 300);
                        } else if (suggestion === 'Send email' || suggestion === 'Email') {
                          handleEmail();
                          setTimeout(() => {
                            sendMessage('Send email');
                          }, 300);
                        } else if (suggestion === 'Generate proposal' || suggestion === 'Generate Proposal') {
                          window.open(proposalUrl, '_blank', 'noopener,noreferrer');
                          sendMessage('Generate proposal');
                        } else if (suggestion === 'Show me demo links' || suggestion === 'View demo links') {
                          sendMessage('Show me demo links');
                        } else if (suggestion === 'Talk to sales team' || suggestion === 'Discuss with sales team') {
                          sendMessage('Talk to sales team');
                        } else if (suggestion === 'View CBT Demo') {
                          handleDemoLink('assess');
                          setTimeout(() => {
                            sendMessage('I viewed the CBT demo');
                          }, 1000);
                        } else if (suggestion === 'View Classroom Demo') {
                          handleDemoLink('learning');
                          setTimeout(() => {
                            sendMessage('I viewed the classroom demo');
                          }, 1000);
                        } else if (suggestion === 'CBT Tests') {
                          sendMessage('CBT Tests');
                        } else if (suggestion === 'Virtual Classroom' || suggestion === 'Live Virtual Classroom') {
                          sendMessage('Live Virtual Classroom');
                        } else {
                          sendMessage(suggestion);
                        }
                      }}
                      style={{ fontSize: '0.85rem' }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="text-start mb-3 message-bubble">
                <div className="d-inline-block p-3 rounded-3 bg-white border">
                  <div className="d-flex align-items-center">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                    <span className="text-muted ms-2">JN Assistant is typing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger small mb-3 message-bubble">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Bar */}
          <div className="p-2 border-top bg-white flex-shrink-0">
            <div className="row g-1">
              {['WhatsApp', 'Call', 'Email', 'Proposal'].map((action, index) => (
                <div key={index} className="col-3">
                  <button
                    className="btn btn-outline-primary btn-sm w-100 text-truncate py-1"
                    onClick={() => {
                      if (action === 'WhatsApp') handleWhatsApp();
                      else if (action === 'Call') handlePhoneCall();
                      else if (action === 'Email') handleEmail();
                      else if (action === 'Proposal') {
                        window.open(proposalUrl, '_blank', 'noopener,noreferrer');
                        sendMessage('Generate proposal');
                      }
                    }}
                    title={action}
                    style={{ fontSize: '0.75rem' }}
                  >
                    <i className={`bi bi-${
                      index === 0 ? 'whatsapp' : 
                      index === 1 ? 'telephone' : 
                      index === 2 ? 'envelope' : 
                      'file-text'
                    }`}></i>
                    <span className="d-none d-sm-inline ms-1">{action}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-top bg-white flex-shrink-0">
            <div className="input-group">
              <textarea
                className="form-control"
                placeholder="Type your message here... (Type 'proposal' for custom quote)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                style={{ resize: 'none', fontSize: '0.9rem' }}
                disabled={loading}
                aria-label="Type your message"
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading || !inputMessage.trim()}
                aria-label="Send message"
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-muted">
                Press Enter to send • Type 'proposal' for custom quote
              </small>
              <button
                type="button"
                className="btn btn-link btn-sm text-decoration-none"
                onClick={() => setShowProposalModal(true)}
              >
                <i className="bi bi-file-text me-1"></i>
                Quick Proposal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CSS Styles */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #6c757d;
          margin: 0 2px;
          animation: typingAnimation 1.4s infinite ease-in-out;
        }
        .typing-dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        .typing-dot:nth-child(2) {
          animation-delay: -0.16s;
        }
        @keyframes typingAnimation {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .message-bubble {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hover-lift:hover {
          transform: translateY(-3px);
        }
        .online-indicator {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
        }
        .proposal-link {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white !important;
        }
        .proposal-link:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          color: white !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default Chatbot;