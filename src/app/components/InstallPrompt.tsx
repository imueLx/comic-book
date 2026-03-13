"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type InstallState =
  | "hidden" // already installed or not applicable
  | "installable" // beforeinstallprompt fired — show Install button
  | "ios-safari" // iOS Safari — show Add to Home Screen guide
  | "unsupported"; // browser doesn't support PWA install

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function detectState(): InstallState {
  if (typeof window === "undefined") return "hidden";

  // Already running as installed PWA
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  if (isStandalone) return "hidden";

  // iOS Safari detection
  const ua = navigator.userAgent;
  const isIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
  if (isIos && isSafari) return "ios-safari";

  // If beforeinstallprompt is supported, wait for it (Chrome, Edge, Samsung, Opera)
  if ("BeforeInstallPromptEvent" in window || /Chrome|Edg/.test(ua))
    return "hidden"; // will become "installable" when event fires

  // Everything else (Firefox, Safari desktop, etc.)
  return "unsupported";
}

export default function InstallPrompt({
  variant = "banner",
}: {
  variant?: "banner" | "card" | "hero" | "mini";
}) {
  const [state, setState] = useState<InstallState>("hidden");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setState(detectState());

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setState("installable");
    };

    window.addEventListener("beforeinstallprompt", handler);

    const installedHandler = () => {
      setState("hidden");
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setState("hidden");
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  if (state === "hidden" || dismissed) return null;

  if (variant === "mini") {
    if (state === "installable") {
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="app-card relative px-3 py-2.5"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 cursor-pointer"
              aria-label="Dismiss"
            >
              ✕
            </button>
            <div className="flex items-center gap-2.5 pr-6">
              <span className="text-base" aria-hidden="true">
                📲
              </span>
              <p className="text-xs font-bold text-gray-700 flex-1">
                Install for faster opening
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleInstall}
                className="px-3 py-1.5 rounded-lg bg-linear-to-b from-violet-500 to-purple-600 text-white font-bold text-xs min-h-9 cursor-pointer shadow-sm"
              >
                Install
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      );
    }

    if (state === "ios-safari") {
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="app-card relative px-3 py-2.5"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 cursor-pointer"
              aria-label="Dismiss"
            >
              ✕
            </button>
            <p className="text-xs text-gray-700 font-semibold pr-6">
              Install tip: Safari Share then Add to Home Screen.
            </p>
          </motion.div>
        </AnimatePresence>
      );
    }

    return null;
  }

  // ── Hero variant: big prominent card at the top of the page ──
  if (variant === "hero") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="relative rounded-3xl overflow-hidden bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-5 sm:p-6 text-white"
        >
          {/* Ambient decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-pink-400/15 rounded-full blur-xl" />
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs text-white/70 cursor-pointer hover:bg-white/25 z-10"
            aria-label="Dismiss"
          >
            ✕
          </button>

          <div className="relative z-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
                <span className="text-3xl">📲</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold leading-tight">
                  Install the App
                </h3>
                <p className="text-violet-200 text-xs sm:text-sm font-semibold">
                  Use it like a real app — even offline!
                </p>
              </div>
            </div>

            {state === "installable" && (
              <>
                <p className="text-sm text-violet-100 mb-4 leading-relaxed">
                  Add <strong>Word Pattern Adventure</strong> to your home
                  screen for one-tap access. Works offline after install!
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleInstall}
                  className="w-full py-3.5 rounded-2xl bg-white font-extrabold text-violet-700 text-base min-h-12 cursor-pointer shadow-lg"
                >
                  📲 Install App
                </motion.button>
              </>
            )}

            {state === "ios-safari" && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                <p className="text-sm text-violet-100 mb-3 leading-relaxed">
                  To install this app on your device:
                </p>
                <ol className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-lg w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Tap the <strong>Share</strong> button{" "}
                      <span className="inline-block bg-white/20 rounded px-1.5 py-0.5 text-xs">
                        ⎋
                      </span>{" "}
                      at the bottom of Safari
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-lg w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      Scroll down and tap{" "}
                      <strong>&quot;Add to Home Screen&quot;</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-lg w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      Tap <strong>&quot;Add&quot;</strong> — done! 🎉
                    </span>
                  </li>
                </ol>
              </div>
            )}

            {state === "unsupported" && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                <p className="text-sm text-violet-100 mb-2 leading-relaxed">
                  This app can be installed and used offline! For the best
                  experience, open it in:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { icon: "🌐", label: "Chrome", sub: "Android / Desktop" },
                    { icon: "📱", label: "Safari", sub: "iPhone / iPad" },
                    { icon: "🔷", label: "Edge", sub: "Android / Desktop" },
                    { icon: "🌍", label: "Samsung Internet", sub: "Android" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      className="bg-white/10 rounded-xl p-2.5 text-center"
                    >
                      <span className="text-lg">{b.icon}</span>
                      <p className="font-bold text-white text-xs mt-0.5">
                        {b.label}
                      </p>
                      <p className="text-violet-200 text-[10px]">{b.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ── Banner / Card variants (compact) ──
  const wrapperClass =
    variant === "card"
      ? "app-card relative p-4 sm:p-5"
      : "relative rounded-2xl p-3 sm:p-4 border-2 border-violet-200 bg-violet-50";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={wrapperClass}
      >
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 cursor-pointer hover:bg-gray-300"
          aria-label="Dismiss"
        >
          ✕
        </button>

        {state === "installable" && (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-violet-100 to-purple-100 flex items-center justify-center text-xl shrink-0 border border-violet-200">
              📲
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-gray-900 text-sm leading-tight">
                Install this app
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Add to your home screen for offline access
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleInstall}
              className="px-4 py-2 rounded-xl bg-linear-to-b from-violet-500 to-purple-600 text-white font-bold text-sm min-h-10 cursor-pointer shadow-md shadow-violet-200 shrink-0"
            >
              Install
            </motion.button>
          </div>
        )}

        {state === "ios-safari" && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📲</span>
              <p className="font-extrabold text-gray-900 text-sm">
                Install this app
              </p>
            </div>
            <div className="text-xs text-gray-600 space-y-1.5">
              <p>
                Tap the <strong>Share</strong> button{" "}
                <span className="inline-block bg-gray-200 rounded px-1.5 py-0.5 text-[10px] font-mono">
                  ⎋
                </span>{" "}
                at the bottom of Safari, then tap{" "}
                <strong>&quot;Add to Home Screen&quot;</strong>.
              </p>
              <p className="text-gray-400">
                This lets you use the app offline like a real app!
              </p>
            </div>
          </div>
        )}

        {state === "unsupported" && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <p className="font-extrabold text-gray-900 text-sm">
                Tip: Install for offline use
              </p>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              This app can be installed and used offline. For the best
              experience, open it in <strong>Google Chrome</strong>,{" "}
              <strong>Microsoft Edge</strong>, or{" "}
              <strong>Samsung Internet</strong> on Android — or{" "}
              <strong>Safari</strong> on iPhone/iPad.
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
