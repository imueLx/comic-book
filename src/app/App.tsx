"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Screen,
  LearnerProfile,
  AppSettings,
  ActivityResult,
  Lesson,
} from "./lib/types";
import {
  getActiveProfile,
  createProfile,
  hasSeenOnboarding,
  setOnboarded,
  saveLessonProgress,
  completeLesson,
  awardBadge,
  updateSettings,
  updateProfileName,
} from "./lib/storage";
import { lessons, badges } from "./data/lessons";
import { getActivitiesForLesson } from "./data/activities";
import { warmupSpeechVoices, setPlaybackSpeed } from "./lib/audio";

import SplashScreen from "./components/screens/SplashScreen";
import OnboardingScreen from "./components/screens/OnboardingScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import HomeScreen from "./components/screens/HomeScreen";
import ComicReaderScreen from "./components/screens/ComicReaderScreen";
import ComicBookApp from "./ComicBookApp";
import ActivityScreen from "./components/screens/ActivityScreen";
import ProgressScreen from "./components/screens/ProgressScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import BrowserCompatibilityPrompt from "./components/BrowserCompatibilityPrompt";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [mounted, setMounted] = useState(false);

  // Hydration guard
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      const existing = getActiveProfile();
      const onboarded = hasSeenOnboarding();

      if (existing) {
        setProfile(existing);
        if (existing.settings?.playbackSpeed) {
          setPlaybackSpeed(existing.settings.playbackSpeed);
        }
      }

      // Returning users should land directly on content instead of waiting on splash.
      if (onboarded) {
        setScreen(existing ? "home" : "profile");
      }

      warmupSpeechVoices();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const refreshProfile = useCallback(() => {
    const p = getActiveProfile();
    if (p) setProfile(p);
  }, []);

  // Check and award badges
  const checkBadges = useCallback((profileId: string) => {
    const p = getActiveProfile();
    if (!p) return;

    for (const badge of badges) {
      if (p.badges.includes(badge.id)) continue;
      const { type, count } = badge.requirement;
      let earned = false;
      if (type === "lessons") earned = p.lessonsCompleted >= count;
      if (type === "stars") earned = p.totalStars >= count;
      if (type === "streak") earned = p.streak >= count;
      if (type === "activities") {
        const totalActs = Object.values(p.progress).reduce(
          (s, lp) => s + lp.activitiesCompleted.length,
          0,
        );
        earned = totalActs >= count;
      }
      if (earned) awardBadge(profileId, badge.id);
    }
  }, []);

  // Splash finished
  const handleSplashDone = useCallback(() => {
    if (!mounted) return;
    if (!hasSeenOnboarding()) {
      setScreen("onboarding");
    } else {
      const existing = getActiveProfile();
      if (existing) {
        setProfile(existing);
        setScreen("home");
      } else {
        setScreen("profile");
      }
    }
  }, [mounted]);

  // Onboarding finished
  const handleOnboardingDone = useCallback(() => {
    setOnboarded();
    const existing = getActiveProfile();
    if (existing) {
      setProfile(existing);
      setScreen("home");
    } else {
      setScreen("profile");
    }
  }, []);

  // Profile created
  const handleCreateProfile = useCallback((name: string, avatar: string) => {
    const p = createProfile(name, avatar);
    setProfile(p);
    setScreen("home");
  }, []);

  // Start a lesson
  const handleStartLesson = useCallback((lessonId: number) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    setActiveLesson(lesson);
    // If lesson has comic pages, show comic first; otherwise go straight to activities
    if (lesson.comicPages.length > 0) {
      setScreen("comicReader");
    } else if (lesson.activities.length > 0) {
      setScreen("activity");
    }
  }, []);

  // Comic reader finished
  const handleComicFinish = useCallback(
    (pagesRead: number[]) => {
      if (!profile || !activeLesson) return;
      saveLessonProgress(profile.id, activeLesson.id, {
        comicPagesRead: pagesRead,
      });
      refreshProfile();

      // If lesson has activities, go to activity screen
      const acts = getActivitiesForLesson(activeLesson.id);
      if (acts.length > 0) {
        setScreen("activity");
      } else {
        // Lesson with only comic pages — complete it
        completeLesson(profile.id, activeLesson.id, 3);
        checkBadges(profile.id);
        refreshProfile();
        setScreen("home");
      }
    },
    [profile, activeLesson, checkBadges, refreshProfile],
  );

  // Activities finished
  const handleActivitiesFinish = useCallback(
    (results: ActivityResult[]) => {
      if (!profile || !activeLesson) return;
      const correctCount = results.filter((r) => r.correct).length;
      const stars =
        correctCount === results.length
          ? 3
          : correctCount >= results.length * 0.6
            ? 2
            : correctCount > 0
              ? 1
              : 0;
      const totalTime = results.reduce((s, r) => s + r.timeSpentSeconds, 0);

      completeLesson(profile.id, activeLesson.id, stars);
      saveLessonProgress(profile.id, activeLesson.id, {
        activitiesCompleted: results.map((r) => r.activityId),
        activityResults: results,
        timeSpentSeconds: totalTime,
      });
      checkBadges(profile.id);
      refreshProfile();
      setScreen("home");
    },
    [profile, activeLesson, checkBadges, refreshProfile],
  );

  // Settings save
  const handleSaveSettings = useCallback(
    (settings: AppSettings) => {
      if (!profile) return;
      updateSettings(profile.id, settings);
      setPlaybackSpeed(settings.playbackSpeed);
      refreshProfile();
    },
    [profile, refreshProfile],
  );

  const handleSaveProfileName = useCallback(
    (name: string) => {
      if (!profile) return;
      updateProfileName(profile.id, name);
      refreshProfile();
    },
    [profile, refreshProfile],
  );

  if (!mounted) {
    return <div className="min-h-dvh app-shell" />;
  }

  const settings = profile?.settings || {
    textSize: "medium" as const,
    audioEnabled: true,
    autoRead: false,
    theme: "light" as const,
    playbackSpeed: "normal" as const,
  };

  const textSizeClass =
    settings.textSize === "small"
      ? "text-size-small"
      : settings.textSize === "large"
        ? "text-size-large"
        : "";

  return (
    <div data-theme={settings.theme} className={textSizeClass}>
      <div className="px-4 pt-3">
        <BrowserCompatibilityPrompt />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {screen === "splash" && <SplashScreen onFinish={handleSplashDone} />}

          {screen === "onboarding" && (
            <OnboardingScreen onFinish={handleOnboardingDone} />
          )}

          {screen === "profile" && (
            <ProfileScreen onCreateProfile={handleCreateProfile} />
          )}

          {screen === "home" && profile && (
            <HomeScreen
              profile={profile}
              onStartLesson={handleStartLesson}
              onReadComic={() => setScreen("comicBook")}
              onViewProgress={() => setScreen("progress")}
              onViewSettings={() => setScreen("settings")}
            />
          )}

          {screen === "comicBook" && (
            <ComicBookApp onBack={() => setScreen("home")} />
          )}

          {screen === "comicReader" && activeLesson && (
            <ComicReaderScreen
              lesson={activeLesson}
              audioEnabled={settings.audioEnabled}
              autoRead={settings.autoRead}
              onFinish={handleComicFinish}
              onBack={() => setScreen("home")}
            />
          )}

          {screen === "activity" && activeLesson && (
            <ActivityScreen
              activities={getActivitiesForLesson(activeLesson.id)}
              audioEnabled={settings.audioEnabled}
              autoRead={settings.autoRead}
              onFinish={handleActivitiesFinish}
              onBack={() => setScreen("home")}
            />
          )}

          {screen === "progress" && profile && (
            <ProgressScreen
              profile={profile}
              onBack={() => setScreen("home")}
            />
          )}

          {screen === "settings" && (
            <SettingsScreen
              profile={profile}
              settings={settings}
              onSave={handleSaveSettings}
              onSaveName={handleSaveProfileName}
              onBack={() => setScreen("home")}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
