import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isActive: boolean;
}

export default function VoiceWaveform({ isActive }: VoiceWaveformProps) {
  const bars = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div className="flex items-center justify-center space-x-1 h-16">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-gradient-to-t from-purple-500 to-blue-600 rounded-full"
          animate={{
            height: isActive ? [8, 32, 16, 24, 12, 40, 8] : 8,
          }}
          transition={{
            duration: 0.8,
            repeat: isActive ? Infinity : 0,
            delay: bar * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}