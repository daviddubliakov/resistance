import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface UseEmblaCarouselWithProgressOptions {
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
}

interface UseEmblaCarouselWithProgressReturn {
  emblaRef: (node: HTMLElement | null) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  progressStyle: React.CSSProperties;
}

export const useEmblaCarouselWithProgress = (
  options: UseEmblaCarouselWithProgressOptions = { loop: false, align: 'start' }
): UseEmblaCarouselWithProgressReturn => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [progress, setProgress] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      setProgress(emblaApi.scrollProgress());
    };

    emblaApi.on('scroll', onScroll);
    emblaApi.on('resize', onScroll);
    onScroll();

    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('resize', onScroll);
    };
  }, [emblaApi]);

  const progressStyle = {
    '--progress': `${progress * 100}%`,
  } as React.CSSProperties;

  return {
    emblaRef,
    scrollPrev,
    scrollNext,
    progressStyle,
  };
};
