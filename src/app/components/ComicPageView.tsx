"use client";

import { ComicPage } from "../data/comicPages";
import ComicLessonPage from "./comic/ComicLessonPage";
import { getComicLessonPage } from "../data/comicLessonPages";
import PracticeComicPage from "./comic/PracticeComicPage";
import StoryComicPage from "./comic/StoryComicPage";

interface ComicPageViewProps {
  page: ComicPage;
}

export default function ComicPageView({ page }: ComicPageViewProps) {
  const comicLessonPage = getComicLessonPage(page.pageNumber);

  if (page.pageNumber === 7) {
    return <PracticeComicPage />;
  }

  if (comicLessonPage) {
    return <ComicLessonPage data={comicLessonPage} />;
  }

  return <StoryComicPage page={page} />;
}
