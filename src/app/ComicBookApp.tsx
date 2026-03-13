"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { comicPages } from "./data/comicPages";
import CoverPage from "./components/CoverPage";
import EndPage from "./components/EndPage";
import ComicPageView from "./components/ComicPageView";
import Navigation from "./components/Navigation";
import ProgressBar from "./components/ProgressBar";
import Confetti from "./components/Confetti";

interface ComicBookAppProps {
  onBack?: () => void;
}

export default function ComicBookApp({ onBack }: ComicBookAppProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCompletion, setShowCompletion] = useState(false);
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
      className={`app-shell min-h-dvh ${page.background} transition-colors duration-500 flex flex-col`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="app-header py-2 sm:py-3 px-3 sm:px-4 sticky top-0 z-10 safe-top">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="flex items-center gap-1 sm:gap-2">
              {onBack && (
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={onBack}
                  className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-lg cursor-pointer active:bg-gray-200"
                >
                  ←
                </motion.button>
              )}
              <h1
                className="text-sm sm:text-xl font-extrabold text-gray-900 flex items-center gap-1 sm:gap-2"
                style={{
                  fontFamily:
                    "var(--font-comic), var(--font-baloo), sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                <span>📖</span>
                <span className="hidden xs:inline">
                  The Word Pattern Adventure
                </span>
                <span className="xs:hidden">Word Pattern</span>
              </h1>
            </div>
            <span className="soft-chip text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full">
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
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full comic-page-wrapper"
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
      <footer className="app-header py-2 sm:py-4 px-2 sm:px-4 sticky bottom-0 safe-bottom">
        <div className="max-w-3xl mx-auto">
          <Navigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={goPrev}
            onNext={goNext}
            onDone={() => setShowCompletion(true)}
          />
          <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2">
            Swipe or use buttons to navigate
          </p>
        </div>
      </footer>

      {/* Completion celebration overlay */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <Confetti show={showCompletion} />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl mx-4"
            >
              <motion.div
                className="text-6xl mb-3"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, repeat: 2 }}
              >
                🏆
              </motion.div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2"
                style={{
                  fontFamily:
                    "var(--font-comic), var(--font-baloo), sans-serif",
                }}
              >
                Amazing Job! 🎉
              </h2>
              <p className="text-gray-600 mb-2 text-base">
                You finished the entire comic book!
              </p>
              <p className="text-sm text-gray-500 mb-6">
                You read all {totalPages} pages of &quot;The Word Pattern
                Adventure&quot; — you&apos;re a reading superstar!
              </p>

              <div className="flex gap-3 mb-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowCompletion(false);
                    setCurrentPage(1);
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-gray-100 font-extrabold text-gray-700 text-base cursor-pointer min-h-13 active:bg-gray-200"
                >
                  📖 Read Again
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowCompletion(false);
                    onBack?.();
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-linear-to-b from-emerald-400 to-emerald-600 font-extrabold text-white text-base cursor-pointer min-h-13 shadow-md active:from-emerald-500 active:to-emerald-700"
                >
                  ✅ Done!
                </motion.button>
              </div>

              <div className="flex justify-center gap-1">
                {["⭐", "🌟", "⭐", "🌟", "⭐"].map((star, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    {star}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
