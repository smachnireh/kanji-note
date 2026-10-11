/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { KANJI_DATA, KanjiItem, LESSONS_META } from './data/kanjiData';
import { matchesKanji } from './utils/searchHelper';
import { loadProgress, saveProgress, UserProgress, QuizStatRecord } from './utils/storage';
import { speakJapanese } from './utils/soundHelper';
import { KanjiModal } from './components/KanjiModal';
import { FlashcardsView } from './components/FlashcardsView';
import { LessonsView } from './components/LessonsView';
import { QuizView } from './components/QuizView';
import { 
  Search, 
  X, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  BarChart3, 
  Star, 
  CheckCircle2, 
  Volume2, 
  ChevronDown,
  Filter,
  Lightbulb,
  LayoutGrid,
  List,
  Flame, 
  RotateCcw,
  MoreHorizontal
} from 'lucide-react';

type TabType = 'dictionary' | 'lessons' | 'flashcards' | 'quiz' | 'progress';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('dictionary');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedLessonForCards, setSelectedLessonForCards] = useState<number | undefined>(undefined);
  const [selectedLessonForQuiz, setSelectedLessonForQuiz] = useState<number | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Master dropdown states (hiding bunches of buttons into 1)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isHintsDropdownOpen, setIsHintsDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [cardMenuOpenId, setCardMenuOpenId] = useState<number | null>(null);

  // User progress from LocalStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(loadProgress);

  // Modal inspection state
  const [modalKanji, setModalKanji] = useState<KanjiItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close menus on click outside
  useEffect(() => {
    const handleGlobalClick = () => {
      setCardMenuOpenId(null);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Sync to LocalStorage on update
  useEffect(() => {
    saveProgress(userProgress);
  }, [userProgress]);

  // Daily streak check
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (userProgress.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutive = userProgress.lastActiveDate === yesterday;
      setUserProgress(prev => ({
        ...prev,
        dailyStreak: isConsecutive ? prev.dailyStreak + 1 : 1,
        lastActiveDate: today
      }));
    }
  }, []);

  // Toggle Learned
  const handleToggleLearned = (id: number) => {
    setUserProgress(prev => {
      const exists = prev.learnedIds.includes(id);
      const updated = exists 
        ? prev.learnedIds.filter(item => item !== id)
        : [...prev.learnedIds, id];
      return { ...prev, learnedIds: updated };
    });
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: number) => {
    setUserProgress(prev => {
      const exists = prev.favoriteIds.includes(id);
      const updated = exists 
        ? prev.favoriteIds.filter(item => item !== id)
        : [...prev.favoriteIds, id];
      return { ...prev, favoriteIds: updated };
    });
  };

  // Mark Learned from Quiz
  const handleMarkLearnedFromQuiz = (id: number) => {
    setUserProgress(prev => {
      if (!prev.learnedIds.includes(id)) {
        return { ...prev, learnedIds: [...prev.learnedIds, id] };
      }
      return prev;
    });
  };

  // Record Quiz Result
  const handleRecordQuizResult = (record: {
    mode: 'choice' | 'manual';
    lessonId?: number;
    totalQuestions: number;
    correctAnswers: number;
    scorePercent: number;
  }) => {
    const fullRecord: QuizStatRecord = {
      date: new Date().toLocaleDateString('ru-RU'),
      ...record
    };

    setUserProgress(prev => ({
      ...prev,
      quizHistory: [fullRecord, ...prev.quizHistory.slice(0, 19)]
    }));
  };

  // Filtered Kanji list for Dictionary view
  const filteredKanji = useMemo(() => {
    return KANJI_DATA.filter(item => {
      if (selectedFilter === 'learned') {
        if (!userProgress.learnedIds.includes(item.id)) return false;
      } else if (selectedFilter === 'unlearned') {
        if (userProgress.learnedIds.includes(item.id)) return false;
      } else if (selectedFilter === 'favorites') {
        if (!userProgress.favoriteIds.includes(item.id)) return false;
      }

      const categoryFilter = ['learned', 'unlearned', 'favorites'].includes(selectedFilter)
        ? 'all'
        : selectedFilter;

      return matchesKanji(item, searchQuery, categoryFilter);
    });
  }, [searchQuery, selectedFilter, userProgress.learnedIds, userProgress.favoriteIds]);

  // Modal navigation index
  const modalIndex = useMemo(() => {
    if (!modalKanji) return -1;
    return filteredKanji.findIndex(k => k.id === modalKanji.id);
  }, [modalKanji, filteredKanji]);

  const handleOpenKanji = (kanji: KanjiItem) => {
    setModalKanji(kanji);
    setIsModalOpen(true);
  };

  const handlePrevKanji = () => {
    if (modalIndex > 0) {
      setModalKanji(filteredKanji[modalIndex - 1]);
    }
  };

  const handleNextKanji = () => {
    if (modalIndex < filteredKanji.length - 1 && modalIndex >= 0) {
      setModalKanji(filteredKanji[modalIndex + 1]);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevKanji();
      } else if (e.key === 'ArrowRight') {
        handleNextKanji();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, modalIndex, filteredKanji]);

  const handleStartLessonCards = (lessonId: number) => {
    setSelectedLessonForCards(lessonId);
    setActiveTab('flashcards');
  };

  const handleStartLessonQuiz = (lessonId: number) => {
    setSelectedLessonForQuiz(lessonId);
    setActiveTab('quiz');
  };

  const learnedCount = userProgress.learnedIds.length;
  const totalCount = KANJI_DATA.length;
  const progressPct = Math.round((learnedCount / totalCount) * 100);

  // Human label for current filter
  const filterLabel = useMemo(() => {
    const map: Record<string, string> = {
      all: 'Все иероглифы',
      learned: 'Только выученные',
      unlearned: 'В процессе изучения',
      favorites: 'Избранное ★',
      'Стихии': 'Стихии',
      'Числа': 'Числа',
      'Человек': 'Человек',
      'Тело': 'Тело',
      'Еда': 'Еда',
      'Свойства': 'Свойства',
      'Глаголы': 'Глаголы',
      'Время': 'Время'
    };
    if (selectedFilter.startsWith('lesson-')) {
      return `Урок ${selectedFilter.replace('lesson-', '')}`;
    }
    return map[selectedFilter] || selectedFilter;
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1c1c] flex flex-col font-sans">
      {/* ── MINIMALIST HEADER ── */}
      <header className="bg-[#1a4a2e] text-white pt-6 pb-5 px-4 text-center relative overflow-hidden border-b-2 border-[#c8963e]">
        <div className="relative z-10 max-w-xl mx-auto">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white">
            Кандзи Мастер
          </h1>
          <p className="mt-1 text-xs text-emerald-100/75 font-light">
            Японские иероглифы • Базовый курс 93 знака
          </p>
          <div className="w-12 h-0.5 bg-[#c8963e] mx-auto mt-3" />
        </div>
      </header>

      {/* ── TOP NAVIGATION (SLEEK SEGMENTED CONTROL) ── */}
      <div className="bg-[#fffdf8] border-b border-[#e0d9cc] sticky top-0 z-30 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between">
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'dictionary', label: 'Словарь', icon: BookOpen },
              { id: 'lessons', label: 'Уроки', icon: GraduationCap },
              { id: 'flashcards', label: 'Карточки', icon: Layers },
              { id: 'quiz', label: 'Тесты', icon: GraduationCap },
              { id: 'progress', label: 'Прогресс', icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#1a4a2e] text-white font-semibold shadow-xs'
                      : 'text-[#6b6b5e] hover:text-[#1c1c1c] hover:bg-[#f5f0e8]'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Counter */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium pl-3 border-l border-[#e0d9cc]">
            <span className="text-[#c8963e] flex items-center gap-1">
              <Flame size={14} />
              {userProgress.dailyStreak} дн.
            </span>
            <span className="text-[#1a4a2e] font-bold">
              {learnedCount}/{totalCount}
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1">
        {activeTab === 'dictionary' && (
          <div className="max-w-3xl mx-auto px-4 py-5 space-y-3.5">
            {/* Minimal Search Input */}
            <div className="bg-[#fffdf8] border-2 border-[#e0d9cc] focus-within:border-[#1a4a2e] rounded-2xl p-2 sm:p-2.5 shadow-xs transition-all flex items-center gap-2">
              <Search size={18} className="text-[#8c8273] ml-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск: 'хи', 'мидзу', 'огонь', 'ка', 'hi' или кандзи..."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#1c1c1c] placeholder:text-[#8c8273]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg text-[#8c8273] hover:text-[#1c1c1c] hover:bg-[#f5f0e8] transition-colors"
                  title="Очистить"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* ── MASTER BUTTONS: HIDING ALL SUB-BUTTONS INTO 3 CLEAN DROPDOWNS ── */}
            <div className="flex items-center justify-between gap-2 text-xs select-none relative">
              <div className="flex items-center gap-2 flex-wrap">
                {/* 1. Master Button: FILTERS */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFilterDropdownOpen(!isFilterDropdownOpen);
                      setIsHintsDropdownOpen(false);
                      setIsViewDropdownOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition-all shadow-xs ${
                      isFilterDropdownOpen || selectedFilter !== 'all'
                        ? 'bg-[#1a4a2e] text-white border-[#1a4a2e]'
                        : 'bg-[#fffdf8] text-[#1a4a2e] border-[#e0d9cc] hover:border-[#1a4a2e]'
                    }`}
                  >
                    <Filter size={13} />
                    <span>Фильтр: {filterLabel}</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Sub-buttons for Filters */}
                  {isFilterDropdownOpen && (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-[#fffdf8] border border-[#e0d9cc] rounded-2xl shadow-xl p-3.5 z-40 space-y-3 animate-scale-up"
                    >
                      {/* Sub-buttons: Status */}
                      <div>
                        <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider mb-1.5">
                          По статусу:
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {[
                            { id: 'all', label: 'Все (93)' },
                            { id: 'learned', label: `Выучено (${learnedCount})` },
                            { id: 'unlearned', label: `Учу (${totalCount - learnedCount})` },
                            { id: 'favorites', label: `Избранное ★ (${userProgress.favoriteIds.length})` }
                          ].map(f => (
                            <button
                              key={f.id}
                              onClick={() => {
                                setSelectedFilter(f.id);
                                setIsFilterDropdownOpen(false);
                              }}
                              className={`p-1.5 rounded-lg border font-medium text-left transition-all ${
                                selectedFilter === f.id
                                  ? 'bg-[#1a4a2e] text-white border-[#1a4a2e]'
                                  : 'bg-white border-[#e0d9cc] text-[#444] hover:border-[#1a4a2e]'
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sub-buttons: Categories */}
                      <div>
                        <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider mb-1.5">
                          По тематике:
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-xs">
                          {['Стихии', 'Числа', 'Человек', 'Тело', 'Еда', 'Свойства', 'Глаголы', 'Время'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedFilter(cat);
                                setIsFilterDropdownOpen(false);
                              }}
                              className={`py-1.5 px-2 rounded-lg border font-medium text-center transition-all ${
                                selectedFilter === cat
                                  ? 'bg-[#1a4a2e] text-white border-[#1a4a2e]'
                                  : 'bg-white border-[#e0d9cc] text-[#444] hover:border-[#1a4a2e]'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sub-buttons: Lessons */}
                      <div>
                        <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider mb-1.5">
                          По урокам:
                        </div>
                        <div className="grid grid-cols-5 gap-1 text-xs">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(lNum => (
                            <button
                              key={lNum}
                              onClick={() => {
                                setSelectedFilter(`lesson-${lNum}`);
                                setIsFilterDropdownOpen(false);
                              }}
                              className={`py-1 rounded-lg border font-medium text-center transition-all ${
                                selectedFilter === `lesson-${lNum}`
                                  ? 'bg-[#1a4a2e] text-white border-[#1a4a2e]'
                                  : 'bg-white border-[#e0d9cc] text-[#444] hover:border-[#1a4a2e]'
                              }`}
                            >
                              №{lNum}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#e0d9cc]/60 flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedFilter('all');
                            setIsFilterDropdownOpen(false);
                          }}
                          className="text-xs text-[#8c8273] hover:text-[#1a4a2e] font-medium"
                        >
                          Сбросить фильтр
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Master Button: HINTS */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsHintsDropdownOpen(!isHintsDropdownOpen);
                      setIsFilterDropdownOpen(false);
                      setIsViewDropdownOpen(false);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-medium transition-all shadow-xs ${
                      isHintsDropdownOpen
                        ? 'bg-[#c8963e] text-white border-[#c8963e]'
                        : 'bg-[#fffdf8] text-[#8c8273] border-[#e0d9cc] hover:border-[#c8963e] hover:text-[#9e6f21]'
                    }`}
                    title="Подсказки поиска"
                  >
                    <Lightbulb size={13} />
                    <span>Подсказки</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${isHintsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Sub-buttons for Search Hints */}
                  {isHintsDropdownOpen && (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute left-0 top-full mt-2 w-64 bg-[#fffdf8] border border-[#e0d9cc] rounded-2xl shadow-xl p-3 z-40 space-y-2 animate-scale-up"
                    >
                      <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider">
                        Нажмите для быстрого поиска:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['хи', 'огонь', 'мидзу', 'вода', 'ка', 'золото', 'женщина', 'человек', 'время', 'урок 1'].map(tag => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setSearchQuery(tag);
                              setIsHintsDropdownOpen(false);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#e0d9cc] hover:border-[#1a4a2e] hover:text-[#1a4a2e] text-[#444] text-xs font-medium transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Master Button: VIEW MODE */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsViewDropdownOpen(!isViewDropdownOpen);
                    setIsFilterDropdownOpen(false);
                    setIsHintsDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#e0d9cc] bg-[#fffdf8] text-[#6b6b5e] hover:text-[#1c1c1c] text-xs font-medium transition-all shadow-xs"
                  title="Режим отображения"
                >
                  {viewMode === 'grid' ? <LayoutGrid size={13} /> : <List size={13} />}
                  <span className="hidden sm:inline">{viewMode === 'grid' ? 'Плитка' : 'Список'}</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${isViewDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isViewDropdownOpen && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-2 w-36 bg-[#fffdf8] border border-[#e0d9cc] rounded-xl shadow-lg p-1.5 z-40 space-y-1 animate-scale-up"
                  >
                    <button
                      onClick={() => { setViewMode('grid'); setIsViewDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                        viewMode === 'grid' ? 'bg-[#1a4a2e] text-white font-medium' : 'text-[#444] hover:bg-[#f5f0e8]'
                      }`}
                    >
                      <LayoutGrid size={13} />
                      <span>Плитка</span>
                    </button>
                    <button
                      onClick={() => { setViewMode('list'); setIsViewDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-[#1a4a2e] text-white font-medium' : 'text-[#444] hover:bg-[#f5f0e8]'
                      }`}
                    >
                      <List size={13} />
                      <span>Список</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Results Counter */}
            <div className="text-[11px] text-[#8c8273] px-1">
              Найдено: <strong className="text-[#1a4a2e] font-semibold">{filteredKanji.length}</strong> иероглифов
            </div>

            {/* ── KANJI ITEMS: GRID OR COMPACT LIST ── */}
            {filteredKanji.length === 0 ? (
              <div className="bg-[#fffdf8] border border-[#e0d9cc] rounded-3xl p-10 text-center space-y-3">
                <h3 className="font-serif text-base font-bold text-[#1c1c1c]">Ничего не найдено</h3>
                <p className="text-xs text-[#6b6b5e]">
                  По запросу «{searchQuery}» совпадений нет. Попробуйте ввести чтение по-русски (например «хи» или «мидзу»).
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
                  className="px-4 py-2 bg-[#1a4a2e] text-white text-xs font-semibold rounded-xl hover:bg-[#133823] transition-all"
                >
                  Сбросить
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredKanji.map(item => {
                  const isLearned = userProgress.learnedIds.includes(item.id);
                  const isFavorite = userProgress.favoriteIds.includes(item.id);
                  const isMenuOpen = cardMenuOpenId === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpenKanji(item)}
                      className="bg-[#fffdf8] border border-[#e0d9cc] hover:border-[#1a4a2e] rounded-2xl p-3.5 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group relative"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Big Kanji */}
                        <div 
                          className="w-13 h-13 rounded-xl bg-[#f8f5ee] border border-[#c8963e]/40 flex items-center justify-center text-3xl font-serif text-[#1a4a2e] group-hover:scale-105 transition-transform shrink-0"
                          style={{ fontFamily: "'Noto Serif JP', serif" }}
                        >
                          {item.kanji}
                        </div>

                        {/* Meaning & Readings */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1c1c1c] group-hover:text-[#1a4a2e] transition-colors truncate">
                              {item.meaning}
                            </h3>
                            {isLearned && (
                              <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                            )}
                            {isFavorite && (
                              <Star size={13} className="text-[#f5be42] fill-current shrink-0" />
                            )}
                          </div>

                          <div className="text-[11px] text-[#666] space-y-0.5 mt-0.5 truncate">
                            <div className="truncate">
                              <span className="text-[#1a4a2e] font-medium">Кун:</span> {item.kunyomi}{' '}
                              <span className="text-[#1a4a2e] font-semibold">[{item.kunyomiRu}]</span>
                            </div>
                            <div className="truncate">
                              <span className="text-[#c8963e] font-medium">Он:</span> {item.onyomi}{' '}
                              <span className="text-[#c8963e] font-semibold">[{item.onyomiRu}]</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 1 Master Action Button for the card */}
                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => speakJapanese(item.kanji)}
                          className="p-1.5 rounded-lg text-[#1a4a2e] hover:bg-[#1a4a2e]/10 transition-colors"
                          title="Озвучить"
                        >
                          <Volume2 size={15} />
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardMenuOpenId(isMenuOpen ? null : item.id);
                            }}
                            className="p-1.5 rounded-lg text-[#8c8273] hover:text-[#1c1c1c] hover:bg-[#f5f0e8] transition-colors"
                            title="Действия"
                          >
                            <MoreHorizontal size={15} />
                          </button>

                          {/* Sub-buttons for this specific card */}
                          {isMenuOpen && (
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 w-44 bg-[#fffdf8] border border-[#e0d9cc] rounded-xl shadow-xl p-1 z-40 space-y-0.5 animate-scale-up text-xs"
                            >
                              <button
                                onClick={() => {
                                  handleToggleLearned(item.id);
                                  setCardMenuOpenId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#f5f0e8] text-left transition-colors"
                              >
                                <CheckCircle2 size={13} className={isLearned ? "text-emerald-700" : "text-[#aaa]"} />
                                <span>{isLearned ? 'Снять отметку' : 'Выучено'}</span>
                              </button>

                              <button
                                onClick={() => {
                                  handleToggleFavorite(item.id);
                                  setCardMenuOpenId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#f5f0e8] text-left transition-colors"
                              >
                                <Star size={13} className={isFavorite ? "text-[#f5be42] fill-current" : "text-[#aaa]"} />
                                <span>{isFavorite ? 'Из избранного' : 'В избранное'}</span>
                              </button>

                              <button
                                onClick={() => {
                                  setCardMenuOpenId(null);
                                  handleOpenKanji(item);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#f5f0e8] text-left transition-colors"
                              >
                                <BookOpen size={13} className="text-[#1a4a2e]" />
                                <span>Полный разбор</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* COMPACT LIST VIEW (Like Constitution articles) */
              <div className="space-y-1.5">
                {filteredKanji.map(item => {
                  const isLearned = userProgress.learnedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpenKanji(item)}
                      className="bg-[#fffdf8] border border-[#e0d9cc] hover:border-[#1a4a2e] rounded-xl p-2.5 px-3.5 shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span 
                          className="font-serif text-xl text-[#1a4a2e] font-bold shrink-0 w-8 text-center"
                          style={{ fontFamily: "'Noto Serif JP', serif" }}
                        >
                          {item.kanji}
                        </span>
                        <div className="truncate text-xs font-semibold text-[#1c1c1c] group-hover:text-[#1a4a2e] transition-colors">
                          {item.meaning}
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#777] truncate">
                          <span>{item.kunyomi} [{item.kunyomiRu}]</span>
                          <span>•</span>
                          <span>{item.onyomi} [{item.onyomiRu}]</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#8c8273] shrink-0">
                        <span className="text-[11px] bg-[#f5f0e8] px-2 py-0.5 rounded-md">
                          Урок {item.lesson}
                        </span>
                        {isLearned && <CheckCircle2 size={14} className="text-emerald-700" />}
                        <span className="text-[#c8963e]">→</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'lessons' && (
          <LessonsView
            learnedIds={userProgress.learnedIds}
            onToggleLearned={handleToggleLearned}
            onSelectKanji={handleOpenKanji}
            onStartLessonQuiz={handleStartLessonQuiz}
            onStartLessonFlashcards={handleStartLessonCards}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            initialLessonFilter={selectedLessonForCards}
            learnedIds={userProgress.learnedIds}
            favoriteIds={userProgress.favoriteIds}
            onToggleLearned={handleToggleLearned}
            onOpenLesson={(lId) => {
              setActiveTab('lessons');
            }}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            initialLessonId={selectedLessonForQuiz}
            onRecordQuizResult={handleRecordQuizResult}
            onMarkLearned={handleMarkLearnedFromQuiz}
          />
        )}

        {activeTab === 'progress' && (
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 animate-fade-in">
            <div className="bg-[#fffdf8] border-2 border-[#c8963e]/40 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#1a4a2e]">
                    Ваш прогресс
                  </h2>
                  <p className="text-xs text-[#6b6b5e]">
                    Сохраняется локально в LocalStorage
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#c8963e] bg-[#f5f0e8] px-3 py-1.5 rounded-xl border border-[#e0d9cc]">
                  <Flame size={15} />
                  <span>{userProgress.dailyStreak} дней подряд</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="bg-[#f8f5ee] p-3 rounded-2xl border border-[#e0d9cc]">
                  <div className="text-2xl font-serif font-bold text-[#1a4a2e]">{learnedCount}</div>
                  <div className="text-[11px] text-[#6b6b5e] mt-0.5">Выучено</div>
                </div>
                <div className="bg-[#f8f5ee] p-3 rounded-2xl border border-[#e0d9cc]">
                  <div className="text-2xl font-serif font-bold text-[#c8963e]">{progressPct}%</div>
                  <div className="text-[11px] text-[#6b6b5e] mt-0.5">Курс</div>
                </div>
                <div className="bg-[#f8f5ee] p-3 rounded-2xl border border-[#e0d9cc]">
                  <div className="text-2xl font-serif font-bold text-[#d97736]">{userProgress.favoriteIds.length}</div>
                  <div className="text-[11px] text-[#6b6b5e] mt-0.5">В избранном</div>
                </div>
                <div className="bg-[#f8f5ee] p-3 rounded-2xl border border-[#e0d9cc]">
                  <div className="text-2xl font-serif font-bold text-[#2980b9]">{userProgress.quizHistory.length}</div>
                  <div className="text-[11px] text-[#6b6b5e] mt-0.5">Тестов</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#6b6b5e]">
                  <span>Курс (93 иероглифа)</span>
                  <span className="font-semibold text-[#1a4a2e]">{learnedCount} / {totalCount}</span>
                </div>
                <div className="w-full bg-[#e0d9cc] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1a4a2e] h-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Reset button */}
              <div className="pt-3 border-t border-[#e0d9cc] flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Сбросить весь сохраненный прогресс?')) {
                      const fresh: UserProgress = {
                        learnedIds: [],
                        inProgressIds: [],
                        favoriteIds: [],
                        quizHistory: [],
                        dailyStreak: 1,
                        lastActiveDate: new Date().toISOString().split('T')[0]
                      };
                      setUserProgress(fresh);
                      saveProgress(fresh);
                    }
                  }}
                  className="flex items-center gap-1 text-xs text-rose-700 hover:text-rose-900 font-medium"
                >
                  <RotateCcw size={12} />
                  <span>Сбросить прогресс</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a4a2e] text-white/60 py-4 px-4 text-center text-[11px] border-t border-[#c8963e]/40 mt-auto">
        Кандзи Мастер • 93 иероглифа из учебника • Автономная работа в браузере (LocalStorage)
      </footer>

      {/* ── MODAL INSPECTOR ── */}
      <KanjiModal
        kanji={modalKanji}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPrev={handlePrevKanji}
        onNext={handleNextKanji}
        hasPrev={modalIndex > 0}
        hasNext={modalIndex < filteredKanji.length - 1 && modalIndex >= 0}
        currentIndex={modalIndex >= 0 ? modalIndex : 0}
        totalCount={filteredKanji.length}
        isLearned={modalKanji ? userProgress.learnedIds.includes(modalKanji.id) : false}
        isFavorite={modalKanji ? userProgress.favoriteIds.includes(modalKanji.id) : false}
        onToggleLearned={handleToggleLearned}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
