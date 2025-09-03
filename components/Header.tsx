
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-10 md:mb-16">
      <div className="inline-flex items-center gap-4">
        <SparklesIcon className="w-10 h-10 text-indigo-400" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          AI Prompt Improver
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Turn your raw app ideas into polished prompts, select features, and instantly generate stunning UI mockups.
      </p>
    </header>
  );
};

export default Header;
