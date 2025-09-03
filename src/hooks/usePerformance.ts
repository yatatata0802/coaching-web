import { useEffect, useRef, useCallback } from "react";

// パフォーマンス最適化のためのカスタムフック
export const usePerformance = () => {
  const frameIdRef = useRef<number>();
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  // メモリリークを防ぐためのクリーンアップ
  useEffect(() => {
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  // デバウンスされた関数
  const debounce = useCallback(
    <T extends (...args: unknown[]) => unknown>(func: T, delay: number) => {
      return (...args: Parameters<T>) => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
        timeoutIdRef.current = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  // スロットリングされた関数
  const throttle = useCallback(
    <T extends (...args: unknown[]) => unknown>(func: T, delay: number) => {
      let lastCall = 0;
      return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          func(...args);
        }
      };
    },
    []
  );

  // リクエストアニメーションフレームのラッパー
  const requestAnimationFrame = useCallback(
    (callback: FrameRequestCallback) => {
      frameIdRef.current = window.requestAnimationFrame(callback);
    },
    []
  );

  // 画像の遅延読み込み
  const lazyLoadImage = useCallback((img: HTMLImageElement, src: string) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  }, []);

  return {
    debounce,
    throttle,
    requestAnimationFrame,
    lazyLoadImage,
  };
};

// メモ化のためのカスタムフック
export const useMemoizedCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T => {
  const memoizedCallback = useCallback(callback, deps);
  return memoizedCallback as T;
};

// パフォーマンス測定のためのフック
export const usePerformanceMeasure = (name: string) => {
  const startTime = useRef<number>();

  const start = useCallback(() => {
    startTime.current = performance.now();
  }, []);

  const end = useCallback(() => {
    if (startTime.current) {
      const duration = performance.now() - startTime.current;
      // 開発環境でのみログを出力
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log(`${name}: ${duration.toFixed(2)}ms`);
      }
    }
  }, [name]);

  return { start, end };
};
