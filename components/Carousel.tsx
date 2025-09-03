
import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CarouselProps {
  pendingTasks: Task[];
}

const Carousel: React.FC<CarouselProps> = ({ pendingTasks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= pendingTasks.length && pendingTasks.length > 0) {
      setCurrentIndex(pendingTasks.length - 1);
    } else if (pendingTasks.length === 0) {
      setCurrentIndex(0);
    }
  }, [pendingTasks, currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? pendingTasks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === pendingTasks.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const hasTasks = pendingTasks.length > 0;

  return (
    <div className="relative w-full h-48 bg-gray-800 rounded-lg shadow-xl flex items-center justify-center p-4 overflow-hidden">
      {hasTasks && (
         <button 
         onClick={goToPrevious} 
         className="absolute left-2 z-10 p-2 bg-gray-700/50 hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
         disabled={!hasTasks}
         aria-label="Tarea anterior"
       >
         <ChevronLeftIcon />
       </button>
      )}

      <div className="w-full h-full flex items-center justify-center">
        {hasTasks ? (
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {pendingTasks.map((task) => (
              <div key={task.id} className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center px-8">
                <p className="text-lg sm:text-xl font-medium text-teal-300">{task.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-xl font-semibold">¡Felicidades!</p>
            <p>No tienes tareas pendientes.</p>
          </div>
        )}
      </div>

      {hasTasks && (
        <button 
        onClick={goToNext} 
        className="absolute right-2 z-10 p-2 bg-gray-700/50 hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasTasks}
        aria-label="Siguiente tarea"
      >
        <ChevronRightIcon />
      </button>
      )}

      {hasTasks && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {pendingTasks.map((_, index) => (
                <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-teal-400' : 'bg-gray-600'}`}
                ></div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
