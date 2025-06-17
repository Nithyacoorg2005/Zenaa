import React, { createContext, useContext, useState } from 'react';
import { analyzeEmotion } from '../utils/emotionAnalysis';

interface EmotionState {
  currentEmotion: string;
  emotionScore: number;
  colorTheme: string;
  textAnalysis: string;
}

interface EmotionContextType {
  emotionState: EmotionState;
  analyzeText: (text: string) => void;
  resetEmotion: () => void;
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

const defaultEmotion: EmotionState = {
  currentEmotion: 'neutral',
  emotionScore: 0,
  colorTheme: 'blue',
  textAnalysis: ''
};

export function EmotionProvider({ children }: { children: React.ReactNode }) {
  const [emotionState, setEmotionState] = useState<EmotionState>(defaultEmotion);

  const analyzeText = (text: string) => {
    if (!text.trim()) return;
    
    const analysis = analyzeEmotion(text);
    setEmotionState(analysis);
    
    // Apply emotion-based styling to document
    document.documentElement.style.setProperty('--emotion-primary', getEmotionColor(analysis.colorTheme));
  };

  const resetEmotion = () => {
    setEmotionState(defaultEmotion);
    document.documentElement.style.removeProperty('--emotion-primary');
  };

  const getEmotionColor = (theme: string) => {
    const colors = {
      blue: '#3B82F6',
      green: '#10B981',
      purple: '#8B5CF6',
      orange: '#F59E0B',
      red: '#EF4444',
      pink: '#EC4899',
      teal: '#14B8A6'
    };
    return colors[theme as keyof typeof colors] || colors.blue;
  };

  return (
    <EmotionContext.Provider value={{ emotionState, analyzeText, resetEmotion }}>
      {children}
    </EmotionContext.Provider>
  );
}

export function useEmotion() {
  const context = useContext(EmotionContext);
  if (context === undefined) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
}