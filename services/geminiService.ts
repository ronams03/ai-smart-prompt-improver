
import { GoogleGenAI, Type } from "@google/genai";
import type { FeatureCategory, SelectedFeature } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function improvePrompt(prompt: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  const fullPrompt = `You are a world-class prompt engineer for an AI image generation model that creates UI/UX mockups. Your task is to refine a user's raw idea into a detailed, clear, and effective prompt. The refined prompt should be a concise, one-paragraph description of a mobile application, focusing on its core purpose and user experience.

Original idea: "${prompt}"

Refined Prompt:`;

  const response = await ai.models.generateContent({
    model,
    contents: fullPrompt,
    config: { temperature: 0.3 }
  });

  return response.text.trim();
}

const featuresSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            category: {
                type: Type.STRING,
                description: 'A high-level feature category, e.g., "User Authentication" or "Dashboard".'
            },
            description: {
                type: Type.STRING,
                description: 'A brief, user-facing description of the feature category.'
            },
            options: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: {
                            type: Type.STRING,
                            description: 'A specific, concise choice for the feature. e.g., "Email & Password Login".'
                        },
                        description: {
                            type: Type.STRING,
                            description: 'A brief explanation of what this specific option entails.'
                        }
                    },
                    required: ["name", "description"]
                },
                description: 'A list of 2 to 4 mutually exclusive options for this feature category.'
            }
        },
        required: ["category", "description", "options"]
    }
};

export async function suggestFeatures(improvedPrompt: string): Promise<FeatureCategory[]> {
  const model = 'gemini-2.5-flash';
  const prompt = `Based on the following mobile app description, generate a list of key, customizable features. For each feature, provide a category, a description, and 2-4 mutually exclusive options with their own names and descriptions. Ensure the options are distinct and meaningful choices for a user.

App Description: "${improvedPrompt}"`;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
        responseMimeType: 'application/json',
        responseSchema: featuresSchema,
    }
  });

  const jsonText = response.text;
  try {
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as FeatureCategory[];
  } catch (e) {
    console.error("Failed to parse features JSON:", jsonText);
    throw new Error("The AI returned an invalid feature format.");
  }
}

const getScreenGenerationPrompts = (basePrompt: string, features: SelectedFeature[]): {name: string, prompt: string}[] => {
    const featureSummary = features.map(f => `${f.category}: ${f.selectedOption}`).join(', ');

    const screenPrompts = [
        {
            name: 'Splash Screen',
            prompt: `UI/UX design of a mobile app splash screen. App concept: ${basePrompt}. Features: ${featureSummary}. Visual style: modern, clean, minimalist, high fidelity, figma mockup, vibrant branding.`
        }
    ];

    if (features.some(f => f.category.toLowerCase().includes('authentication') && !f.selectedOption.toLowerCase().includes('no login'))) {
        screenPrompts.push({
            name: 'Login Screen',
            prompt: `UI/UX design of a mobile app login screen. App concept: ${basePrompt}. Authentication method: ${features.find(f => f.category.toLowerCase().includes('authentication'))?.selectedOption}. Features: ${featureSummary}. Visual style: modern, clean, minimalist, high fidelity, figma mockup, secure, intuitive.`
        });
    }
    
    screenPrompts.push({
        name: 'Home/Dashboard',
        prompt: `UI/UX design of the main home/dashboard screen for a mobile app. App concept: ${basePrompt}. Key features visible: ${featureSummary}. Visual style: modern, clean, data-centric, minimalist, high fidelity, figma mockup, user-friendly.`
    });
    
     screenPrompts.push({
        name: 'Main Feature Screen',
        prompt: `UI/UX design of the primary feature screen for a mobile app. App concept: ${basePrompt}. This screen showcases the core functionality related to ${featureSummary}. Visual style: modern, clean, task-oriented, minimalist, high fidelity, figma mockup, efficient workflow.`
    });

    screenPrompts.push({
        name: 'Settings Screen',
        prompt: `UI/UX design of a settings screen for a mobile app. App concept: ${basePrompt}. Features included: ${featureSummary}. Options should include profile management, notifications, and help/support. Visual style: modern, clean, organized, minimalist, high fidelity, figma mockup, clear and accessible.`
    });

    return screenPrompts;
};

export async function generateUiMockups(improvedPrompt: string, selectedFeatures: SelectedFeature[]): Promise<string[]> {
    const model = 'imagen-4.0-generate-001';
    const screenPrompts = getScreenGenerationPrompts(improvedPrompt, selectedFeatures);

    const imageGenerationPromises = screenPrompts.map(screen =>
        ai.models.generateImages({
            model: model,
            prompt: screen.prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: "9:16", // mobile aspect ratio
                outputMimeType: "image/png",
            }
        })
    );

    const responses = await Promise.all(imageGenerationPromises);

    const base64Images = responses.map(res => {
        if (res.generatedImages && res.generatedImages.length > 0) {
            return res.generatedImages[0].image.imageBytes;
        }
        throw new Error('Image generation failed for one of the screens.');
    });

    return base64Images;
}
