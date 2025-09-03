
import React from 'react';
import { ImageIcon } from './icons/ImageIcon';

interface UIGalleryProps {
  images: string[];
  prompt: string;
}

const screenTitles = [
    "Splash Screen",
    "Login Screen",
    "Home / Dashboard",
    "Main Feature Screen",
    "Settings Screen"
];


const UIGallery: React.FC<UIGalleryProps> = ({ images, prompt }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
            <ImageIcon />
            Generated UI Mockups
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto">
            Based on your prompt: <span className="font-medium text-slate-300">"{prompt}"</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {images.map((base64Image, index) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex flex-col items-center gap-3 transform hover:scale-105 transition-transform duration-300">
             <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
                <img
                    src={`data:image/png;base64,${base64Image}`}
                    alt={`Generated UI for screen ${index + 1}`}
                    className="w-full h-full object-cover"
                />
             </div>
             <h3 className="font-semibold text-slate-300">{screenTitles[index] || `Screen ${index + 1}`}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UIGallery;
