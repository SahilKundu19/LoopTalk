import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Check, 
  CheckCheck, 
  Clock,
  Heart,
  Smile,
  Reply,
  MoreHorizontal,
  Zap
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  avatar?: string;
  senderName?: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: string[];
  isSystemMessage?: boolean;
}

interface MessagesListProps {
  selectedChat: number;
  messages: Message[];
  onScroll: (scrollY: number) => void;
}

const sampleMessages: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      text: "Hey everyone! How's everyone doing today?",
      sender: 'other',
      timestamp: 'Today, 8:30pm',
      avatar: 'https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      senderName: 'Sarah',
      status: 'read'
    },
    {
      id: 2,
      text: "I'm doing great! Just finished a really productive day at work.",
      sender: 'other',
      timestamp: 'Today, 8:32pm',
      avatar: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      senderName: 'Mike',
      status: 'read'
    },
    {
      id: 3,
      text: "That sounds awesome! I've been working on a new project myself.",
      sender: 'me',
      timestamp: 'Today, 8:33pm',
      status: 'read',
      reactions: ['👍', '🔥']
    },
    {
      id: 4,
      text: "What kind of project? I'm always curious about what everyone's working on!",
      sender: 'other',
      timestamp: 'Today, 8:34pm',
      avatar: 'https://images.unsplash.com/photo-1653999022416-c210fcc75438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      senderName: 'Emma',
      status: 'read'
    }
  ],
  4: [
    {
      id: 1,
      text: "Hey There!",
      sender: 'other',
      timestamp: 'Today, 8:30pm',
      avatar: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      senderName: 'Anil',
      status: 'read'
    },
    {
      id: 2,
      text: "How are you?",
      sender: 'other',
      timestamp: 'Today, 8:30pm',
      avatar: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      senderName: 'Anil',
      status: 'read'
    },
    {
      id: 3,
      text: "Hello!",
      sender: 'me',
      timestamp: 'Today, 8:33pm',
      status: 'read'
    },
    {
      id: 4,
      text: "I am fine and how are you?",
      sender: 'me',
      timestamp: 'Today, 8:34pm',
      status: 'read'
    },
    {
      id: 5,
      text: "I am doing well, Can we meet tomorrow?",
      sender: 'other',
      timestamp: 'Today, 8:36pm',
      avatar: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150',
      senderName: 'Anil',
      status: 'read'
    },
    {
      id: 6,
      text: "Yes Sure!",
      sender: 'me',
      timestamp: 'Today, 8:58pm',
      status: 'read'
    }
  ]
};

export function MessagesList({ selectedChat, onScroll }: MessagesListProps) {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate progressive loading with animation
    const messages = sampleMessages[selectedChat] || sampleMessages[4];
    setCurrentMessages([]);
    
    // Use a single timeout to load all messages at once to prevent timeout issues
    const timeoutId = setTimeout(() => {
      setCurrentMessages(messages);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleScroll = () => {
    if (containerRef.current) {
      onScroll(containerRef.current.scrollTop);
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock size={14} className="text-gray-400" />;
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className="text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white"
    >
      <AnimatePresence>
        {currentMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 0.1 
            }}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            onMouseEnter={() => setHoveredMessage(message.id)}
            onMouseLeave={() => setHoveredMessage(null)}
          >
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg flex ${
              message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'
            } items-end space-x-2`}>
              
              {/* Avatar for other users */}
              {message.sender === 'other' && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-1"
                >
                  <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                      {message.senderName?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              )}

              {/* Message Bubble */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative group ${message.sender === 'me' ? 'mr-2' : 'ml-2'}`}
              >
                {/* Sender name for group chats */}
                {message.sender === 'other' && message.senderName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-gray-500 mb-1 ml-4"
                  >
                    {message.senderName}
                  </motion.p>
                )}

                <motion.div
                  className={`px-4 py-3 rounded-2xl shadow-sm relative ${
                    message.sender === 'me'
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                  }`}
                  whileHover={{
                    boxShadow: message.sender === 'me' 
                      ? '0 8px 25px rgba(139, 92, 246, 0.3)'
                      : '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {/* Message timestamp and status */}
                  <div className={`flex items-center space-x-1 mt-2 ${
                    message.sender === 'me' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className={`text-xs ${
                      message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </span>
                    {message.sender === 'me' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {getStatusIcon(message.status)}
                      </motion.div>
                    )}
                  </div>

                  {/* Quick reaction bar */}
                  <AnimatePresence>
                    {hoveredMessage === message.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className={`absolute -top-12 ${
                          message.sender === 'me' ? 'right-0' : 'left-0'
                        } bg-white shadow-lg rounded-full p-2 flex space-x-1 border`}
                      >
                        {['❤️', '👍', '😄', '😮', '😢', '😡'].map((emoji) => (
                          <motion.button
                            key={emoji}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            {emoji}
                          </motion.button>
                        ))}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <Reply size={14} className="text-gray-600" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`flex space-x-1 mt-1 ${
                      message.sender === 'me' ? 'justify-end mr-2' : 'justify-start ml-2'
                    }`}
                  >
                    {message.reactions.map((reaction, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.2 }}
                        className="bg-white border rounded-full px-2 py-1 text-xs shadow-sm"
                      >
                        {reaction}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Typing indicator */}
      <AnimatePresence>
        {selectedChat === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-start"
          >
            <div className="flex items-end space-x-2">
              <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm">
                <AvatarImage src="https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150" />
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">A</AvatarFallback>
              </Avatar>
              
              <motion.div
                className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm"
                animate={{ 
                  boxShadow: ['0 2px 8px rgba(0,0,0,0.1)', '0 4px 12px rgba(139, 92, 246, 0.2)', '0 2px 8px rgba(0,0,0,0.1)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      <div ref={messagesEndRef} />
    </div>
  );
}