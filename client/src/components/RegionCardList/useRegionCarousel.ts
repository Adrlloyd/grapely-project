import { useCallback, useRef, useState } from 'react';

export function useRegionCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = trackRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const offset = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior });
      setActiveIndex(index);
    }
  }, []);

  const scrollLeft = useCallback((totalCards: number) => {
    const container = trackRef.current;
    const nextIndex = activeIndex - 1;
    if (!container) return;

    if (nextIndex === 0) {
      scrollToIndex(nextIndex);
      const handleScrollEnd = () => {
        container.removeEventListener('scrollend', handleScrollEnd);
        scrollToIndex(totalCards - 2, 'auto');
        setActiveIndex(totalCards - 2);
      };
      container.addEventListener('scrollend', handleScrollEnd, { once: true });
    } else {
      scrollToIndex(nextIndex);
    }
  }, [activeIndex, scrollToIndex]);

  const scrollRight = useCallback((totalCards: number) => {
    const container = trackRef.current;
    const nextIndex = activeIndex + 1;
    if (!container) return;

    if (nextIndex === totalCards - 1) {
      scrollToIndex(nextIndex);
      const handleScrollEnd = () => {
        container.removeEventListener('scrollend', handleScrollEnd);
        scrollToIndex(1, 'auto');
        setActiveIndex(1);
      };
      container.addEventListener('scrollend', handleScrollEnd, { once: true });
    } else {
      scrollToIndex(nextIndex);
    }
  }, [activeIndex, scrollToIndex]);

  const centerInitialCard = useCallback(() => {
    const container = trackRef.current;
    const card = cardRefs.current[1];
    if (container && card) {
      const offset = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: offset });
    }
  }, []);

  return {
    trackRef,
    cardRefs,
    activeIndex,
    scrollLeft,
    scrollRight,
    scrollToIndex,
    centerInitialCard,
    setActiveIndex
  };
}