import { useEffect, useState, useRef } from 'react';

interface SwipeGestureOptions {
  threshold?: number; // Minimum distance for a swipe to be detected
  direction?: 'horizontal' | 'vertical' | 'both'; // Direction of swipe to detect
  cooldown?: number; // Cooldown period in ms to prevent multiple triggers
}

export function useSwipeGesture(
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void,
  options: SwipeGestureOptions = {}
) {
  // Default options
  const threshold = options.threshold || 50;
  const direction = options.direction || 'both';
  const cooldown = options.cooldown || 300;
  
  // Refs for tracking state
  const lastSwipeTime = useRef<number>(0);
  const wheelAccumulatorX = useRef<number>(0);
  const wheelAccumulatorY = useRef<number>(0);
  const isSwipeInProgress = useRef<boolean>(false);
  
  // Track touch positions
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    // Determine if enough time has passed since the last swipe
    const isCooldownOver = () => {
      const now = Date.now();
      if (now - lastSwipeTime.current > cooldown) {
        lastSwipeTime.current = now;
        return true;
      }
      return false;
    };

    // Trigger the swipe callback if conditions are met
    const triggerSwipe = (swipeDirection: 'left' | 'right' | 'up' | 'down') => {
      if (isCooldownOver()) {
        onSwipe(swipeDirection);
        // Reset accumulators after a swipe is triggered
        wheelAccumulatorX.current = 0;
        wheelAccumulatorY.current = 0;
        isSwipeInProgress.current = false;
        return true;
      }
      return false;
    };

    // Main wheel event handler for trackpad gestures
    const handleWheel = (event: WheelEvent) => {
      // Detect MacOS "natural" scrolling direction
      const deltaX = event.deltaX;
      const deltaY = event.deltaY;
      
      // Detect if this is likely a two-finger gesture
      // On macOS, high-precision trackpads often have deltaMode 0 and continuous values
      if (event.deltaMode === 0) {
        // Accumulate the deltas to handle small continuous movements
        wheelAccumulatorX.current += deltaX;
        wheelAccumulatorY.current += deltaY;
        
        // Determine if we're in a swipe and which direction is dominant
        if (!isSwipeInProgress.current && 
            (Math.abs(wheelAccumulatorX.current) > threshold/2 || 
             Math.abs(wheelAccumulatorY.current) > threshold/2)) {
          isSwipeInProgress.current = true;
        }
        
        if (isSwipeInProgress.current) {
          if (Math.abs(wheelAccumulatorX.current) > Math.abs(wheelAccumulatorY.current) && 
              (direction === 'horizontal' || direction === 'both')) {
            // Horizontal swipe detected
            if (Math.abs(wheelAccumulatorX.current) > threshold) {
              const swipeDirection = wheelAccumulatorX.current > 0 ? 'right' : 'left';
              if (triggerSwipe(swipeDirection)) {
                event.preventDefault();
              }
            }
          } else if (Math.abs(wheelAccumulatorY.current) > Math.abs(wheelAccumulatorX.current) && 
                    (direction === 'vertical' || direction === 'both')) {
            // Vertical swipe detected
            if (Math.abs(wheelAccumulatorY.current) > threshold) {
              const swipeDirection = wheelAccumulatorY.current > 0 ? 'down' : 'up';
              if (triggerSwipe(swipeDirection)) {
                event.preventDefault();
              }
            }
          }
        }
      }
    };
    
    // Reset accumulators if no wheel activity for a while
    const handleWheelEnd = () => {
      setTimeout(() => {
        if (Date.now() - lastSwipeTime.current > 200) {
          wheelAccumulatorX.current = 0;
          wheelAccumulatorY.current = 0;
          isSwipeInProgress.current = false;
        }
      }, 200);
    };
    
    // Touch events for mobile/touch devices
    const handleTouchStart = (event: TouchEvent) => {
      // Only process two-finger gestures
      if (event.touches.length === 2) {
        // Calculate center point between two fingers
        const x = (event.touches[0].clientX + event.touches[1].clientX) / 2;
        const y = (event.touches[0].clientY + event.touches[1].clientY) / 2;
        
        setTouchStartX(x);
        setTouchStartY(y);
      }
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      // Only process two-finger gestures
      if (event.touches.length === 2 && touchStartX !== null && touchStartY !== null) {
        // Calculate center point between two fingers
        const x = (event.touches[0].clientX + event.touches[1].clientX) / 2;
        const y = (event.touches[0].clientY + event.touches[1].clientY) / 2;
        
        // Calculate delta
        const deltaX = x - touchStartX;
        const deltaY = y - touchStartY;
        
        // Determine the dominant direction of the gesture
        if (Math.abs(deltaX) > Math.abs(deltaY) && (direction === 'horizontal' || direction === 'both')) {
          // Horizontal swipe
          if (Math.abs(deltaX) > threshold) {
            const swipeDirection = deltaX > 0 ? 'right' : 'left';
            if (triggerSwipe(swipeDirection)) {
              // Reset touch start to prevent multiple triggers
              setTouchStartX(null);
              setTouchStartY(null);
              event.preventDefault();
            }
          }
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && (direction === 'vertical' || direction === 'both')) {
          // Vertical swipe
          if (Math.abs(deltaY) > threshold) {
            const swipeDirection = deltaY > 0 ? 'down' : 'up';
            if (triggerSwipe(swipeDirection)) {
              // Reset touch start to prevent multiple triggers
              setTouchStartX(null);
              setTouchStartY(null);
              event.preventDefault();
            }
          }
        }
      }
    };
    
    const handleTouchEnd = () => {
      // Reset touch start positions
      setTouchStartX(null);
      setTouchStartY(null);
    };
    
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('wheel', handleWheelEnd, { passive: true });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('wheel', handleWheelEnd);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, threshold, direction, cooldown, touchStartX, touchStartY]);
} 