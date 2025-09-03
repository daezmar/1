import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  pendingTasks: Task[];
}

const Carousel: React.FC<CarouselProps> = ({ pendingTasks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (currentIndex >= pendingTasks.length && pendingTasks.length > 0) {
      setCurrentIndex(pendingTasks.length - 1);
    } else if (pendingTasks.length === 0) {
      setCurrentIndex(0);
    }
  }, [pendingTasks, currentIndex]);

  const goToPrevious = () => {
    setDirection(-1);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? pendingTasks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    setDirection(1);
    const isLastSlide = currentIndex === pendingTasks.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const hasTasks = pendingTasks.length > 0;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center p-4 overflow-hidden">
      {hasTasks && (
         <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPrevious} 
          className="absolute left-2 z-10 p-2 bg-gray-700/50 hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasTasks}
          aria-label="Tarea anterior"
       >
         <ChevronLeftIcon />
       </motion.button>
      )}

      <div className="w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          {hasTasks ? (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full flex-shrink-0 flex flex-col items-center justify-center text-center px-8"
            >
              <p className="text-lg sm:text-xl font-medium text-teal-300">
                {pendingTasks[currentIndex].text}
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-gray-400">
              <p className="text-xl font-semibold">¡Felicidades!</p>
              <p>No tienes tareas pendientes.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasTasks && (
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNext} 
          className="absolute right-2 z-10 p-2 bg-gray-700/50 hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasTasks}
          aria-label="Siguiente tarea"
        >
          <ChevronRightIcon />
        </motion.button>
      )}

      {hasTasks && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {pendingTasks.map((_, index) => (
                <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-teal-400 scale-125' : 'bg-gray-600'}`}
                ></div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;