import React, { useState, useEffect, useCallback } from 'react';
import ChatButton from './ChatWidget/ChatButton';
import ChatWindow from './ChatWidget/ChatWindow';
import ChatHeader from './ChatWidget/ChatHeader';
import MessageList from './ChatWidget/MessageList';
import ChatInput from './ChatWidget/ChatInput';
import QuickReplies from './ChatWidget/QuickReplies';
import MeetingTypeSelector from './Scheduling/MeetingTypeSelector';
import type { MeetingType } from './Scheduling/MeetingTypeSelector';
import CalendarPicker from './Scheduling/CalendarPicker';
import TimeSlotGrid from './Scheduling/TimeSlotGrid';
import VisitorInfoForm from './Scheduling/VisitorInfoForm';
import ConfirmationCard from './Scheduling/ConfirmationCard';
import ProactiveTooltip from './ChatWidget/ProactiveTooltip';
import type { Message, QuickReply } from './types';

const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { label: "View Projects", action: "view_projects" },
  { label: "Schedule Meeting", action: "schedule_meeting" },
  { label: "Chat on WhatsApp", action: "whatsapp" },
  { label: "Download Resume", action: "download_resume" },
  { label: "Technical Questions", action: "tech_questions" },
  { label: "Get in Touch", action: "contact" },
];

