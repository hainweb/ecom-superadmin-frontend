import React, { useState, useEffect } from 'react';
import { Sparkles, PenTool, Wand2, RefreshCw } from 'lucide-react';

const AdminEditingAnimation = ({handleCategoryClick}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [progress, setProgress] = useState(10);
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);


   // Progress update effect
   useEffect(() => {
    if (isEditing && progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 3, 100));
      }, 50);
      return () => clearInterval(timer); 
    }
  }, [isEditing, progress]);
 

  const NUM_PARTICLES = 1; // Total particles count

  // Generate particles with random properties across the full screen
  const generateParticles = (num) =>
    Array.from({ length: num }, (_, index) => ({
      id: index,
      left: Math.random() * 100, // random horizontal position (0% to 100%)
      top: Math.random() * 100,  // random vertical position (0% to 100%)
      delay:  10000000,  // random delay between 0s and 2s
    }));

  // Generate particles once for full-screen effect
  const particlesWhole = generateParticles(NUM_PARTICLES);

  // Regular floating particles effect (you may leave this as-is or remove if not needed)
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-1),
        {
          id: Date.now(),
          left: Math.random() * 100,
          delay: Math.random() * 5,
        },
      ]);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Confetti effect when progress completes
  useEffect(() => {
    if (progress === 100) {
      const confettiInterval = setInterval(() => {
        setConfetti((prev) => [
          ...prev.slice(-8),
          {
            id: Date.now(),
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 0.5,
          },
        ]);
      }, 500);

      // Clear confetti after 3 seconds
      const confettiTimeout = setTimeout(() => {
        clearInterval(confettiInterval);
        setConfetti([]);
      }, 3000);

      return () => {
        clearInterval(confettiInterval);
        clearTimeout(confettiTimeout);
      };
    }
  }, [progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Full-screen random particles */}
      <div className="absolute inset-0 animate-[pulse_5s_ease-in-out_infinite]">
        {particlesWhole.map((particle) => (
          <Sparkles
            key={particle.id}
            className="absolute w-4 h-4 text-yellow-400 animate-[pulse_2s_ease-in-out_infinite]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            
            }}
          />
        ))}
      </div>

      <div
        className={`
          relative max-w-md w-full bg-gray-800 rounded-lg p-6 shadow-2xl
          transform transition-all duration-500
          ${isEditing ? 'scale-105 ring-2 ring-blue-500 animate-[pulse_3s_ease-in-out_infinite]' : 'scale-100'}
        `}
      >
        {/* Magic Wand (Top Left) */}
        <div className="absolute -top-3 -left-3">
          <div className="bg-purple-500 rounded-full p-2 animate-[bounce_2s_ease-in-out_infinite]">
            <Wand2 className="w-5 h-5 text-white animate-[spin_4s_linear_infinite]" />
          </div>
        </div>

        {/* Pen Tool (Top Right) */}
        <div className="absolute -top-3 -right-3">
          <div className="bg-blue-500 rounded-full p-2 animate-[spin_3s_linear_infinite]">
            <PenTool className="w-5 h-5 text-white" />
          </div>
        </div>

       

        {/* Content Area */}
        <div className="text-white space-y-4 relative z-10">
          <h2 className="text-xl font-bold animate-[pulse_2s_ease-in-out_infinite]">
            Admin Is Editing 
          </h2>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status Text */}
          <div className="text-center text-sm text-blue-300 animate-[pulse_1.5s_ease-in-out_infinite]">
           Admin can edit user pages
          </div>

<div className="flex md:hidden space-x-4">
  <div className="flex-1">
    <button
      onClick={() => handleCategoryClick("categories")}
      className={"w-full text-left font-semibold py-3 px-5 rounded-xl transition-colors duration-200  bg-white text-indigo-800 shadow-lg"
          }
    >
      Categories
    </button>
  </div>
  <div className="flex-1">
    <button
      onClick={() => handleCategoryClick("slider")}
      className={"w-full text-left font-semibold py-3 px-5 rounded-xl transition-colors duration-200 bg-white text-indigo-800 shadow-lg "
        } 
    >
      Slider
    </button>
  </div>
</div>



          {/* Action Button */}
          <a href="https://ecommerce-king-cart.onrender.com">
          <button
           
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md 
              hover:from-blue-700 hover:to-purple-700 transition-transform transform hover:scale-105 duration-300
              animate-[pulse_2s_ease-in-out_infinite]"
          >
          Show Live page
          </button>
</a>
        </div>

        {/* Shimmer Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 
          animate-[shine_1.5s_linear_infinite]"
        />

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-1" />

        {/* Floating Particles (Optional additional effect) */}
        {particles.map((particle) => (
          <Sparkles
            key={particle.id}
            className="absolute w-4 h-4 text-yellow-400 animate-[float_2s_ease-in-out_infinite]"
            style={{
              left: `${particle.left}%`,
              bottom: '0%',
              animationDelay: `${particle.delay}s`,
              transform: 'translateY(-100%)',
            }}
          />
        ))}

        {/* Confetti Particles on Completion */}
        {confetti.map((item) => (
          <Sparkles
            key={item.id}
            className="absolute w-3 h-3 text-green-300 animate-[fall_2s_ease-in-out]"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminEditingAnimation;
