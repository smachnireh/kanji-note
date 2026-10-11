import React, { useState } from 'react';
import { KanjiItem } from '../data/kanjiData';
import { KanjiCanvas } from './KanjiCanvas';
import { speakJapanese } from '../utils/soundHelper';
import { 
  X, 
  Volume2, 
  Star, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  PenTool, 
  BookOpen, 
  Lightbulb,
  Hash
} from 'lucide-react';

interface KanjiModalProps {
  kanji: KanjiItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalCount?: number;
  isLearned: boolean;
  isFavorite: boolean;
  onToggleLearned: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export const KanjiModal: React.FC<KanjiModalProps> = ({
  kanji,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex = 0,
  totalCount = 0,
  isLearned,
  isFavorite,
  onToggleLearned,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'practice'>('info');

  if (!isOpen || !kanji) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0a1c12]/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#fffdf8] border border-[#e0d9cc] w-full max-w-2xl max-h-[92vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-scale-up">
        {/* Header with Dark Green & Gold Ribbon */}
        <div className="bg-[#1a4a2e] text-white px-5 py-4 relative flex items-center justify-between border-b border-[#c8963e]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#c8963e]/60 flex items-center justify-center text-xl font-serif text-[#e8c87a]">
              {kanji.kanji}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-emerald-200/80 font-medium flex items-center gap-1.5">
                <span>Урок {kanji.lesson}</span>
                <span>•</span>
                <span>{kanji.category}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><Hash size={11} /> {kanji.strokes} черт</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                {kanji.meaning}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite(kanji.id)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite 
                  ? 'text-[#f5be42] bg-white/15' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={isFavorite ? "В избранном" : "Добавить в избранное"}
            >
              <Star size={19} className={isFavorite ? "fill-current" : ""} />
            </button>
            <button
              onClick={() => onToggleLearned(kanji.id)}
              className={`p-2 rounded-lg transition-colors ${
                isLearned 
                  ? 'text-emerald-300 bg-white/15' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={isLearned ? "Выучено!" : "Отметить как выученный"}
            >
              <CheckCircle2 size={19} className={isLearned ? "fill-current/20" : ""} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors"
              title="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab switcher: Описание vs Пропись */}
        <div className="flex border-b border-[#e0d9cc] bg-[#f5f0e8]/60 px-5 pt-2">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'info'
                ? 'border-[#1a4a2e] text-[#1a4a2e]'
                : 'border-transparent text-[#6b6b5e] hover:text-[#1c1c1c]'
            }`}
          >
            <BookOpen size={16} />
            <span>Значения и примеры</span>
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'practice'
                ? 'border-[#1a4a2e] text-[#1a4a2e]'
                : 'border-transparent text-[#6b6b5e] hover:text-[#1c1c1c]'
            }`}
          >
            <PenTool size={16} />
            <span>Пропись и штрихи</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'info' ? (
            <>
              {/* Top Hero: Kanji display + Pronunciation + Readings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-[#f8f5ee] border border-[#e0d9cc] rounded-2xl p-4 sm:p-5">
                {/* Kanji Character with Sound */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-[#c8963e]/30 shadow-sm relative group">
                  <div className="text-6xl sm:text-7xl font-serif text-[#1a4a2e] mb-1 select-all" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    {kanji.kanji}
                  </div>
                  <button
                    onClick={() => speakJapanese(kanji.kanji)}
                    className="flex items-center gap-1.5 text-xs text-[#1a4a2e] bg-[#1a4a2e]/10 hover:bg-[#1a4a2e] hover:text-white px-2.5 py-1 rounded-full font-medium transition-all"
                    title="Прослушать произношение"
                  >
                    <Volume2 size={13} />
                    <span>Озвучить</span>
                  </button>
                </div>

                {/* Kun and On readings with Russian + English */}
                <div className="sm:col-span-2 space-y-3">
                  {/* Kunyomi */}
                  <div className="p-3 bg-white/90 border border-[#e0d9cc] rounded-xl shadow-xs">
                    <div className="flex items-center justify-between text-xs text-[#6b6b5e] mb-1 font-medium">
                      <span className="flex items-center gap-1.5 text-[#1a4a2e] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#1a4a2e]"></span>
                        Кун-чтение (японское):
                      </span>
                      <span className="text-[11px] text-[#8c8273]">хирагана</span>
                    </div>
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-xl font-medium text-[#1c1c1c]">{kanji.kunyomi}</span>
                      <span className="text-sm font-semibold text-[#1a4a2e] bg-[#1a4a2e]/8 px-2 py-0.5 rounded">
                        [{kanji.kunyomiRu.toUpperCase()}]
                      </span>
                      <span className="text-xs text-[#6b6b5e] font-mono">
                        {kanji.kunyomiRomaji}
                      </span>
                    </div>
                  </div>

                  {/* Onyomi */}
                  <div className="p-3 bg-white/90 border border-[#e0d9cc] rounded-xl shadow-xs">
                    <div className="flex items-center justify-between text-xs text-[#6b6b5e] mb-1 font-medium">
                      <span className="flex items-center gap-1.5 text-[#c8963e] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#c8963e]"></span>
                        Он-чтение (китайское):
                      </span>
                      <span className="text-[11px] text-[#8c8273]">катакана</span>
                    </div>
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-xl font-medium text-[#1c1c1c]">{kanji.onyomi}</span>
                      <span className="text-sm font-semibold text-[#c8963e] bg-[#c8963e]/10 px-2 py-0.5 rounded">
                        [{kanji.onyomiRu.toUpperCase()}]
                      </span>
                      <span className="text-xs text-[#6b6b5e] font-mono">
                        {kanji.onyomiRomaji}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mnemonic / Etymology from textbook */}
              <div className="bg-[#fffdf8] border-l-4 border-[#c8963e] border-y border-r border-[#e0d9cc] p-4 rounded-r-xl shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#c8963e] uppercase tracking-wide mb-1.5">
                  <Lightbulb size={15} />
                  <span>Ассоциация и рисунок из учебника:</span>
                </div>
                <p className="text-sm text-[#2b2b2b] leading-relaxed">
                  {kanji.mnemonic}
                </p>
                {kanji.meaningsAlt && kanji.meaningsAlt.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#e0d9cc]/60 flex items-center flex-wrap gap-1.5 text-xs text-[#6b6b5e]">
                    <span className="font-medium text-[#1c1c1c]">Дополнительные значения:</span>
                    {kanji.meaningsAlt.map((alt, idx) => (
                      <span key={idx} className="bg-[#e0d9cc]/40 text-[#3a3a3a] px-2 py-0.5 rounded-md text-[11px]">
                        {alt}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Compound Words Examples from the textbook */}
              <div>
                <h3 className="text-sm font-bold text-[#1a4a2e] mb-3 flex items-center gap-2">
                  <span className="w-2 h-4 bg-[#1a4a2e] rounded-xs"></span>
                  Примеры слов и словосочетаний:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {kanji.examples.map((ex, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-white border border-[#e0d9cc] hover:border-[#1a4a2e]/60 rounded-xl transition-all shadow-xs flex flex-col justify-between group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-lg font-serif font-medium text-[#1a4a2e] tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                            {ex.word}
                          </div>
                          <div className="text-xs text-[#6b6b5e] flex items-center gap-1.5 mt-0.5">
                            <span className="text-[#1c1c1c] font-medium">{ex.reading}</span>
                            <span>•</span>
                            <span className="text-[#c8963e] font-medium">{ex.readingRu}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => speakJapanese(ex.word)}
                          className="opacity-60 group-hover:opacity-100 p-1.5 rounded-lg text-[#1a4a2e] hover:bg-[#1a4a2e]/10 transition-all"
                          title="Озвучить слово"
                        >
                          <Volume2 size={15} />
                        </button>
                      </div>
                      <div className="mt-2 text-xs font-medium text-[#2d2d2d] pt-1.5 border-t border-dashed border-[#e0d9cc]">
                        {ex.translation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Practice Calligraphy Tab */
            <div className="space-y-4 py-2">
              <div className="text-center max-w-md mx-auto">
                <h3 className="font-serif text-lg font-bold text-[#1a4a2e]">
                  Тренировка прописи иероглифа «{kanji.kanji}»
                </h3>
                <p className="text-xs text-[#6b6b5e] mt-1">
                  Общее число черт: <strong className="text-[#1a4a2e]">{kanji.strokes}</strong>. Нарисуйте иероглиф в традиционной сетке пальцем или мышью.
                </p>
              </div>

              <div className="py-2">
                <KanjiCanvas kanji={kanji.kanji} size={280} />
              </div>

              <div className="bg-[#f8f5ee] p-3 rounded-xl border border-[#e0d9cc] text-xs text-[#555] max-w-md mx-auto text-center">
                💡 <span className="font-medium text-[#1c1c1c]">Совет по правилам написания:</span> горизонтальные черты пишутся слева направо, вертикальные сверху вниз, наружные контуры перед внутренними, а замыкающая черта ставится последней.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Previous / Next navigation */}
        <div className="bg-[#f5f0e8] border-t border-[#e0d9cc] px-5 py-3.5 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e0d9cc] bg-white text-xs font-medium text-[#1c1c1c] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1a4a2e] hover:text-[#1a4a2e] transition-all"
          >
            <ChevronLeft size={16} />
            <span>Пред.</span>
          </button>

          <div className="text-xs text-[#6b6b5e] font-medium">
            Иероглиф <span className="text-[#1a4a2e] font-bold">{currentIndex + 1}</span> из {totalCount}
          </div>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e0d9cc] bg-white text-xs font-medium text-[#1c1c1c] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1a4a2e] hover:text-[#1a4a2e] transition-all"
          >
            <span>След.</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
