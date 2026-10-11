import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Eye, EyeOff, Sparkles } from 'lucide-react';

interface KanjiCanvasProps {
  kanji: string;
  size?: number;
  onDrawFinish?: () => void;
}

export const KanjiCanvas: React.FC<KanjiCanvasProps> = ({
  kanji,
  size = 260,
  onDrawFinish
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#1a4a2e'; // Royal dark green ink
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (onDrawFinish) onDrawFinish();
    }
  };

  // Reset when kanji changes
  useEffect(() => {
    clearCanvas();
  }, [kanji]);

  return (
    <div className="flex flex-col items-center select-none">
      <div 
        className="relative bg-[#fffdf8] border-2 border-[#c8963e]/60 rounded-xl overflow-hidden shadow-inner touch-none cursor-crosshair"
        style={{ width: size, height: size }}
      >
        {/* Calligraphy Rice Paper Grid (田-style with dotted diagonals & crosshair) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="w-full h-full border border-dashed border-[#c8963e]" />
          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-[#c8963e]" />
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-[#c8963e]" />
          <svg className="absolute inset-0 w-full h-full text-[#c8963e]/40">
            <line x1="0" y1="0" x2={size} y2={size} stroke="currentColor" strokeDasharray="4 4" />
            <line x1={size} y1="0" x2="0" y2={size} stroke="currentColor" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Faint Background Guide Character */}
        {showGuide && (
          <div 
            className="absolute inset-0 flex items-center justify-center font-serif text-[#1a4a2e]/15 pointer-events-none select-none transition-opacity duration-200"
            style={{ fontSize: `${size * 0.7}px`, fontFamily: "'Noto Serif JP', serif" }}
          >
            {kanji}
          </div>
        )}

        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="absolute inset-0 z-10"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Canvas Tool Buttons */}
      <div className="flex items-center gap-2 mt-3 text-xs">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
            showGuide
              ? 'bg-[#1a4a2e]/10 border-[#1a4a2e] text-[#1a4a2e] font-medium'
              : 'bg-[#fffdf8] border-[#e0d9cc] text-[#6b6b5e] hover:border-[#1a4a2e]'
          }`}
          title="Включить или скрыть контур иероглифа"
        >
          {showGuide ? <Eye size={14} /> : <EyeOff size={14} />}
          <span>{showGuide ? 'Контур вкл.' : 'По памяти'}</span>
        </button>

        <button
          type="button"
          onClick={clearCanvas}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e0d9cc] bg-[#fffdf8] text-[#6b6b5e] hover:text-[#1c1c1c] hover:border-[#1a4a2e] transition-all"
          title="Стереть нарисованное"
        >
          <RotateCcw size={14} />
          <span>Очистить</span>
        </button>

        {hasDrawn && (
          <span className="flex items-center gap-1 text-[#1a4a2e] font-medium bg-[#1a4a2e]/10 px-2.5 py-1 rounded-md text-[11px] animate-fade-in">
            <Sparkles size={12} className="text-[#c8963e]" /> Отлично!
          </span>
        )}
      </div>
    </div>
  );
};
