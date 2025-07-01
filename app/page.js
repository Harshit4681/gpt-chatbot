'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Chatbot</h1>

      <div className="flex-1 w-full max-w-2xl overflow-y-auto bg-white p-4 rounded shadow">
        {messages.map((m, i) => (
          <div key={i} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <p className={`inline-block p-2 rounded-md ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              {m.content}
            </p>
          </div>
        ))}
        <div ref={chatRef} />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-4 flex gap-2">
        <input
          className="flex-1 p-3 border border-gray-300 rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </main>
  );
}
