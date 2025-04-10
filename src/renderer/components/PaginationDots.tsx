import React from 'react';
import styles from '../styles/PaginationDots.module.css';

interface PaginationDotsProps {
  currentIndex: number;
  totalCount: number;
  onDotClick?: (index: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ 
  currentIndex, 
  totalCount,
  onDotClick
}) => {
  // Do not render if there's only one note or no notes
  if (totalCount <= 1) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      {Array.from({ length: totalCount }).map((_, index) => (
        <button
          key={index}
          className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
          aria-label={`Go to note ${index + 1}`}
          onClick={() => onDotClick && onDotClick(index)}
          tabIndex={0}
        />
      ))}
    </div>
  );
};

export default PaginationDots; 