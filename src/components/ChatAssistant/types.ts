export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  intent?: string;
  type?: 'text' | 'scheduling' | 'projects' | 'contact';
  isProactive?: boolean;
}

export interface QuickReply {
  label: string;
  action: string;
}

export type ChatState = 'idle' | 'chatting' | 'scheduling';
