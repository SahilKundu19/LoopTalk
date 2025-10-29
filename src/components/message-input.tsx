import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Smile, 
  Image as ImageIcon,
  File,
  Camera,
  MapPin,
  Gift,
  Plus,
  X,
  Volume2,
  Square
} from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const emojiCategories = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋'],
  'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'],
  'Gestures': ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐', '✋', '🖖', '👏']
};

const attachmentOptions = [
  { icon: ImageIcon, label: 'Photos', color: 'text-pink-500 bg-pink-100' },
  { icon: File, label: 'Document', color: 'text-blue-500 bg-blue-100' },
  { icon: Camera, label: 'Camera', color: 'text-purple-500 bg-purple-100' },
  { icon: MapPin, label: 'Location', color: 'text-green-500 bg-green-100' },
  { icon: Gift, label: 'Gift', color: 'text-orange-500 bg-orange-100' },
];

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAttachments, setShowAttachments] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout>();

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

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
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
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-gray-100 bg-white/80 backdrop-blur-sm p-4"
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
        isFocused ? 'bg-white rounded-2xl p-3 shadow-lg border-2 border-purple-200' : ''
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
                ? 'bg-purple-100 text-purple-600 rotate-45' 
                : 'hover:bg-purple-50 hover:text-purple-600'
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
                    className="p-2 hover:bg-purple-50 hover:text-purple-600 rounded-full"
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
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg"
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
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-600'
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
  );
}