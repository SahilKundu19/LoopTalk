import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  MessageCircle, 
  Bell, 
  Settings, 
  Search,
  Plus,
  Users,
  Hash,
  Phone,
  Video,
  MoreHorizontal,
  Info,
  Archive,
  VolumeX,
  Star,
  Trash2,
  Send, 
  Paperclip, 
  Mic, 
  Smile, 
  Image as ImageIcon,
  File,
  Camera,
  MapPin,
  Gift,
  X,
  Volume2,
  Square,
  Check, 
  CheckCheck, 
  Clock,
  Heart,
  Reply,
  Zap,
  Loader2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

interface ChatAreaProps {
  selectedChat: number;
  setSelectedChat: (chatId: number) => void;
  onSendMessage: (message: string) => void;
}

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

// Navigation items for the sidebar
const navigationItems = [
  { icon: Home, id: 'home', active: false },
  { icon: MessageCircle, id: 'messages', active: true },
  { icon: Bell, id: 'notifications', active: false },
  { icon: Settings, id: 'settings', active: false },
];

// Groups data
const groups = [
  {
    id: 1,
    name: "Friends Forever",
    lastMessage: "Hahahaha!",
    time: "Today, 9:52pm",
    unread: 12,
    avatar: "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: true
  },
  {
    id: 2,
    name: "Mera Gang",
    lastMessage: "Kyuuuuu!???",
    time: "Yesterday, 12:31pm",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: false
  },
  {
    id: 3,
    name: "Hiking",
    lastMessage: "It's not going to happen",
    time: "Wednesday, 9:12am",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1653999022416-c210fcc75438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: true
  }
];

// People data
const people = [
  {
    id: 4,
    name: "Anil",
    status: "April fool's day",
    time: "Today, 9:52pm",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: true,
    verified: true
  },
  {
    id: 5,
    name: "Chuuthiya",
    status: "Busy",
    time: "Today, 12:11pm",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: false,
    verified: false
  },
  {
    id: 6,
    name: "Mary ma'am",
    status: "You have to report it",
    time: "Today, 2:40pm",
    unread: 1,
    avatar: "https://images.unsplash.com/photo-1653999022416-c210fcc75438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: true,
    verified: false
  },
  {
    id: 7,
    name: "Bill Gates",
    status: "Nevermind bro",
    time: "Yesterday, 12:31pm",
    unread: 5,
    avatar: "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: false,
    verified: true
  },
  {
    id: 8,
    name: "Victoria H",
    status: "Okay, brother, let's see...",
    time: "Wednesday, 11:12pm",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1653999022416-c210fcc75438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    online: true,
    verified: true
  }
];

// Chat data for header
const chatData = {
  1: {
    name: "Friends Forever",
    status: "8 members, 3 online",
    avatar: "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    isGroup: true,
    online: true,
    typing: false
  },
  4: {
    name: "Anil",
    status: "Online • Last seen, 2:02pm",
    avatar: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    isGroup: false,
    online: true,
    typing: true
  },
  5: {
    name: "Chuuthiya",
    status: "Last seen yesterday at 10:30pm",
    avatar: "https://images.unsplash.com/photo-1653999022416-c210fcc75438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    isGroup: false,
    online: false,
    typing: false
  }
};

// Sample messages
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

// Emoji categories
const emojiCategories = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋'],
  'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'],
  'Gestures': ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐', '✋', '🖖', '👏']
};

// Attachment options
const attachmentOptions = [
  { icon: ImageIcon, label: 'Photos', color: 'text-pink-500 bg-pink-100' },
  { icon: File, label: 'Document', color: 'text-blue-500 bg-blue-100' },
  { icon: Camera, label: 'Camera', color: 'text-blue-500 bg-blue-100' },
  { icon: MapPin, label: 'Location', color: 'text-green-500 bg-green-100' },
  { icon: Gift, label: 'Gift', color: 'text-orange-500 bg-orange-100' },
];

