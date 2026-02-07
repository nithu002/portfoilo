import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="border-t border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="relative flex items-end gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 focus-within:border-blue-500/50 transition-colors">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
          <Paperclip size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 max-h-32 bg-transparent py-2.5 text-sm text-white focus:outline-none resize-none scrollbar-none disabled:opacity-50"
        />

        <div className="flex items-center gap-1">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors hidden sm:flex">
            <Mic size={20} />
          </button>
          <button 
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              text.trim() && !disabled 
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'text-zinc-600'
            }`}
          >
            <Send size={20} className={text.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
