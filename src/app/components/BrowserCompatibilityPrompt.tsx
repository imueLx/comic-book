"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  buildRedirectUrl,
  getBrowserSupportInfo,
  getPreferredBrowserName,
  type BrowserSupportInfo,
} from "../lib/browserSupport";

function shouldShowPrompt(info: BrowserSupportInfo): boolean {
  if (info.isStandalone) return false;
  return info.isInAppBrowser || !info.speechSupported || !info.offlineReady;
}

export default function BrowserCompatibilityPrompt() {
  const [info, setInfo] = useState<BrowserSupportInfo | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [speechIssueSeen, setSpeechIssueSeen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "ok" | "error">("idle");

  useEffect(() => {
    setInfo(getBrowserSupportInfo());
  }, []);

  useEffect(() => {
    const onSpeechIssue = () => setSpeechIssueSeen(true);
    window.addEventListener("app:speech-issue", onSpeechIssue);
    return () => window.removeEventListener("app:speech-issue", onSpeechIssue);
  }, []);

  const preferredBrowser = useMemo(() => {
    if (!info) return "Chrome";
    return getPreferredBrowserName(info.os);
  }, [info]);

  const reasons = useMemo(() => {
    if (!info) return [] as string[];
    const items: string[] = [];

    if (info.isInAppBrowser) {
      items.push(
        `This link is opened inside ${info.inAppName || "an in-app browser"}, which often blocks full features.`,
      );
    }
    if (!info.speechSupported) {
      items.push("Speech narration is not supported in this browser.");
    }
    if (speechIssueSeen && info.speechSupported) {
      items.push("Speech playback is unstable in this browser right now.");
    }
    if (!info.offlineReady) {
      items.push(
        "Offline mode and app install may be limited in this browser.",
      );
    }

    return items;
  }, [info, speechIssueSeen]);

  const handleOpenSupportedBrowser = useCallback(() => {
    if (!info || typeof window === "undefined") return;

    const currentUrl = window.location.href;
    const redirectUrl = buildRedirectUrl(currentUrl, info.os);

    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }

    window.open(currentUrl, "_blank", "noopener,noreferrer");
  }, [info]);

  const handleCopyLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      if (!navigator.clipboard?.writeText) {
        setCopyState("error");
        setTimeout(() => setCopyState("idle"), 1600);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("ok");
    } catch {
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 1600);
  }, []);

  if (!info || dismissed || (!shouldShowPrompt(info) && !speechIssueSeen)) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mx-auto mb-3 w-full max-w-lg rounded-2xl border-2 border-amber-300 bg-linear-to-br from-amber-50 to-orange-50 p-4 shadow-sm"
      >
        <button
          onClick={() => setDismissed(true)}
          className="float-right h-7 w-7 rounded-full bg-white/80 text-xs text-gray-600"
          aria-label="Dismiss compatibility notice"
        >
          ✕
        </button>

        <div className="pr-8">
          <p className="text-sm font-extrabold text-amber-900">
            Better in {preferredBrowser}
          </p>
          <p className="mt-1 text-xs font-semibold text-amber-800">
            Open in a supported browser for narration, install, and offline
            learning.
          </p>
        </div>

        <div className="mt-3 space-y-1.5">
          {reasons.map((reason) => (
            <p key={reason} className="text-xs text-amber-900">
              • {reason}
            </p>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            onClick={handleOpenSupportedBrowser}
            className="min-h-10 rounded-xl bg-linear-to-b from-emerald-500 to-emerald-600 px-3 py-2 text-sm font-extrabold text-white"
          >
            Open in {preferredBrowser}
          </button>
          <button
            onClick={handleCopyLink}
            className="min-h-10 rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-bold text-amber-900"
          >
            {copyState === "idle" && "Copy Link"}
            {copyState === "ok" && "Link Copied"}
            {copyState === "error" && "Copy Failed"}
          </button>
        </div>

        <p className="mt-2 text-[11px] text-amber-700">
          Tip: In Messenger or social apps, tap the menu and choose Open in
          Browser.
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
