import React, { useState, useMemo } from 'react';
import { KanjiItem, KANJI_DATA } from '../data/kanjiData';
import { speakJapanese } from '../utils/soundHelper';
import { 
  Volume2, 
  RotateCw, 
  Check, 
  X, 
  Shuffle, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface FlashcardsViewProps {
  initialLessonFilter?: number;
  learnedIds: number[];
  favoriteIds: number[];
  onToggleLearned: (id: number) => void;
  onOpenLesson: (lessonId: number) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  initialLessonFilter,
  learnedIds,
  favoriteIds,
  onToggleLearned,
  onOpenLesson
}) => {
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>(initialLessonFilter || 'all');
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'favorites'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shuffledSeed, setShuffledSeed] = useState(0);

  // Single button dropdown state for all deck controls
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Filter pool
  const deck = useMemo(() => {
    let items = KANJI_DATA.filter(item => {
      if (selectedLesson !== 'all' && item.lesson !== selectedLesson) return false;
      if (filterMode === 'unlearned' && learnedIds.includes(item.id)) return false;
      if (filterMode === 'favorites' && !favoriteIds.includes(item.id)) return false;
      return true;
    });

    if (shuffledSeed > 0) {
      items = [...items].sort(() => Math.sin(shuffledSeed * 999) - 0.5);
    }

    return items;
  }, [selectedLesson, filterMode, learnedIds, favoriteIds, shuffledSeed]);

  const currentKanji: KanjiItem | undefined = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleShuffle = () => {
    setShuffledSeed(prev => prev + 1);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  const handleKnow = () => {
    if (currentKanji) {
      if (!learnedIds.includes(currentKanji.id)) {
        onToggleLearned(currentKanji.id);
      }
    }
    handleNext();
  };

  const handleDontKnow = () => {
    if (currentKanji && learnedIds.includes(currentKanji.id)) {
      onToggleLearned(currentKanji.id);
    }
    handleNext();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* ── MINIMAL TOP BAR: Just Counter & 1 Master Dropdown Button ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#1a4a2e] uppercase tracking-wider">
            Карточка
          </span>
          <span className="text-sm font-bold text-[#1c1c1c] bg-[#fffdf8] border border-[#e0d9cc] px-2.5 py-0.5 rounded-lg shadow-xs">
            {deck.length > 0 ? currentIndex + 1 : 0} / {deck.length}
          </span>
        </div>

        {/* Master settings button hiding all sub-buttons */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all shadow-xs ${
              isSettingsOpen 
                ? 'bg-[#1a4a2e] text-white border-[#1a4a2e]' 
                : 'bg-[#fffdf8] text-[#1a4a2e] border-[#e0d9cc] hover:border-[#1a4a2e]'
            }`}
          >
            <SlidersHorizontal size={13} />
            <span>Параметры колоды</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Sub-buttons revealed on click */}
          {isSettingsOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#fffdf8] border border-[#e0d9cc] rounded-2xl shadow-xl p-4 z-40 space-y-3.5 animate-scale-up">
              {/* Sub-buttons: Mode */}
              <div>
                <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider mb-1.5">
                  Режим выборки:
                </div>
                <div className="flex gap-1 bg-[#f5f0e8] p-1 rounded-xl border border-[#e0d9cc] text-xs">
                  <button
                    onClick={() => { setFilterMode('all'); setCurrentIndex(0); setIsFlipped(false); }}
                    className={`flex-1 py-1 rounded-lg font-medium transition-all ${
                      filterMode === 'all' ? 'bg-[#1a4a2e] text-white shadow-xs' : 'text-[#6b6b5e] hover:text-[#1c1c1c]'
                    }`}
                  >
                    Все
                  </button>
                  <button
                    onClick={() => { setFilterMode('unlearned'); setCurrentIndex(0); setIsFlipped(false); }}
                    className={`flex-1 py-1 rounded-lg font-medium transition-all ${
                      filterMode === 'unlearned' ? 'bg-[#1a4a2e] text-white shadow-xs' : 'text-[#6b6b5e] hover:text-[#1c1c1c]'
                    }`}
                  >
                    Невыученные
                  </button>
                  <button
                    onClick={() => { setFilterMode('favorites'); setCurrentIndex(0); setIsFlipped(false); }}
                    className={`flex-1 py-1 rounded-lg font-medium transition-all ${
                      filterMode === 'favorites' ? 'bg-[#1a4a2e] text-white shadow-xs' : 'text-[#6b6b5e] hover:text-[#1c1c1c]'
                    }`}
                  >
                    Избранное
                  </button>
                </div>
              </div>

              {/* Sub-buttons: Lesson filter */}
              <div>
                <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider mb-1.5">
                  Урок:
                </div>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  <button
                    onClick={() => { setSelectedLesson('all'); setCurrentIndex(0); setIsFlipped(false); }}
                    className={`py-1.5 rounded-lg border font-medium transition-all ${
                      selectedLesson === 'all' 
                        ? 'bg-[#1a4a2e] text-white border-[#1a4a2e]' 
                        : 'bg-white border-[#e0d9cc] text-[#555] hover:border-[#1a4a2e]'
                    }`}
                  >
                    Все
                  </button>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <button
                      key={num}
                      onClick={() => { setSelectedLesson(num); setCurrentIndex(0); setIsFlipped(false); }}
                      className={`py-1.5 rounded-lg border font-medium transition-all ${
                        selectedLesson === num 
                          ? 'bg-[#1a4a2e] text-white border-[#1a4a2e]' 
                          : 'bg-white border-[#e0d9cc] text-[#555] hover:border-[#1a4a2e]'
                      }`}
                    >
                      №{num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-button: Shuffle & Close */}
              <div className="pt-2 border-t border-[#e0d9cc]/60 flex items-center justify-between">
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-1.5 text-xs text-[#1a4a2e] hover:bg-[#1a4a2e]/10 px-2.5 py-1.5 rounded-lg font-medium transition-all"
                >
                  <Shuffle size={13} />
                  <span>Перемешать</span>
                </button>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-xs text-[#8c8273] hover:text-[#1c1c1c] font-medium px-2 py-1"
                >
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deck.length === 0 ? (
        <div className="bg-[#fffdf8] border border-[#e0d9cc] rounded-3xl p-10 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center mx-auto">
            <Sparkles size={22} />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1a4a2e]">В колоде нет карточек</h3>
          <p className="text-xs text-[#6b6b5e] max-w-xs mx-auto">
            Все иероглифы в этом уроке уже выучены или нет знаков с выбранным статусом.
          </p>
          <button
            onClick={() => { setSelectedLesson('all'); setFilterMode('all'); }}
            className="mt-2 px-4 py-2 bg-[#1a4a2e] text-white text-xs font-semibold rounded-xl hover:bg-[#133823] transition-all"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        currentKanji && (
          <div className="space-y-4">
            {/* 3D Flip Card Container */}
            <div 
              className="relative w-full h-[370px] sm:h-[390px] perspective-1000 cursor-pointer select-none"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div 
                className={`w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ── CARD FRONT ── */}
                <div className="absolute inset-0 backface-hidden bg-[#fffdf8] border-2 border-[#c8963e]/40 hover:border-[#c8963e] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all">
                  <div className="flex items-center justify-between text-xs text-[#8c8273]">
                    <span className="bg-[#1a4a2e]/8 text-[#1a4a2e] font-semibold px-2.5 py-0.5 rounded-full text-[11px]">
                      Урок {currentKanji.lesson} • {currentKanji.category}
                    </span>
                    <span className="font-medium">
                      {currentKanji.strokes} черт
                    </span>
                  </div>

                  {/* Main Kanji Character */}
                  <div className="flex-1 flex flex-col items-center justify-center my-2">
                    <div 
                      className="text-8xl sm:text-9xl font-serif text-[#1a4a2e] tracking-wider mb-2 transition-transform hover:scale-105"
                      style={{ fontFamily: "'Noto Serif JP', serif" }}
                    >
                      {currentKanji.kanji}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakJapanese(currentKanji.kanji);
                      }}
                      className="flex items-center gap-1.5 text-xs text-[#1a4a2e] bg-[#f5f0e8] hover:bg-[#1a4a2e] hover:text-white px-3 py-1.5 rounded-full font-medium transition-all shadow-xs"
                      title="Озвучить"
                    >
                      <Volume2 size={13} />
                      <span>Произношение</span>
                    </button>

                    {showHint && (
                      <div className="mt-3 p-2 bg-[#f8f5ee] border border-[#c8963e]/40 rounded-xl text-xs text-[#1c1c1c] max-w-sm text-center animate-fade-in">
                        💡 {currentKanji.mnemonic}
                      </div>
                    )}
                  </div>

                  {/* Bottom hint prompt */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#e0d9cc]/60 text-xs text-[#8c8273]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(!showHint);
                      }}
                      className="flex items-center gap-1 text-[#c8963e] hover:text-[#9e6f21] font-medium"
                    >
                      <HelpCircle size={13} />
                      <span>{showHint ? 'Скрыть мнемонику' : 'Подсказка'}</span>
                    </button>

                    <div className="flex items-center gap-1 hover:text-[#1a4a2e]">
                      <RotateCw size={12} />
                      <span>Нажмите для ответа</span>
                    </div>
                  </div>
                </div>

                {/* ── CARD BACK ── */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#fffdf8] border-2 border-[#1a4a2e] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#e0d9cc]">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-serif font-bold text-[#1a4a2e]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                        {currentKanji.kanji}
                      </span>
                      <span className="text-lg font-serif font-bold text-[#1c1c1c]">
                        {currentKanji.meaning}
                      </span>
                    </div>
                    <span className="text-xs bg-[#c8963e]/15 text-[#9e6f21] font-semibold px-2 py-0.5 rounded-md">
                      Урок {currentKanji.lesson}
                    </span>
                  </div>

                  {/* Readings breakdown */}
                  <div className="grid grid-cols-2 gap-2.5 my-2.5">
                    <div className="bg-[#f8f5ee] p-2.5 rounded-xl border border-[#e0d9cc]">
                      <div className="text-[11px] font-semibold text-[#1a4a2e] mb-0.5">
                        Кун (хирагана):
                      </div>
                      <div className="text-base font-medium text-[#1c1c1c]">{currentKanji.kunyomi}</div>
                      <div className="text-xs text-[#1a4a2e] font-semibold">
                        [{currentKanji.kunyomiRu.toUpperCase()}]
                      </div>
                    </div>

                    <div className="bg-[#f8f5ee] p-2.5 rounded-xl border border-[#e0d9cc]">
                      <div className="text-[11px] font-semibold text-[#c8963e] mb-0.5">
                        Он (катакана):
                      </div>
                      <div className="text-base font-medium text-[#1c1c1c]">{currentKanji.onyomi}</div>
                      <div className="text-xs text-[#c8963e] font-semibold">
                        [{currentKanji.onyomiRu.toUpperCase()}]
                      </div>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="space-y-1 flex-1">
                    <div className="text-[11px] font-semibold text-[#8c8273]">Примеры из учебника:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                      {currentKanji.examples.slice(0, 4).map((ex, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-lg border border-[#e0d9cc]">
                          <div className="font-semibold text-[#1a4a2e]">{ex.word} ({ex.readingRu})</div>
                          <div className="text-[#666] text-[11px]">{ex.translation}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-center text-[11px] text-[#8c8273]">
                    Нажмите ещё раз для возврата к иероглифу
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Controls: "Повторить" vs "Знаю!" */}
            <div className="flex items-center gap-3 justify-center pt-1">
              <button
                type="button"
                onClick={handleDontKnow}
                className="flex-1 max-w-[190px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-[#d97736] bg-white text-[#d97736] hover:bg-[#fff7f0] font-semibold text-xs transition-all shadow-xs active:scale-95"
              >
                <X size={16} />
                <span>Повторить</span>
              </button>

              <button
                type="button"
                onClick={handleKnow}
                className="flex-1 max-w-[190px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-[#1a4a2e] bg-[#1a4a2e] text-white hover:bg-[#133823] font-semibold text-xs transition-all shadow-md active:scale-95"
              >
                <Check size={16} />
                <span>Знаю!</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
