
import React from 'react';
import type { FeatureCategory, SelectedFeature } from '../types';

interface FeatureSelectorProps {
  categories: FeatureCategory[];
  selectedFeatures: SelectedFeature[];
  onFeatureChange: (category: string, selectedOption: string) => void;
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({ categories, selectedFeatures, onFeatureChange }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Customize Your App's Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div key={cat.category} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="font-bold text-lg text-cyan-400">{cat.category}</h3>
            <p className="text-slate-400 text-sm mb-4">{cat.description}</p>
            <div className="space-y-3">
              {cat.options.map((option) => {
                const isSelected = selectedFeatures.find(f => f.category === cat.category)?.selectedOption === option.name;
                return (
                  <label key={option.name} className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? 'bg-indigo-600/30 border-indigo-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}>
                    <input 
                      type="radio" 
                      name={cat.category} 
                      value={option.name}
                      checked={isSelected}
                      onChange={() => onFeatureChange(cat.category, option.name)}
                      className="hidden"
                    />
                    <div className="font-semibold text-slate-100">{option.name}</div>
                    <div className="text-sm text-slate-400">{option.description}</div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSelector;
