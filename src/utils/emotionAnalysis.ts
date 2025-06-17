interface EmotionAnalysis {
  currentEmotion: string;
  emotionScore: number;
  colorTheme: string;
  textAnalysis: string;
}

const emotionKeywords = {
  happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love', 'celebration', 'success'],
  sad: ['sad', 'upset', 'depressed', 'down', 'crying', 'heartbroken', 'loss', 'grief', 'disappointed'],
  angry: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'rage', 'hate', 'irritated', 'outraged'],
  stressed: ['stressed', 'anxiety', 'worried', 'panic', 'overwhelmed', 'pressure', 'tension', 'burden'],
  excited: ['excited', 'thrilled', 'enthusiasm', 'energetic', 'pumped', 'eager', 'anticipation'],
  fearful: ['scared', 'afraid', 'fear', 'terrified', 'nervous', 'anxious', 'worried', 'panic'],
  confused: ['confused', 'lost', 'unclear', 'puzzled', 'uncertain', 'perplexed', 'bewildered']
};

const emotionColors = {
  happy: 'green',
  sad: 'blue',
  angry: 'red',
  stressed: 'orange',
  excited: 'purple',
  fearful: 'teal',
  confused: 'pink',
  neutral: 'blue'
};

export function analyzeEmotion(text: string): EmotionAnalysis {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  const emotionScores: { [key: string]: number } = {};
  
  // Calculate emotion scores based on keyword matches
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    const matches = keywords.filter(keyword => 
      words.some(word => word.includes(keyword))
    ).length;
    emotionScores[emotion] = matches;
  });
  
  // Find the dominant emotion
  const dominantEmotion = Object.entries(emotionScores)
    .reduce((a, b) => emotionScores[a[0]] > emotionScores[b[0]] ? a : b)[0];
  
  const maxScore = emotionScores[dominantEmotion];
  
  // If no strong emotion detected, default to neutral
  const currentEmotion = maxScore > 0 ? dominantEmotion : 'neutral';
  
  // Additional sentiment analysis based on punctuation and text patterns
  let sentimentBoost = 0;
  if (text.includes('!') || text.includes('!!')) sentimentBoost += 0.2;
  if (text.includes('?') && text.includes('help')) sentimentBoost += 0.1;
  if (text.length > 100) sentimentBoost += 0.1; // Longer texts often indicate stronger emotions
  
  const emotionScore = Math.min((maxScore + sentimentBoost) * 0.3, 1);
  
  return {
    currentEmotion,
    emotionScore,
    colorTheme: emotionColors[currentEmotion as keyof typeof emotionColors] || emotionColors.neutral,
    textAnalysis: text
  };
}

export function getEmotionBasedResponse(emotion: string): string {
  const responses = {
    happy: "I'm glad you're feeling positive! How can I help you maintain this great mood?",
    sad: "I understand you might be going through a tough time. I'm here to support you.",
    angry: "I can sense your frustration. Let me help you find a solution to what's bothering you.",
    stressed: "It sounds like you're under pressure. Let's work together to manage this stress.",
    excited: "Your enthusiasm is wonderful! How can I help you channel this energy?",
    fearful: "I understand you might be feeling anxious. I'm here to provide support and guidance.",
    confused: "It's okay to feel uncertain. Let me help clarify things for you.",
    neutral: "I'm here to help you with whatever you need today."
  };
  
  return responses[emotion as keyof typeof responses] || responses.neutral;
}