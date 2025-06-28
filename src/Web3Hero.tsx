import React from 'react';
import { motion } from 'framer-motion';

interface Web3HeroProps {
  size?: number;
}

const Web3Hero: React.FC<Web3HeroProps> = ({ size = 200 }) => {
  const scale = size / 200; // Base size is 200px
  
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      margin: '0 auto',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Main hexagon background */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          width: `${160 * scale}px`,
          height: `${160 * scale}px`,
          background: 'linear-gradient(45deg, #7f5af0, #2cb67d, #ff6b6b)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(127, 90, 240, 0.3)'
        }}
      >
        {/* Inner hexagon */}
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: `${120 * scale}px`,
            height: `${120 * scale}px`,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Web3 text */}
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              fontSize: `${24 * scale}px`,
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              textAlign: 'center',
              lineHeight: 1
            }}
          >
            {size >= 100 ? 'WEB3' : 'W3'}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles - only show for larger sizes */}
      {size >= 100 && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: `${8 * scale}px`,
            height: `${8 * scale}px`,
            background: ['#7f5af0', '#2cb67d', '#ff6b6b'][i % 3],
            borderRadius: '50%',
            boxShadow: '0 0 10px currentColor'
          }}
        />
      ))}

      {/* Blockchain nodes - only show for larger sizes */}
      {size >= 100 && [...Array(4)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: `${12 * scale}px`,
            height: `${12 * scale}px`,
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(127, 90, 240, 0.8)',
            top: `${(20 + (i * 40)) * scale}px`,
            left: `${(20 + (i * 40)) * scale}px`
          }}
        />
      ))}
    </div>
  );
};

export default Web3Hero; 