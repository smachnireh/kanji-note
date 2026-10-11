import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { KanjiItem, KANJI_DATA, LESSONS_META } from '../data/kanjiData';
import { KanjiCanvas } from './KanjiCanvas';
import { normalizeText } from '../utils/searchHelper';
import { speakJapanese } from '../utils/soundHelper';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  RotateCcw, 
  Trophy, 
  ArrowRight,
  ChevronDown,
  Check,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface QuizViewProps {
  initialLessonId?: number;
  onRecordQuizResult: (record: {
    mode: 'choice' | 'manual';
    lessonId?: number;
    totalQuestions: number;
    correctAnswers: number;
    scorePercent: number;
  }) => void;
  onMarkLearned: (id: number) => void;
}

interface Question {
  type: 'kanji-to-meaning' | 'meaning-to-kanji' | 'kanji-to-reading' | 'manual-input';
  target: KanjiItem;
  options?: string[];
  correctAnswer: string;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialLessonId,
  onRecordQuizResult,
  onMarkLearned
}) => {
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>(initialLessonId || 'all');
  const [testMode, setTestMode] = useState<'choice' | 'manual'>('choice');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Accordion state to collapse options into single buttons
  const [openSection, setOpenSection] = useState<'mode' | 'lesson' | 'count' | null>(null);

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [answeredResults, setAnsweredResults] = useState<{ kanji: KanjiItem; correct: boolean }[]>([]);

  // Generate Questions
  const startQuiz = () => {
    let pool = KANJI_DATA.filter(k => selectedLesson === 'all' || k.lesson === selectedLesson);
    if (pool.length === 0) pool = KANJI_DATA;

    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const chosenItems = shuffledPool.slice(0, Math.min(questionCount, shuffledPool.length));

    const generated: Question[] = chosenItems.map((item, idx) => {
      if (testMode === 'manual') {
        return {
          type: 'manual-input',
          target: item,
          correctAnswer: item.meaning
        };
      }

      const typeMod = idx % 3;
      if (typeMod === 0) {
        const distractors = KANJI_DATA
          .filter(k => k.id !== item.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(k => k.meaning);
        const options = [...distractors, item.meaning].sort(() => Math.random() - 0.5);
        return {
          type: 'kanji-to-meaning',
          target: item,
          options,
          correctAnswer: item.meaning
        };
      } else if (typeMod === 1) {
        const distractors = KANJI_DATA
          .filter(k => k.id !== item.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(k => k.kanji);
        const options = [...distractors, item.kanji].sort(() => Math.random() - 0.5);
        return {
          type: 'meaning-to-kanji',
          target: item,
          options,
          correctAnswer: item.kanji
        };
      } else {
        const formatReading = (k: KanjiItem) => 
          k.kunyomi !== '-' ? `${k.kunyomi} [${k.kunyomiRu}]` : `${k.onyomi} [${k.onyomiRu}]`;
        const correctStr = formatReading(item);

        const distractors = KANJI_DATA
          .filter(k => k.id !== item.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(formatReading);
        const options = [...distractors, correctStr].sort(() => Math.random() - 0.5);
        return {
          type: 'kanji-to-reading',
          target: item,
          options,
          correctAnswer: correctStr
        };
      }
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setManualInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setAnsweredResults([]);
    setIsStarted(true);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option === currentQ.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
      onMarkLearned(currentQ.target.id);
    }
    setAnsweredResults(prev => [...prev, { kanji: currentQ.target, correct }]);
  };

  const handleCheckManual = () => {
    if (isAnswered) return;
    const input = normalizeText(manualInput);
    if (!input) return;

    const target = currentQ.target;
    const meaningMatch = normalizeText(target.meaning) === input ||
      (target.meaningsAlt && target.meaningsAlt.some(alt => normalizeText(alt) === input));

    const kunRuMatch = normalizeText(target.kunyomiRu).split(' ').some(part => part === input);
    const onRuMatch = normalizeText(target.onyomiRu).split(' ').some(part => part === input);

    const kunRoMatch = target.kunyomiRomaji.toLowerCase().split(' ').includes(input);
    const onRoMatch = target.onyomiRomaji.toLowerCase().split(' ').includes(input);

    const kanjiMatch = target.kanji === manualInput.trim();
    const kanaMatch = target.kunyomi === manualInput.trim() || target.onyomi === manualInput.trim();

    const correct = meaningMatch || kunRuMatch || onRuMatch || kunRoMatch || onRoMatch || kanjiMatch || kanaMatch;

    setIsAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
      onMarkLearned(target.id);
    }
    setAnsweredResults(prev => [...prev, { kanji: target, correct }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setManualInput('');
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      const total = questions.length;
      const pct = Math.round((score / total) * 100);

      onRecordQuizResult({
        mode: testMode,
        lessonId: selectedLesson === 'all' ? undefined : selectedLesson,
        totalQuestions: total,
        correctAnswers: score,
        scorePercent: pct
      });

      setIsFinished(true);

      if (pct >= 80) {
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  // Setup Screen (Minimalist: each category is 1 clean button expanding sub-buttons)
  if (!isStarted) {
    const selectedLessonObj = LESSONS_META.find(l => l.id === selectedLesson);

    return (
      <div className="max-w-xl mx-auto px-4 py-8 animate-fade-in">
        <div className="bg-[#fffdf8] border-2 border-[#c8963e]/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl font-serif font-bold text-[#1a4a2e]">
              Интерактивный тест
            </h2>
            <p className="text-xs text-[#6b6b5e]">
              Настройте формат проверки и проверьте свои знания
            </p>
          </div>

          <div className="space-y-3">
            {/* 1. Master Button: Format */}
            <div className="border border-[#e0d9cc] rounded-2xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenSection(openSection === 'mode' ? null : 'mode')}
                className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-[#1a4a2e] hover:bg-[#f5f0e8]/50 transition-colors"
              >
                <span>Формат теста: <strong className="text-[#1c1c1c] font-bold">{testMode === 'choice' ? 'Выбор из 4 ответов' : 'Ручной ввод и пропись'}</strong></span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${openSection === 'mode' ? 'rotate-180' : ''}`} />
              </button>

              {openSection === 'mode' && (
                <div className="p-3 pt-0 border-t border-[#e0d9cc]/60 grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => { setTestMode('choice'); setOpenSection(null); }}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      testMode === 'choice'
                        ? 'border-[#1a4a2e] bg-[#1a4a2e]/10 text-[#1a4a2e] font-semibold'
                        : 'border-[#e0d9cc] text-[#555] hover:border-[#1a4a2e]'
                    }`}
                  >
                    Выбор ответа (тест)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTestMode('manual'); setOpenSection(null); }}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      testMode === 'manual'
                        ? 'border-[#1a4a2e] bg-[#1a4a2e]/10 text-[#1a4a2e] font-semibold'
                        : 'border-[#e0d9cc] text-[#555] hover:border-[#1a4a2e]'
                    }`}
                  >
                    Ручной ввод и пропись
                  </button>
                </div>
              )}
            </div>

            {/* 2. Master Button: Lesson material */}
            <div className="border border-[#e0d9cc] rounded-2xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenSection(openSection === 'lesson' ? null : 'lesson')}
                className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-[#1a4a2e] hover:bg-[#f5f0e8]/50 transition-colors"
              >
                <span>Материал: <strong className="text-[#1c1c1c] font-bold">{selectedLesson === 'all' ? 'Весь курс (93 кандзи)' : `${selectedLessonObj?.title} (${selectedLessonObj?.theme})`}</strong></span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${openSection === 'lesson' ? 'rotate-180' : ''}`} />
              </button>

              {openSection === 'lesson' && (
                <div className="p-3 pt-0 border-t border-[#e0d9cc]/60 space-y-1.5 mt-2 max-h-52 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => { setSelectedLesson('all'); setOpenSection(null); }}
                    className={`w-full text-left p-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedLesson === 'all' ? 'bg-[#1a4a2e] text-white' : 'text-[#333] hover:bg-[#f5f0e8]'
                    }`}
                  >
                    Весь курс (все 93 иероглифа)
                  </button>
                  {LESSONS_META.map(l => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => { setSelectedLesson(l.id); setOpenSection(null); }}
                      className={`w-full text-left p-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedLesson === l.id ? 'bg-[#1a4a2e] text-white' : 'text-[#333] hover:bg-[#f5f0e8]'
                      }`}
                    >
                      {l.title}: {l.theme}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Master Button: Question Count */}
            <div className="border border-[#e0d9cc] rounded-2xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenSection(openSection === 'count' ? null : 'count')}
                className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-[#1a4a2e] hover:bg-[#f5f0e8]/50 transition-colors"
              >
                <span>Количество вопросов: <strong className="text-[#1c1c1c] font-bold">{questionCount}</strong></span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${openSection === 'count' ? 'rotate-180' : ''}`} />
              </button>

              {openSection === 'count' && (
                <div className="p-3 pt-0 border-t border-[#e0d9cc]/60 flex gap-1.5 mt-2">
                  {[5, 10, 15, 20].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => { setQuestionCount(cnt); setOpenSection(null); }}
                      className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${
                        questionCount === cnt
                          ? 'bg-[#1a4a2e] text-white border-[#1a4a2e] font-bold'
                          : 'bg-white border-[#e0d9cc] text-[#555] hover:border-[#1a4a2e]'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={startQuiz}
            className="w-full py-3.5 bg-[#1a4a2e] hover:bg-[#133823] text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm active:scale-98"
          >
            <span>Начать тест</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Quiz Finished
  if (isFinished) {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);

    return (
      <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
        <div className="bg-[#fffdf8] border-2 border-[#c8963e] rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#c8963e]/20 text-[#c8963e] flex items-center justify-center mx-auto">
            <Trophy size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1a4a2e]">
              {pct >= 80 ? 'Отличный результат!' : pct >= 50 ? 'Хорошо!' : 'Продолжайте тренировку!'}
            </h2>
            <div className="text-4xl font-serif font-black text-[#1a4a2e] my-2">
              {pct}%
            </div>
            <p className="text-xs text-[#6b6b5e]">
              Правильно: <strong className="text-[#1a4a2e]">{score}</strong> из {total} вопросов
            </p>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => setIsStarted(false)}
              className="flex-1 py-2.5 px-3 border border-[#e0d9cc] bg-white text-[#1c1c1c] font-semibold text-xs rounded-xl hover:border-[#1a4a2e] transition-all"
            >
              Настройки теста
            </button>
            <button
              onClick={startQuiz}
              className="flex-1 py-2.5 px-3 bg-[#1a4a2e] text-white font-semibold text-xs rounded-xl hover:bg-[#133823] transition-all shadow-md"
            >
              Пройти снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz Question
  return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-fade-in">
      {/* Top Header info */}
      <div className="flex items-center justify-between mb-4 text-xs text-[#8c8273]">
        <div>
          Вопрос <strong className="text-[#1a4a2e] font-bold">{currentIndex + 1}</strong> из {questions.length}
        </div>
        <div className="flex items-center gap-3">
          <span>Счёт: <strong className="text-[#1a4a2e]">{score}</strong></span>
          <button
            onClick={() => setIsStarted(false)}
            className="hover:text-rose-700 transition-colors"
          >
            Выход
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#fffdf8] border-2 border-[#c8963e]/40 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5">
        <div className="text-center space-y-1.5">
          {currentQ.type === 'meaning-to-kanji' ? (
            <>
              <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider">
                Какой иероглиф означает:
              </div>
              <div className="text-2xl font-serif font-bold text-[#1a4a2e]">
                «{currentQ.target.meaning}»
              </div>
            </>
          ) : (
            <>
              <div className="text-[11px] font-semibold text-[#8c8273] uppercase tracking-wider">
                {currentQ.type === 'kanji-to-reading' 
                  ? 'Какое чтение у иероглифа:' 
                  : 'Какой перевод у иероглифа:'}
              </div>
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="text-7xl font-serif text-[#1a4a2e] select-none"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {currentQ.target.kanji}
                </div>
                <button
                  type="button"
                  onClick={() => speakJapanese(currentQ.target.kanji)}
                  className="p-1.5 rounded-full bg-[#f5f0e8] text-[#1a4a2e] hover:bg-[#1a4a2e] hover:text-white transition-all shadow-xs"
                  title="Озвучить"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Answer Options */}
        {testMode === 'choice' && currentQ.options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {currentQ.options.map((option, idx) => {
              let btnClass = "bg-white border-[#e0d9cc] text-[#1c1c1c] hover:border-[#1a4a2e]";

              if (isAnswered) {
                if (option === currentQ.correctAnswer) {
                  btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs";
                } else if (option === selectedOption) {
                  btnClass = "bg-rose-50 border-rose-500 text-rose-900";
                } else {
                  btnClass = "opacity-40 border-[#e0d9cc]";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option)}
                  className={`p-3.5 rounded-xl border-2 text-center text-xs sm:text-sm font-medium transition-all ${btnClass} ${
                    currentQ.type === 'meaning-to-kanji' ? 'text-2xl font-serif py-4' : ''
                  }`}
                  style={currentQ.type === 'meaning-to-kanji' ? { fontFamily: "'Noto Serif JP', serif" } : {}}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          /* Manual Input */
          <div className="space-y-3 pt-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={manualInput}
                disabled={isAnswered}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isAnswered) {
                    handleCheckManual();
                  }
                }}
                placeholder="Перевод или чтение: 'хи', 'огонь', 'hi'..."
                className="flex-1 bg-[#f8f5ee] border-2 border-[#e0d9cc] focus:border-[#1a4a2e] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1c1c1c] font-medium outline-none transition-colors"
              />
              {!isAnswered && (
                <button
                  type="button"
                  onClick={handleCheckManual}
                  className="px-4 py-2.5 bg-[#1a4a2e] hover:bg-[#133823] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                >
                  Проверить
                </button>
              )}
            </div>

            <div className="pt-1">
              <KanjiCanvas kanji={currentQ.target.kanji} size={200} />
            </div>
          </div>
        )}

        {/* Feedback After Answering */}
        {isAnswered && (
          <div className={`p-3.5 rounded-2xl border-2 animate-fade-in ${
            isCorrect 
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950' 
              : 'bg-rose-50/80 border-rose-400 text-rose-950'
          }`}>
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  <span>Правильно!</span>
                </>
              ) : (
                <>
                  <XCircle size={16} className="text-rose-700" />
                  <span>Разбор:</span>
                </>
              )}
            </div>

            <div className="text-xs space-y-0.5">
              <div>
                {currentQ.target.kanji} — <strong className="text-[#1a4a2e]">{currentQ.target.meaning}</strong>
              </div>
              <div className="text-[11px] text-[#555]">
                Кун: {currentQ.target.kunyomi} [{currentQ.target.kunyomiRu.toUpperCase()}] • Он: {currentQ.target.onyomi} [{currentQ.target.onyomiRu.toUpperCase()}]
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="mt-3 w-full py-2.5 bg-[#1a4a2e] hover:bg-[#133823] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1"
            >
              <span>{currentIndex < questions.length - 1 ? 'Дальше' : 'Завершить'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