export function ChatArea({ selectedChat, setSelectedChat, onSendMessage }: ChatAreaProps) {
  // Context hooks
  const { user, signOut } = useAuth();
  const { 
    messages, 
    rooms, 
    currentRoom, 
    loading, 
    sendMessage, 
    setCurrentRoom,
    createRoom 
  } = useChat();

  // Sidebar state
  const [searchQuery, setSearchQuery] = useState('');

  // Header state
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  // Messages state
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Input state
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAttachments, setShowAttachments] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout>();

  // Filter rooms for sidebar
  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current chat data (use currentRoom from context)
  const currentChatData = currentRoom ? {
    name: currentRoom.name,
    status: `${rooms.length} rooms available`,
    avatar: "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    isGroup: true,
    online: true,
    typing: false
  } : {
    name: "Select a room",
    status: "Choose a room to start chatting",
    avatar: "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150",
    isGroup: false,
    online: false,
    typing: false
  };

  // Effects
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  // Handlers
  const handleScroll = () => {
    if (containerRef.current) {
      // onScroll callback can be added here if needed
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
        return <CheckCheck size={14} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const handleSend = async () => {
    if (message.trim() && currentRoom) {
      await sendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <div className="flex size-full">
      {/* Navigation Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-16 md:w-20 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 flex flex-col items-center py-4 md:py-6 shadow-2xl"
      >
        {/* Profile Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => signOut()}
          className="mb-8 relative cursor-pointer"
          title="Sign out"
        >
          <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 md:ring-4 ring-white/20">
            <AvatarImage src={user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150"} />
            <AvatarFallback className="bg-blue-300 text-blue-800">
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
          />
        </motion.div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-4 flex-1">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.2, x: 8 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 relative ${
                item.active 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} className="md:w-6 md:h-6" />
              {item.active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/20 rounded-2xl"
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Microsoft Teams Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mt-auto p-3 bg-white/10 rounded-2xl"
        >
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-blue-600 text-xs font-bold">T</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Chat List */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-64 md:w-80 bg-gray-50 flex flex-col h-full"
      >
        {/* Header with Search */}
        <div className="p-4 bg-white shadow-sm">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0 rounded-xl h-12 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Rooms Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Rooms</h3>
              <Button 
                size="sm" 
                variant="ghost" 
                className="p-2 hover:bg-blue-100"
                onClick={async () => {
                  const roomName = prompt('Enter room name:');
                  if (roomName) {
                    await createRoom(roomName);
                  }
                }}
              >
                <Plus size={16} className="text-blue-600" />
              </Button>
            </div>

            <div className="space-y-2">
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              ) : filteredRooms.length === 0 ? (
                <div className="text-center p-4 text-gray-500">
                  <p>No rooms found</p>
                  <p className="text-sm">Create your first room!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredRooms.map((room, index) => (
                    <motion.div
                      key={room.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      onClick={() => setCurrentRoom(room)}
                      className={`p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                        currentRoom?.id === room.id
                          ? 'bg-blue-100 shadow-md'
                          : 'bg-white hover:bg-gray-50 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {room.name[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 truncate">{room.name}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(room.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {room.description || 'No description'}
                          </p>
                        </div>

                        {room.is_private && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            🔒
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex flex-col bg-white/50 backdrop-blur-sm min-w-0"
      >
        {/* Chat Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border-b border-gray-100 p-3 md:p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            {/* Left Side - Avatar and Info */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Avatar className="w-10 h-10 md:w-12 md:h-12 ring-2 ring-blue-100">
                  <AvatarImage src={currentChatData.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {currentChatData.name[0]}
                  </AvatarFallback>
                </Avatar>
                
                {currentChatData.online && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                  />
                )}
              </motion.div>

              <div className="flex-1">
                <motion.h2
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-semibold text-gray-900 text-lg md:text-xl"
                >
                  {currentChatData.name}
                </motion.h2>
                
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  {currentChatData.typing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-1 text-blue-600"
                    >
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                        />
                      </div>
                      <span className="text-sm">typing...</span>
                    </motion.div>
                  ) : (
                    <p className="text-sm text-gray-500">{currentChatData.status}</p>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCallActive(!isCallActive)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isCallActive 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Phone size={18} className="md:w-5 md:h-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVideoActive(!isVideoActive)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isVideoActive 
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                      : 'hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Video size={18} className="md:w-5 md:h-5" />
                </Button>
              </motion.div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-3 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                    >
                      <MoreHorizontal size={18} className="md:w-5 md:h-5" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-white/95 backdrop-blur-sm border shadow-lg"
                >
                  <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-200">
                    <Search size={16} className="mr-2" />
                    Search in conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-200">
                    <Info size={16} className="mr-2" />
                    Conversation info
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-200">
                    <Star size={16} className="mr-2" />
                    Add to favorites
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-orange-50 transition-colors duration-200">
                    <VolumeX size={16} className="mr-2" />
                    Mute notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-orange-50 transition-colors duration-200">
                    <Archive size={16} className="mr-2" />
                    Archive conversation
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-red-50 text-red-600 transition-colors duration-200">
                    <Trash2 size={16} className="mr-2" />
                    Delete conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Call/Video Status Indicators */}
          <AnimatePresence>
            {(isCallActive || isVideoActive) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`w-3 h-3 rounded-full ${
                        isVideoActive ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                    />
                    <span className="text-sm font-medium">
                      {isVideoActive ? 'Video call active' : 'Voice call active'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      00:42
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsCallActive(false);
                        setIsVideoActive(false);
                      }}
                      className="h-8 px-3 text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      End call
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Messages List */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6 bg-gradient-to-b from-gray-50/50 to-white"
        >
          <AnimatePresence>
            {messages.map((message, index) => {
              const isMyMessage = message.user_id === user?.id;
              return (
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
                  className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                  onMouseEnter={() => setHoveredMessage(message.id)}
                  onMouseLeave={() => setHoveredMessage(null)}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg flex ${
                    isMyMessage ? 'flex-row-reverse' : 'flex-row'
                  } items-end space-x-2`}>
                    
                    {/* Avatar for other users */}
                    {!isMyMessage && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="mb-1"
                      >
                        <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm">
                          <AvatarImage src={message.profiles?.avatar_url} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {message.profiles?.full_name?.[0] || message.profiles?.username?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                    )}

                    {/* Message Bubble */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative group ${isMyMessage ? 'mr-2' : 'ml-2'}`}
                    >
                      {/* Sender name for group chats */}
                      {!isMyMessage && message.profiles && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-gray-500 mb-1 ml-4"
                        >
                          {message.profiles.full_name || message.profiles.username}
                        </motion.p>
                      )}

                      <motion.div
                        className={`px-4 py-3 rounded-2xl shadow-sm relative ${
                          isMyMessage
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                            : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                        }`}
                        whileHover={{
                          boxShadow: isMyMessage 
                            ? '0 8px 25px rgba(59, 130, 246, 0.3)'
                            : '0 8px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {/* Message timestamp */}
                        <div className={`flex items-center space-x-1 mt-2 ${
                          isMyMessage ? 'justify-end' : 'justify-start'
                        }`}>
                          <span className={`text-xs ${
                            isMyMessage ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {new Date(message.created_at).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>

                        {/* Quick reaction bar */}
                        <AnimatePresence>
                          {hoveredMessage === message.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: 10 }}
                              className={`absolute -top-12 ${
                                isMyMessage ? 'right-0' : 'left-0'
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
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Show loading or empty state */}
          {messages.length === 0 && !loading && currentRoom && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-8 text-gray-500"
            >
              <h3 className="text-lg font-medium mb-2">Welcome to {currentRoom.name}!</h3>
              <p className="text-sm text-center">
                This is the beginning of your conversation in this room.
                <br />
                Send a message to get started!
              </p>
            </motion.div>
          )}
          
          {!currentRoom && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-8 text-gray-500"
            >
              <h3 className="text-lg font-medium mb-2">Welcome to ChatFlow!</h3>
              <p className="text-sm text-center">
                Select a room from the sidebar to start chatting,
                <br />
                or create a new room to get started.
              </p>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border-t border-gray-100 bg-white/80 backdrop-blur-sm p-3 md:p-4"
        >
          {/* Recording Overlay */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-0 bg-red-50/95 backdrop-blur-sm flex items-center justify-center z-20"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 bg-red-500 rounded-full"
                  />
                  <span className="text-red-700 font-medium">Recording...</span>
                  <span className="text-red-600 font-mono">{formatRecordingTime(recordingTime)}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleRecording}
                    className="ml-4 hover:bg-red-100 hover:border-red-300"
                  >
                    <Square size={14} className="mr-1" />
                    Stop
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attachment Options */}
          <AnimatePresence>
            {showAttachments && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="mb-4 p-4 bg-gray-50 rounded-2xl border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">Attach</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowAttachments(false)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <X size={16} />
                  </Button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {attachmentOptions.map((option, index) => (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white transition-all duration-200"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${option.color}`}>
                        <option.icon size={20} />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Input Area */}
          <div className={`flex items-end space-x-3 transition-all duration-300 ${
            isFocused ? 'bg-white rounded-2xl p-3 shadow-lg border-2 border-blue-200' : ''
          }`}>
            {/* Attachment Button */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAttachments(!showAttachments)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  showAttachments 
                    ? 'bg-blue-100 text-blue-600 rotate-45' 
                    : 'hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {showAttachments ? <X size={20} /> : <Plus size={20} />}
              </Button>
            </motion.div>

            {/* Message Input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Type your message here..."
                className="resize-none border-0 bg-transparent focus:ring-0 min-h-[48px] max-h-[120px] py-3 px-4 text-base"
                rows={1}
              />
              
              {/* Emoji Picker */}
              <div className="absolute right-3 bottom-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                      >
                        <Smile size={18} />
                      </Button>
                    </motion.div>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-80 p-4 bg-white/95 backdrop-blur-sm border shadow-lg"
                    align="end"
                    side="top"
                  >
                    <div className="space-y-4">
                      {Object.entries(emojiCategories).map(([category, emojis]) => (
                        <div key={category}>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                          <div className="grid grid-cols-7 gap-2">
                            {emojis.map((emoji) => (
                              <motion.button
                                key={emoji}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMessage(prev => prev + emoji)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors duration-200"
                              >
                                <span className="text-lg">{emoji}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Voice Message / Send Button */}
            <div className="flex space-x-2">
              {message.trim() ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg"
                  >
                    <Send size={20} />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onMouseDown={toggleRecording}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                    }`}
                  >
                    {isRecording ? <Volume2 size={20} /> : <Mic size={20} />}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Message suggestions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {['👋 Hey!', '👍 Sure!', '😄 Sounds good!', '🤔 Let me think...'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setMessage(suggestion.split(' ').slice(1).join(' '))}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 text-blue-600 text-sm rounded-full transition-all duration-200 hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}