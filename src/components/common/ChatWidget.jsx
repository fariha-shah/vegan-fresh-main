//Taimoor About, contact, blog pages
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Leaf, Bot, User } from 'lucide-react';

const INITIAL_MESSAGE = {
  from: 'ai',
  text: 'Hello! 🌱 I am Vegan Fresh AI. Ask me anything about vegetables, recipes, storage tips or delivery!',
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are Vegan Fresh AI Assistant. Only answer questions about vegetables, recipes, storage tips, organic farming and delivery. Keep answers short, friendly and helpful. User asked: ${input}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const aiReply =
        data.content?.[0]?.text ||
        'Sorry, I could not understand that. Please try again!';
      setMessages((prev) => [...prev, { from: 'ai', text: aiReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: 'Sorry! Something went wrong. Please try again.' },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-card shadow-2xl w-[340px] mb-4 flex flex-col overflow-hidden border border-green-pale">
          {/* Header */}
          <div
            className="px-4 py-3.5 flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #1e7a2e 0%, #2e9e3e 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <div>
                <p className="font-poppins font-bold text-white text-[14px]">
                  Vegan Fresh AI
                </p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-light animate-pulse" />
                  <p className="text-white/80 text-[11px] font-inter">
                    Online — Always here to help!
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 p-4 h-72 overflow-y-auto bg-bg-light">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI avatar */}
                {msg.from === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-green-primary flex items-center justify-center shrink-0 mb-0.5">
                    <Bot size={14} className="text-white" />
                  </div>
                )}

                <div
                  className={`px-4 py-2.5 rounded-2xl text-[13px] font-inter max-w-[230px] leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-green-primary text-white rounded-br-none'
                      : 'bg-white text-text-dark shadow-card rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* User avatar */}
                {msg.from === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mb-0.5">
                    <User size={14} className="text-gray-500" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-green-primary flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white shadow-card rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full bg-green-primary animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-green-primary animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-green-primary animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-green-pale bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about vegetables..."
              className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-[13px] font-inter outline-none focus:border-green-primary transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-10 h-10 bg-green-primary hover:bg-green-dark text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full text-white shadow-hover flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #1e7a2e 0%, #2e9e3e 100%)',
        }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
