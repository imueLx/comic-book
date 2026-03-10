"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { comicPages } from "./data/comicPages";
import CoverPage from "./components/CoverPage";
import EndPage from "./components/EndPage";
import ComicPageView from "./components/ComicPageView";
import Navigation from "./components/Navigation";
import ProgressBar from "./components/ProgressBar";

export default function ComicBookApp() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = comicPages.length;
  const page = comicPages[currentPage - 1];

  // Swipe gesture support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goNext = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Touch/swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      // Only count horizontal swipes (not vertical scrolling)
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0) goNext();
        else goPrev();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    },
    [goNext, goPrev],
  );

  return (
    <main
      className={`min-h-dvh ${page.background} transition-colors duration-500 flex flex-col`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b-3 sm:border-b-4 border-purple-300 py-2 sm:py-3 px-3 sm:px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h1 className="text-sm sm:text-xl font-extrabold text-purple-800 flex items-center gap-1 sm:gap-2">
              <span>📖</span>
              <span className="hidden xs:inline">
                The Word Pattern Adventure
              </span>
              <span className="xs:hidden">Word Pattern</span>
            </h1>
            <span className="text-xs sm:text-sm font-bold text-purple-600 bg-purple-100 px-2 sm:px-3 py-1 rounded-full">
              {currentPage}/{totalPages}
            </span>
          </div>
          <ProgressBar current={currentPage} total={totalPages} />
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-start sm:justify-center px-2 sm:px-4 py-3 sm:py-6 max-w-3xl mx-auto w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            {page.isCover ? (
              <CoverPage />
            ) : page.isEnd ? (
              <EndPage />
            ) : (
              <ComicPageView page={page} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <footer className="bg-white/70 backdrop-blur-sm border-t-3 sm:border-t-4 border-purple-300 py-2 sm:py-4 px-2 sm:px-4 sticky bottom-0 safe-bottom">
        <div className="max-w-3xl mx-auto">
          <Navigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={goPrev}
            onNext={goNext}
          />
          <p className="text-center text-[10px] sm:text-xs text-purple-400 mt-1 sm:mt-2">
            Swipe or use buttons to navigate
          </p>
        </div>
      </footer>
    </main>
  );
}
