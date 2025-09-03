
import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  onImprovePrompt: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onImprovePrompt }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onImprovePrompt(prompt.trim());
    }
  };

  const placeholders = [
    "a mobile app for student attendance management",
    "an app for tracking personal fitness goals",
    "a recipe sharing platform for home cooks",
    "a tool for managing team project tasks",
    "a language learning app with flashcards",
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col items-center gap-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`e.g., ${placeholders[Math.floor(Math.random() * placeholders.length)]}`}
        className="w-full h-32 p-4 bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-200 placeholder-slate-500 resize-none"
        aria-label="Your app idea"
      />
      <button 
        type="submit" 
        disabled={!prompt.trim()}
        className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-all text-lg shadow-lg shadow-indigo-600/30 disabled:shadow-none"
      >
        <SparklesIcon />
        Improve My Prompt
      </button>
    </form>
  );
};

export default PromptInput;
