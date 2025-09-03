
import React, { useState, useCallback } from 'react';
import { AppState, FeatureCategory, SelectedFeature } from './types';
import { improvePrompt, suggestFeatures, generateUiMockups } from './services/geminiService';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import FeatureSelector from './components/FeatureSelector';
import UIGallery from './components/UIGallery';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [initialPrompt, setInitialPrompt] = useState<string>('');
  const [improvedPrompt, setImprovedPrompt] = useState<string>('');
  const [featureCategories, setFeatureCategories] = useState<FeatureCategory[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<SelectedFeature[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleStartOver = () => {
    setAppState(AppState.INITIAL);
    setInitialPrompt('');
    setImprovedPrompt('');
    setFeatureCategories([]);
    setSelectedFeatures([]);
    setGeneratedImages([]);
    setLoadingMessage('');
    setErrorMessage('');
  };
  
  const handleError = (message: string) => {
    setAppState(AppState.ERROR);
    setErrorMessage(message);
  };

  const handleImprovePrompt = useCallback(async (prompt: string) => {
    setInitialPrompt(prompt);
    setAppState(AppState.IMPROVING_PROMPT);
    setLoadingMessage('Distilling your idea into a perfect prompt...');
    try {
      const newImprovedPrompt = await improvePrompt(prompt);
      setImprovedPrompt(newImprovedPrompt);
      setAppState(AppState.SUGGESTING_FEATURES);
      setLoadingMessage('Brainstorming potential app features...');
      const features = await suggestFeatures(newImprovedPrompt);
      setFeatureCategories(features);
      // Set default selections
      const defaultSelections = features.map(cat => ({
        category: cat.category,
        selectedOption: cat.options[0].name,
      }));
      setSelectedFeatures(defaultSelections);
      setAppState(AppState.FEATURES_READY);
    } catch (error) {
      console.error(error);
      handleError('Sorry, I had trouble improving the prompt. Please try again.');
    }
  }, []);

  const handleFeatureChange = (category: string, selectedOption: string) => {
    setSelectedFeatures(prev =>
      prev.map(sf =>
        sf.category === category ? { ...sf, selectedOption } : sf
      )
    );
  };

  const handleGenerateUI = async () => {
    setAppState(AppState.GENERATING_UI);
    setLoadingMessage('Generating UI mockups... This can take a minute.');
    try {
      const images = await generateUiMockups(improvedPrompt, selectedFeatures);
      setGeneratedImages(images);
      setAppState(AppState.UI_READY);
    } catch (error) {
      console.error(error);
      handleError('An error occurred while generating the UI mockups. Please check your configuration and try again.');
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.INITIAL:
        return <PromptInput onImprovePrompt={handleImprovePrompt} />;
      case AppState.IMPROVING_PROMPT:
      case AppState.SUGGESTING_FEATURES:
      case AppState.GENERATING_UI:
        return <Loader message={loadingMessage} />;
      case AppState.FEATURES_READY:
        return (
          <>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8 w-full max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-indigo-400">
                <SparklesIcon />
                Improved Prompt
              </h2>
              <p className="text-slate-300 leading-relaxed">{improvedPrompt}</p>
            </div>
            <FeatureSelector 
              categories={featureCategories} 
              selectedFeatures={selectedFeatures}
              onFeatureChange={handleFeatureChange}
            />
            <button 
              onClick={handleGenerateUI}
              className="mt-8 px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-all text-lg shadow-lg shadow-indigo-600/30"
            >
              Proceed to Generation
            </button>
          </>
        );
      case AppState.UI_READY:
        return (
          <div className="w-full max-w-6xl mx-auto">
             <UIGallery images={generatedImages} prompt={improvedPrompt} />
             <button 
                onClick={handleStartOver}
                className="mt-12 px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all"
             >
                Start Over
             </button>
          </div>
        );
      case AppState.ERROR:
        return (
          <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
            <h2 className="text-2xl font-bold text-red-400 mb-4">An Error Occurred</h2>
            <p className="text-red-300 mb-6">{errorMessage}</p>
            <button 
              onClick={handleStartOver}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-all"
            >
              Start Over
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        <Header />
        {renderContent()}
      </main>
    </div>
  );
}
