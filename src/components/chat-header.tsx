import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  Phone, 
  Video, 
  MoreHorizontal, 
  Search,
  Info,
  Archive,
  VolumeX,
  Star,
  Trash2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ChatHeaderProps {
  selectedChat: number;
}

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

export function ChatHeader({ selectedChat }: ChatHeaderProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const currentChat = chatData[selectedChat as keyof typeof chatData] || chatData[4];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white border-b border-gray-100 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        {/* Left Side - Avatar and Info */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Avatar className="w-12 h-12 ring-2 ring-purple-100">
              <AvatarImage src={currentChat.avatar} />
              <AvatarFallback className="bg-purple-100 text-purple-700">
                {currentChat.name[0]}
              </AvatarFallback>
            </Avatar>
            
            {currentChat.online && (
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
              className="font-semibold text-gray-900 text-xl"
            >
              {currentChat.name}
            </motion.h2>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2"
            >
              {currentChat.typing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-1 text-purple-600"
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
                  <span className="text-sm">typing...</span>
                </motion.div>
              ) : (
                <p className="text-sm text-gray-500">{currentChat.status}</p>
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
                  : 'hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <Phone size={20} />
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
                  : 'hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <Video size={20} />
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
                  className="p-3 rounded-full hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
                >
                  <MoreHorizontal size={20} />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white/95 backdrop-blur-sm border shadow-lg"
            >
              <DropdownMenuItem className="hover:bg-purple-50 transition-colors duration-200">
                <Search size={16} className="mr-2" />
                Search in conversation
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-50 transition-colors duration-200">
                <Info size={16} className="mr-2" />
                Conversation info
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-50 transition-colors duration-200">
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
            className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100"
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
  );
}