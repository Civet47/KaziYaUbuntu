import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const DebateCoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Hello! I'm Coach Jukwaa. I can help you brainstorm arguments, spot logical fallacies, or practice for your next tournament. What would you like to work on?" 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = () => {
    if (!chatSessionRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: "You are 'Coach Jukwaa', a friendly, encouraging, and wise debate coach for a non-profit organization called 'Jukwaa ni lako'. Your goal is to help students (often from under-resourced communities) improve their debate skills. You can help brainstorm arguments, explain logical fallacies, or simulate a debate round. Be concise, accessible, and motivating. Keep responses under 150 words usually.",
          },
        });
      } catch (e) {
        console.error("Failed to initialize AI", e);
      }
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      initChat();
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    
    // If chat session isn't ready (e.g. API key missing), try init again or alert
    if (!chatSessionRef.current) {
        initChat();
        if(!chatSessionRef.current) {
            setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server. Please check your configuration." }]);
            return;
        }
    }

    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessageStream({ message: userMsg });
      
      let fullResponse = "";
      // Add placeholder for streaming response
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of result) {
         const text = (chunk as GenerateContentResponse).text;
         if (text) {
             fullResponse += text;
             setMessages(prev => {
                 const newArr = [...prev];
                 const lastIndex = newArr.length - 1;
                 newArr[lastIndex] = { ...newArr[lastIndex], text: fullResponse };
                 return newArr;
             });
         }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting to my debate notes right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold ${isOpen ? 'bg-red-500 rotate-90' : 'bg-brand-gold text-brand-blue'}`}
        aria-label="Toggle Debate Coach"
      >
        {isOpen ? (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 left-6 z-50 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-left border border-gray-200 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="bg-brand-blue p-4 flex items-center space-x-3 shadow-md">
          <div className="bg-brand-gold p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
             <h3 className="font-bold text-white text-lg">Coach Jukwaa</h3>
             <p className="text-brand-gold text-xs">AI Powered Mentor</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-brand-light">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-brand-teal text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for an argument..."
              className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal pl-4"
              disabled={isLoading}
            />
            <button 
                type="submit" 
                disabled={isLoading || !inputText.trim()}
                className="bg-brand-blue text-white p-2 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DebateCoach;