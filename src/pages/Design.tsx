import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Sparkles, RefreshCw, ChevronLeft, ChevronRight, Check, Heart, Download } from 'lucide-react';
import { generatePatternFromMemory, PatternDesign } from '../services/geminiService';
import { useCart } from '../context/CartContext';
import logo from '../assets/images/regenerated_image_1778585349920.png';

const STYLES = [
  { id: 'romantic', label: '로맨틱', color: 'bg-[#F9E8E8]' },
  { id: 'vintage', label: '빈티지', color: 'bg-[#E8DCC4]' },
  { id: 'dreamy', label: '드라이미', color: 'bg-[#E8EEF9]' },
  { id: 'balletcore', label: '발레코어', color: 'bg-[#F2E8F9]' }
];

interface DesignProps {
  onNavigateToShop?: () => void;
}

export default function Design({ onNavigateToShop }: DesignProps) {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [textInput, setTextInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('romantic');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<PatternDesign | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSavePattern = () => {
    if (!result) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw background color
    ctx.fillStyle = result.colors[0] || '#FFFFFF';
    ctx.fillRect(0, 0, 800, 800);
    
    // First layer: large soft ambient radial glows
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 800;
      const radius = 200 + Math.random() * 300;
      const color = result.colors[Math.floor(Math.random() * result.colors.length)] || '#FFF';
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Second layer: delicate woven rings
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 2;
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 800;
      const radius = 20 + Math.random() * 80;
      const color = result.colors[Math.floor(Math.random() * result.colors.length)] || '#FFF';
      
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Third layer: random small soft sparkles
    ctx.globalAlpha = 0.25;
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 800;
      const radius = 5 + Math.random() * 15;
      const color = result.colors[Math.floor(Math.random() * result.colors.length)] || '#FFF';
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Restore opacity
    ctx.globalAlpha = 1.0;
    
    // Soft watermark/brand details
    ctx.fillStyle = '#2C2C2C';
    ctx.font = 'italic 16px "Space Grotesk", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 4;
    ctx.fillText(`Cadeau: ${result.title}`, 40, 750);
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${result.title.replace(/\s+/g, '_')}_pattern.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setStep(3);
    try {
      const data = await generatePatternFromMemory({
        text: textInput,
        imageBase64: image ? image.split(',')[1] : undefined,
        style: selectedStyle
      });
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('패턴 생성에 실패했습니다. 다시 시도해주세요.');
      setStep(2);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-[#dbe9e7]">
      {/* Progress Bar */}
      <div className="flex justify-center mb-16 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E8DCC4] -translate-y-1/2 -z-10"></div>
        <div className="flex gap-12">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border transition-all ${
                step >= s ? 'bg-[#2C2C2C] text-white border-[#2C2C2C]' : 'bg-white text-[#2C2C2C] border-[#E8DCC4]'
              }`}
            >
              {step > s ? <Check size={16} /> : s}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-40 mb-4">Step 01</span>
            <h2 className="text-4xl font-serif italic mb-8">당신의 이야기를 들려주세요</h2>
            <p className="text-[#7D7D7D] font-light mb-12">
              추억, 감정, 또는 꿈을 공유해주세요. 이것이 당신의 패턴의 영혼이 될 것입니다.
            </p>
            
            <textarea
              id="memory-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="조용한 일요일 아침, 커튼 위로 부서지던 그 햇살..."
              className="w-full h-40 bg-white border border-[#E8DCC4] rounded-2xl p-6 text-sm font-light focus:outline-none focus:border-[#2C2C2C] transition-colors resize-none mb-8"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-[#E8DCC4] rounded-2xl p-12 transition-all hover:bg-[#F9F6F1] cursor-pointer flex flex-col items-center gap-4 group"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden" 
              />
              {image ? (
                <div className="relative group/img">
                  <img src={image} alt="Upload preview" className="h-40 rounded-lg shadow-sm" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImage(null); }}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-[#E8DCC4]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#E8DCC4]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload size={20} className="text-[#5A4B3A]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest opacity-60 font-medium">또는 사진 업로드하기</span>
                </>
              )}
            </div>

            <button
              id="step1-next"
              onClick={() => setStep(2)}
              disabled={!textInput && !image}
              className="mt-12 bg-[#2C2C2C] text-white px-10 py-4 rounded-full text-xs font-medium tracking-[0.2em] disabled:opacity-30 transition-all hover:px-12"
            >
              다음 단계
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center max-w-xl mx-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-40 mb-4">Step 02</span>
            <h2 className="text-4xl font-serif italic mb-8">감성을 선택하세요</h2>
            <p className="text-[#7D7D7D] font-light mb-12">
              당신의 추억을 가장 잘 표현하는 시각적 분위기를 선택해주세요.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full mb-12">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  id={`style-${style.id}`}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`relative p-8 rounded-2xl border-2 transition-all text-left overflow-hidden ${
                    selectedStyle === style.id ? 'border-[#2C2C2C]' : 'border-transparent bg-[#F9F6F1]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full ${style.color} mb-4`}></div>
                  <h3 className="font-serif text-xl">{style.label}</h3>
                  {selectedStyle === style.id && (
                    <div className="absolute top-4 right-4">
                      <Check size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4 w-full">
              <button
                id="step2-back"
                onClick={() => setStep(1)}
                className="flex-1 border border-[#E8DCC4] text-[#2C2C2C] px-10 py-4 rounded-full text-xs font-medium tracking-[0.2em]"
              >
                이전으로
              </button>
              <button
                id="step2-generate"
                onClick={handleStartGeneration}
                className="flex-[2] bg-[#2C2C2C] text-white px-10 py-4 rounded-full text-xs font-medium tracking-[0.2em] flex items-center justify-center gap-2 group"
              >
                <Sparkles size={16} /> 패턴 생성하기
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="mb-8"
                >
                  <RefreshCw size={48} strokeWidth={1} className="text-[#E8DCC4]" />
                </motion.div>
                <h2 className="text-2xl font-serif italic mb-4">패턴을 엮는 중입니다...</h2>
              </div>
            ) : result && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="space-y-12">
                  <div className="aspect-square rounded-[3rem] overflow-hidden bg-[#F9F6F1] border border-[#E8DCC4] relative shadow-lg">
                    {/* Simulated Pattern Preview */}
                    <div 
                      className="absolute inset-0 p-8 flex flex-wrap gap-4 overflow-hidden"
                      style={{ 
                        backgroundColor: result.colors[0],
                        opacity: 0.8
                      }}
                    >
                      {/* Generative UI circles representing motifs */}
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-16 h-16 rounded-full blur-xl animate-pulse"
                          style={{ 
                            backgroundColor: result.colors[Math.floor(Math.random() * result.colors.length)],
                            transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`,
                            opacity: 0.4
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    {result.colors.map((c, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border border-[#E8DCC4]" style={{ backgroundColor: c }}></div>
                        <span className="text-[8px] font-mono uppercase opacity-40">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-40">나만의 고유한 디자인</span>
                    <h2 className="text-5xl font-serif leading-tight italic">{result.title}</h2>
                    <p className="text-sm font-light text-[#7D7D7D] leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  <div className="bg-[#F9F6F1] p-8 rounded-3xl border border-[#E8DCC4]/50">
                    <h3 className="text-xs uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
                       <Heart size={14} fill="#2C2C2C" /> 담긴 이야기
                    </h3>
                    <p className="font-serif italic text-lg leading-relaxed text-[#5A4B3A]">
                      "{result.story}"
                    </p>
                  </div>

                  <div className="space-y-6">
                    <button
                      id="buy-btn"
                      onClick={() => {
                        onNavigateToShop?.();
                      }}
                      className="w-full bg-[#2C2C2C] text-white py-5 rounded-full text-xs font-medium tracking-[0.2em] transition-all hover:scale-[1.02]"
                    >
                      제작 요청하기 (주문)
                    </button>
                    
                    <button
                      id="save-pattern-btn"
                      onClick={handleSavePattern}
                      className="w-full border border-[#2C2C2C] text-[#2C2C2C] py-5 rounded-full text-xs font-medium tracking-[0.2em] transition-all hover:bg-[#2C2C2C] hover:text-white flex items-center justify-center gap-2"
                    >
                      <Download size={14} /> 패턴 저장하기
                    </button>
                    
                    <button
                      id="regenerate-btn"
                      onClick={() => setStep(2)}
                      className="w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <RefreshCw size={12} /> 디자인 다시 만들기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
