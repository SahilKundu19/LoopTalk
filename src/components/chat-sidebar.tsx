import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
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
  MoreHorizontal
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatSidebarProps {
  selectedChat: number;
  setSelectedChat: (chatId: number) => void;
}

const navigationItems = [
  { icon: Home, id: 'home', active: false },
  { icon: MessageCircle, id: 'messages', active: true },
  { icon: Bell, id: 'notifications', active: false },
  { icon: Settings, id: 'settings', active: false },
];

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

export function ChatSidebar({ selectedChat, setSelectedChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Navigation Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-20 bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 flex flex-col items-center py-6 shadow-2xl"
      >
        {/* Profile Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="mb-8 relative"
        >
          <Avatar className="w-12 h-12 ring-4 ring-white/20">
            <AvatarImage src="https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150" />
            <AvatarFallback className="bg-purple-300 text-purple-800">ME</AvatarFallback>
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
              className={`p-3 rounded-2xl transition-all duration-300 relative ${
                item.active 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={24} />
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
            <span className="text-purple-600 text-xs font-bold">T</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Chat List */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-80 bg-gray-50 flex flex-col h-full"
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
              className="pl-10 bg-gray-100 border-0 rounded-xl h-12 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Groups Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Groups</h3>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-purple-100">
                <Plus size={16} className="text-purple-600" />
              </Button>
            </div>

            <div className="space-y-2">
              <AnimatePresence>
                {filteredGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    onClick={() => setSelectedChat(group.id)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedChat === group.id
                        ? 'bg-purple-100 shadow-md'
                        : 'bg-white hover:bg-gray-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={group.avatar} />
                          <AvatarFallback>{group.name[0]}</AvatarFallback>
                        </Avatar>
                        {group.online && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 truncate">{group.name}</h4>
                          <span className="text-xs text-gray-500">{group.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{group.lastMessage}</p>
                      </div>

                      {group.unread > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          {group.unread}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* People Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">People</h3>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-purple-100">
                <Users size={16} className="text-purple-600" />
              </Button>
            </div>

            <div className="space-y-2">
              <AnimatePresence>
                {filteredPeople.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    onClick={() => setSelectedChat(person.id)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedChat === person.id
                        ? 'bg-purple-100 shadow-md'
                        : 'bg-white hover:bg-gray-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        {person.online && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900 truncate">{person.name}</h4>
                            {person.verified && (
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                              >
                                <span className="text-white text-xs">✓</span>
                              </motion.div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{person.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{person.status}</p>
                      </div>

                      {person.unread > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          {person.unread}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}