type FlowStep = 'chat' | 'meeting_type' | 'calendar' | 'timeslot' | 'info' | 'confirmation';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(INITIAL_QUICK_REPLIES);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentStep, setCurrentStep] = useState<FlowStep>('chat');
  const [firedTriggers, setFiredTriggers] = useState<Set<string>>(new Set());
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // Scheduling State
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const addMessage = useCallback((text: string, sender: 'user' | 'ai', isProactive = false) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender,
      timestamp: new Date(),
      isProactive
    };
    
    setMessages((prev) => {
      // If adding a proactive message, remove previous ones to keep chat clean
      if (isProactive) {
        return [...prev.filter(m => !m.isProactive), newMessage];
      }
      return [...prev, newMessage];
    });

    if (!isOpen && sender === 'ai') {
      setUnreadCount((prev) => prev + 1);
      setActiveTooltip(text);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    addMessage(text, 'user');
    setIsTyping(true);
    setQuickReplies([]);

    // Simulate AI response
    setTimeout(() => {
      let response = "I'm processing that for you...";
      let newReplies: QuickReply[] = INITIAL_QUICK_REPLIES;

      const lowerText = text.toLowerCase();
      if (lowerText.includes('project')) {
        response = "I've worked on some exciting projects recently! Would you like to see my E-commerce Platform or the SaaS Dashboard?";
        newReplies = [
          { label: "E-commerce Platform", action: "project_ecommerce" },
          { label: "SaaS Dashboard", action: "project_saas" },
          { label: "Back to menu", action: "reset" }
        ];
      } else if (lowerText.includes('meeting') || lowerText.includes('schedule')) {
        response = "I'd be happy to help you schedule a meeting! Please select the type of meeting you'd like to book:";
        setCurrentStep('meeting_type');
        newReplies = [];
      } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
        response = "Hello! 👋 I'm the AI assistant for your portfolio. How can I help you explore my work today?";
      } else if (lowerText.includes('whatsapp') || lowerText.includes('chat')) {
        response = "Opening WhatsApp for you! Let's chat directly there.";
        setTimeout(() => {
          window.open('https://wa.me/94779455812?text=Hi!%20I%27m%20interested%20in%20discussing%20a%20project%20from%20your%20portfolio.', '_blank');
        }, 1000);
      } else if (lowerText.includes('resume') || lowerText.includes('download')) {
        response = "Sure! You can download my latest resume here. It includes a detailed overview of my experience and technical stack.";
        setTimeout(() => {
          window.open('/resume.pdf', '_blank');
        }, 1000);
      } else if (lowerText.includes('background') || lowerText.includes('experience')) {
        response = "I have over 10 years of experience in full-stack development. I've worked with various teams to build scalable solutions. Would you like to see my specific roles?";
      }

      setIsTyping(false);
      addMessage(response, 'ai');
      setQuickReplies(newReplies);
    }, 1500);
  };

  const handleQuickReply = (reply: QuickReply) => {
    if (reply.action === 'download_resume') {
      handleSendMessage("I'd like to download your resume");
    } else if (reply.action === 'whatsapp') {
      handleSendMessage("I'd like to chat on WhatsApp");
    } else {
      handleSendMessage(reply.label);
    }
  };

  // Trigger: After 10 seconds on page
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!firedTriggers.has('welcome')) {
        addMessage("Hi! 👋 Need help finding something?", 'ai', true);
        setFiredTriggers(prev => new Set(prev).add('welcome'));
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [addMessage, firedTriggers]);

  // Section Observer Helper
  useEffect(() => {
    const sections = [
      { id: 'about', msg: "Want to know more about my background? I can share my journey!", trigger: 'about' },
      { id: 'skills', msg: "Impressive stack, right? I'm always learning new technologies!", trigger: 'skills' },
      { id: 'experience', msg: "I've worked with some great teams. Want to discuss my roles in detail?", trigger: 'experience' },
      { id: 'projects', msg: "Interested in any projects? I can share details!", trigger: 'projects' },
      { id: 'education', msg: "Lifelong learning is my motto. Interested in my academic background?", trigger: 'education' },
      { id: 'testimonials', msg: "Don't just take my word for it! See what others say about my work.", trigger: 'testimonials' },
      { id: 'contact', msg: "Ready to start something amazing? Let's talk!", trigger: 'contact' }
    ];

    const observers: IntersectionObserver[] = [];

    sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && !firedTriggers.has(section.trigger)) {
            setTimeout(() => {
              addMessage(section.msg, 'ai', true);
              setFiredTriggers(prev => new Set(prev).add(section.trigger));
            }, 1000);
          }
        }, { threshold: 0.6 });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach(o => o.disconnect());
  }, [addMessage, firedTriggers]);

  // Trigger: Before leaving page (Exit Intent)
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !firedTriggers.has('exit')) {
        addMessage("Before you go, would you like to schedule a quick chat?", 'ai', true);
        setFiredTriggers(prev => new Set(prev).add('exit'));
      }
    };

    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, [addMessage, firedTriggers]);

  // Trigger: After 3 minutes idle
  useEffect(() => {
    let idleTimer: any;
    
    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!firedTriggers.has('idle') && !isOpen) {
          addMessage("Still here? Let me know if you have questions!", 'ai', true);
          setFiredTriggers(prev => new Set(prev).add('idle'));
        }
      }, 180000); // 3 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [addMessage, firedTriggers, isOpen]);

  // Scheduling Handlers
  const handleMeetingTypeSelect = (type: MeetingType) => {
    setSelectedMeetingType(type);
    setCurrentStep('calendar');
    addMessage(`I'll book a ${type.title}. When would you like to meet?`, 'ai');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep('timeslot');
    addMessage(`Great! ${date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} sounds good. What time works best?`, 'ai');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep('info');
    addMessage(`Almost done! I just need a few details to send the invite.`, 'ai');
  };

  const handleInfoSubmit = (info: any) => {
    setBookingDetails({
      type: selectedMeetingType?.title,
      date: selectedDate,
      time: selectedTime,
      email: info.email
    });
    setCurrentStep('confirmation');
  };

  return (
    <>
      <ProactiveTooltip 
        message={activeTooltip || ''} 
        isVisible={!!activeTooltip && !isOpen} 
        onClose={() => setActiveTooltip(null)}
      />
      <ChatButton 
        isOpen={isOpen} 
        onClick={() => {
          setIsOpen(!isOpen);
          setUnreadCount(0);
          setActiveTooltip(null);
        }} 
        unreadCount={unreadCount}
      />
      <ChatWindow isOpen={isOpen}>
        <ChatHeader 
          onClose={() => setIsOpen(false)} 
          onMinimize={() => setIsOpen(false)}
        />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {currentStep === 'chat' && (
            <>
              <MessageList messages={messages} isTyping={isTyping} />
              <div className="mt-auto">
                <QuickReplies replies={quickReplies} onReplyClick={handleQuickReply} />
                <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
              </div>
            </>
          )}

          {currentStep === 'meeting_type' && (
            <div className="flex-1 flex flex-col pt-4">
              <h4 className="px-4 text-xs font-bold text-zinc-500 uppercase mb-2">Select Meeting Type</h4>
              <MeetingTypeSelector onSelect={handleMeetingTypeSelect} />
              <button 
                onClick={() => setCurrentStep('chat')}
                className="mt-auto p-4 text-sm text-zinc-500 hover:text-white transition-colors border-t border-white/10"
              >
                Cancel and Chat
              </button>
            </div>
          )}

          {currentStep === 'calendar' && (
            <div className="flex-1 flex flex-col pt-4 overflow-y-auto">
              <h4 className="px-4 text-xs font-bold text-zinc-500 uppercase mb-2">Select Date</h4>
              <CalendarPicker onDateSelect={handleDateSelect} />
              <button 
                onClick={() => setCurrentStep('meeting_type')}
                className="mt-auto p-4 text-sm text-zinc-500 hover:text-white transition-colors border-t border-white/10"
              >
                Go Back
              </button>
            </div>
          )}

          {currentStep === 'timeslot' && (
            <div className="flex-1 flex flex-col pt-4 overflow-y-auto">
              <h4 className="px-4 text-xs font-bold text-zinc-500 uppercase mb-2">Select Time</h4>
              <TimeSlotGrid onSelect={handleTimeSelect} selectedTime={selectedTime} />
              <button 
                onClick={() => setCurrentStep('calendar')}
                className="mt-auto p-4 text-sm text-zinc-500 hover:text-white transition-colors border-t border-white/10"
              >
                Go Back
              </button>
            </div>
          )}

          {currentStep === 'info' && (
            <div className="flex-1 flex flex-col pt-4 overflow-y-auto">
              <h4 className="px-4 text-xs font-bold text-zinc-500 uppercase mb-2">Your Information</h4>
              <VisitorInfoForm onSubmit={handleInfoSubmit} />
              <button 
                onClick={() => setCurrentStep('timeslot')}
                className="mt-auto p-4 text-sm text-zinc-500 hover:text-white transition-colors border-t border-white/10"
              >
                Go Back
              </button>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <ConfirmationCard 
                details={bookingDetails} 
                onClose={() => {
                  setCurrentStep('chat');
                  addMessage("Your meeting has been confirmed! Anything else I can help with?", 'ai');
                }} 
              />
            </div>
          )}
        </div>
      </ChatWindow>
    </>
  );
};

export default ChatAssistant;
