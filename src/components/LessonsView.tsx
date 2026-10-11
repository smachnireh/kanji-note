import React, { useState } from 'react';
import { KANJI_DATA, LESSONS_META, KanjiItem } from '../data/kanjiData';
import { speakJapanese } from '../utils/soundHelper';
import { 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  Volume2, 
  GraduationCap, 
  ArrowLeft,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

interface LessonsViewProps {
  learnedIds: number[];
  onToggleLearned: (id: number) => void;
  onSelectKanji: (kanji: KanjiItem) => void;
  onStartLessonQuiz: (lessonId: number) => void;
  onStartLessonFlashcards: (lessonId: number) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  learnedIds,
  onToggleLearned,
  onSelectKanji,
  onStartLessonQuiz,
  onStartLessonFlashcards
}) => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [openMenuLessonId, setOpenMenuLessonId] = useState<number | null>(null);
  const [isReaderActionsOpen, setIsReaderActionsOpen] = useState(false);

  // If inside Reader view for a specific lesson
  if (activeLessonId !== null) {
    const lessonMeta = LESSONS_META.find(l => l.id === activeLessonId);
    const lessonKanji = KANJI_DATA.filter(k => k.lesson === activeLessonId);
    const learnedInLesson = lessonKanji.filter(k => learnedIds.includes(k.id)).length;

    return (
      <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
        {/* Navigation Top bar */}
        <div className="flex items-center justify-between bg-[#1a4a2e] text-white p-4 sm:p-5 rounded-2xl mb-6 shadow-md border-b-2 border-[#c8963e]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveLessonId(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Назад к урокам"
            >
              <ArrowLeft size={19} />
            </button>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-emerald-200/80 font-medium">
                {lessonMeta?.title} • {lessonKanji.length} иероглифов
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                {lessonMeta?.theme}
              </h2>
            </div>
          </div>

          {/* 1 Master button for all actions in this lesson */}
          <div className="relative">
            <button
              onClick={() => setIsReaderActionsOpen(!isReaderActionsOpen)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#c8963e] text-[#1a4a2e] font-bold rounded-xl text-xs hover:bg-[#dfaa4b] transition-all shadow-sm"
            >
              <span>Действия</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isReaderActionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isReaderActionsOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#fffdf8] border border-[#e0d9cc] rounded-2xl shadow-xl p-2 z-40 space-y-1 animate-scale-up text-[#1c1c1c]">
                <button
                  onClick={() => {
                    setIsReaderActionsOpen(false);
                    onStartLessonFlashcards(activeLessonId);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1c1c1c] hover:bg-[#1a4a2e]/10 hover:text-[#1a4a2e] rounded-xl transition-all"
                >
                  <Layers size={14} className="text-[#1a4a2e]" />
                  <span>Учить карточками</span>
                </button>
                <button
                  onClick={() => {
                    setIsReaderActionsOpen(false);
                    onStartLessonQuiz(activeLessonId);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1c1c1c] hover:bg-[#1a4a2e]/10 hover:text-[#1a4a2e] rounded-xl transition-all"
                >
                  <GraduationCap size={14} className="text-[#c8963e]" />
                  <span>Пройти тест урока</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="bg-[#fffdf8] border border-[#e0d9cc] rounded-2xl p-3.5 mb-6 shadow-xs flex items-center justify-between text-xs text-[#6b6b5e]">
          <span>
            Прогресс: <strong className="text-[#1a4a2e]">{learnedInLesson}</strong> из {lessonKanji.length} выучено
          </span>
          <div className="w-32 bg-[#e0d9cc] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#1a4a2e] h-full transition-all duration-300"
              style={{ width: `${(learnedInLesson / lessonKanji.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Minimal Clean Kanji Rows */}
        <div className="space-y-3">
          {lessonKanji.map((item, index) => {
            const isLearned = learnedIds.includes(item.id);

            return (
              <div 
                key={item.id}
                onClick={() => onSelectKanji(item)}
                className="bg-[#fffdf8] border border-[#e0d9cc] hover:border-[#1a4a2e] rounded-2xl p-3.5 sm:p-4 shadow-xs transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                {/* Kanji Character & Texts */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div 
                    className="w-13 h-13 rounded-xl bg-[#f8f5ee] border border-[#c8963e]/40 flex items-center justify-center text-3xl font-serif text-[#1a4a2e] group-hover:scale-105 transition-transform shrink-0"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {item.kanji}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#8c8273]">
                        №{index + 1}
                      </span>
                      <h3 className="text-base font-serif font-bold text-[#1c1c1c] group-hover:text-[#1a4a2e] transition-colors truncate">
                        {item.meaning}
                      </h3>
                      <span className="text-[11px] text-[#8c8273]">
                        ({item.strokes} черт)
                      </span>
                    </div>

                    <div className="text-xs text-[#555] flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 truncate">
                      <span><strong className="text-[#1a4a2e]">Кун:</strong> {item.kunyomi} [{item.kunyomiRu}]</span>
                      <span><strong className="text-[#c8963e]">Он:</strong> {item.onyomi} [{item.onyomiRu}]</span>
                    </div>
                  </div>
                </div>

                {/* Right compact actions */}
                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => speakJapanese(item.kanji)}
                    className="p-2 rounded-lg text-[#1a4a2e] hover:bg-[#1a4a2e]/10 transition-colors"
                    title="Озвучить"
                  >
                    <Volume2 size={16} />
                  </button>

                  <button
                    onClick={() => onToggleLearned(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isLearned 
                        ? 'text-emerald-700 bg-emerald-50' 
                        : 'text-[#bbb] hover:text-emerald-700'
                    }`}
                    title={isLearned ? "Выучено" : "Отметить выученным"}
                  >
                    <CheckCircle2 size={18} className={isLearned ? "fill-current/20" : ""} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Main Lessons Cards Grid
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {LESSONS_META.map(lesson => {
          const lessonKanji = KANJI_DATA.filter(k => k.lesson === lesson.id);
          const learnedCount = lessonKanji.filter(k => learnedIds.includes(k.id)).length;
          const isComplete = learnedCount === lessonKanji.length && lessonKanji.length > 0;
          const isMenuOpen = openMenuLessonId === lesson.id;

          return (
            <div
              key={lesson.id}
              className="bg-[#fffdf8] border border-[#e0d9cc] hover:border-[#1a4a2e]/60 rounded-2xl p-4 shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#c8963e] uppercase tracking-wider">
                    {lesson.title}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isComplete 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-[#f5f0e8] text-[#8c8273]'
                  }`}>
                    {lessonKanji.length} кандзи
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#1a4a2e] mb-1">
                  {lesson.theme}
                </h3>
                <p className="text-xs text-[#6b6b5e] line-clamp-1 mb-3">
                  {lesson.description}
                </p>

                {/* Minimal preview chips */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {lessonKanji.map(k => (
                    <span
                      key={k.id}
                      onClick={() => onSelectKanji(k)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm font-serif cursor-pointer transition-transform hover:scale-105 ${
                        learnedIds.includes(k.id)
                          ? 'bg-emerald-100 text-[#1a4a2e] font-bold border border-emerald-300'
                          : 'bg-[#f5f0e8] text-[#333] border border-[#e0d9cc]'
                      }`}
                      style={{ fontFamily: "'Noto Serif JP', serif" }}
                      title={`${k.kanji} — ${k.meaning}`}
                    >
                      {k.kanji}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Progress and Master Action button with sub-button menu */}
              <div className="pt-2.5 border-t border-[#e0d9cc]/60 flex items-center justify-between gap-3">
                <div className="text-xs text-[#8c8273] font-medium">
                  {learnedCount} / {lessonKanji.length} выучено
                </div>

                <div className="flex items-center gap-1.5 relative">
                  {/* Primary Button */}
                  <button
                    onClick={() => setActiveLessonId(lesson.id)}
                    className="py-1.5 px-3 bg-[#1a4a2e] hover:bg-[#133823] text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-all shadow-xs"
                  >
                    <BookOpen size={13} />
                    <span>Учить урок</span>
                  </button>

                  {/* 1 Master button for sub-actions */}
                  <button
                    onClick={() => setOpenMenuLessonId(isMenuOpen ? null : lesson.id)}
                    className="p-1.5 rounded-xl border border-[#e0d9cc] hover:border-[#1a4a2e] bg-white text-[#1a4a2e] transition-all"
                    title="Ещё действия"
                  >
                    <MoreVertical size={14} />
                  </button>

                  {/* Sub-buttons popover */}
                  {isMenuOpen && (
                    <div className="absolute right-0 bottom-full mb-1.5 w-44 bg-[#fffdf8] border border-[#e0d9cc] rounded-xl shadow-lg p-1.5 z-40 space-y-1 animate-scale-up">
                      <button
                        onClick={() => {
                          setOpenMenuLessonId(null);
                          onStartLessonFlashcards(lesson.id);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#1c1c1c] hover:bg-[#1a4a2e]/10 hover:text-[#1a4a2e] rounded-lg transition-all"
                      >
                        <Layers size={13} className="text-[#1a4a2e]" />
                        <span>Карточки урока</span>
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuLessonId(null);
                          onStartLessonQuiz(lesson.id);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#1c1c1c] hover:bg-[#c8963e]/15 hover:text-[#9e6f21] rounded-lg transition-all"
                      >
                        <GraduationCap size={13} className="text-[#c8963e]" />
                        <span>Тест по уроку</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
