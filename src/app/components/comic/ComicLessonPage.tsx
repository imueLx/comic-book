"use client";

import { useMemo, useState } from "react";
import { narrateDialog, speakWord, stopSpeaking } from "../../lib/audio";
import { ComicLessonPageData } from "../../data/comicLessonPages";
import AudioReadButton from "./AudioReadButton";
import CharacterSprite from "./CharacterSprite";
import ComicPanel from "./ComicPanel";
import MiniPracticeBlock from "./MiniPracticeBlock";
import NarrationBox from "./NarrationBox";
import ProgressFooter from "./ProgressFooter";
import RewardToast from "./RewardToast";
import TapToHearImage from "./TapToHearImage";
import WordHighlight from "./WordHighlight";

interface ComicLessonPageProps {
  data: ComicLessonPageData;
}

const speakerNameMap = {
  teacher: "Teacher Mia",
  ana: "Ana",
  ben: "Ben",
  tom: "Tom",
};

const bubbleColorMap = {
  teacher: "bg-sky-100 border-sky-700",
  ana: "bg-pink-100 border-pink-700",
  ben: "bg-emerald-100 border-emerald-700",
  tom: "bg-amber-100 border-amber-700",
};

export default function ComicLessonPage({ data }: ComicLessonPageProps) {
  const [activePanel, setActivePanel] = useState(1);
  const [isReading, setIsReading] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const availablePanels = Math.min(activePanel, data.panelLayout.length);

  const visibleDialog = useMemo(
    () => data.dialogueLines.slice(0, Math.min(data.dialogueLines.length, 4)),
    [data.dialogueLines],
  );

  const handleReadCurrent = async () => {
    if (isReading) {
      stopSpeaking();
      setIsReading(false);
      return;
    }
    const line = visibleDialog[Math.max(0, availablePanels - 1)];
    if (!line) return;
    setIsReading(true);
    try {
      await narrateDialog(line.speaker, line.text);
    } finally {
      setIsReading(false);
    }
  };

  const advancePanel = () => {
    setActivePanel((prev) => Math.min(prev + 1, data.panelLayout.length));
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="mb-2 rounded-3xl border-3 border-gray-900 bg-linear-to-br from-cyan-100 via-yellow-50 to-pink-100 p-3 shadow-[5px_5px_0_#111827]">
        <div className="mb-2 flex items-center justify-between">
          <p className="rounded-full border-2 border-gray-900 bg-white px-3 py-1 text-xs font-black uppercase text-gray-700">
            Page {data.pageNumber}
          </p>
          <AudioReadButton onClick={handleReadCurrent} isReading={isReading} />
        </div>
        <h2 className="text-2xl font-black text-gray-900">{data.sceneTitle}</h2>
        <p className="text-sm font-semibold text-gray-700">
          Image-first comic learning
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border-2 border-gray-800 bg-white/70 p-2 sm:grid-cols-4">
          {data.charactersOnScreen.map((char) => (
            <CharacterSprite key={`${char.id}-${char.x}`} character={char} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {availablePanels >= 1 && (
          <ComicPanel variant="wide" delay={0.03}>
            <NarrationBox text={data.narration} />
            <div className="mt-3 space-y-2">
              {visibleDialog.slice(0, 2).map((line, index) => (
                <div
                  key={`${line.speaker}-${index}`}
                  className={`relative rounded-2xl border-2 px-3 py-2 text-sm font-semibold text-gray-900 ${bubbleColorMap[line.speaker]}`}
                >
                  <p className="mb-0.5 text-xs font-black uppercase text-gray-700">
                    {speakerNameMap[line.speaker]}
                  </p>
                  {line.text}
                  <span className="absolute -bottom-2 left-6 h-3 w-3 rotate-45 border-r-2 border-b-2 border-inherit bg-inherit" />
                </div>
              ))}
            </div>
          </ComicPanel>
        )}

        {availablePanels >= 2 && (
          <ComicPanel variant="half" delay={0.07}>
            <h3 className="text-base font-black text-gray-900">Tap To Hear</h3>
            <p className="text-xs font-semibold text-gray-700">
              Visual words first
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2.5">
              {data.visuals.slice(0, 4).map((item) => (
                <TapToHearImage
                  key={item.id}
                  emoji={item.emoji}
                  label={item.label}
                  hint={item.hint}
                  onTap={() => speakWord(item.word)}
                />
              ))}
            </div>
          </ComicPanel>
        )}

        {availablePanels >= 3 && data.miniActivity && (
          <ComicPanel variant="half" delay={0.12}>
            <MiniPracticeBlock
              activity={data.miniActivity}
              onCorrect={() => {
                setShowReward(true);
                setTimeout(() => setShowReward(false), 1300);
              }}
            />
          </ComicPanel>
        )}

        {availablePanels >= 4 && (
          <ComicPanel variant="focus" delay={0.16}>
            <h3 className="text-base font-black text-gray-900">Power Words</h3>
            <p className="text-xs font-semibold text-gray-700">
              Tap a word to hear pronunciation
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.vocabularyTargets.map((word) => (
                <WordHighlight key={word} word={word} onClick={speakWord} />
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-900">
              {data.feedbackText}
            </p>
          </ComicPanel>
        )}
      </div>

      <ProgressFooter
        currentPanel={activePanel}
        totalPanels={data.panelLayout.length}
        onNextPanel={advancePanel}
        canAdvance={activePanel < data.panelLayout.length}
      />

      <RewardToast
        show={showReward}
        text="Great job! You found the right word!"
      />
    </div>
  );
}
