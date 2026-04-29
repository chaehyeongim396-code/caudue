import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Sparkles, RefreshCw, ChevronLeft, ChevronRight, Check, Heart } from 'lucide-react';
import { generatePatternFromMemory, PatternDesign } from '../services/geminiService';

const STYLES = [
  { id: 'romantic', label: 'Romantic', color: 'bg-[#F9E8E8]' },
  { id: 'vintage', label: 'Vintage', color: 'bg-[#E8DCC4]' },
  { id: 'dreamy', label: 'Dreamy', color: 'bg-[#E8EEF9]' },
  { id: 'balletcore', label: 'Balletcore', color: 'bg-[#F2E8F9]' }
];

export default function Design() {
  const [step, setStep] = useState(1);
  const [textInput, setTextInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('romantic');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<PatternDesign | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      alert('Failed to generate pattern. Please try again.');
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
        <div className="flex gap-12 bg-[#FDFBF7] px-8">
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
            <h2 className="text-4xl font-serif italic mb-8">Tell us your story</h2>
            <p className="text-[#7D7D7D] font-light mb-12">
              Share a memory, a feeling, or a dream. This will be the soul of your pattern.
            </p>
            
            <textarea
              id="memory-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="The way the sunlight hit the curtains on a quiet Sunday morning..."
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
                  <span className="text-xs uppercase tracking-widest opacity-60 font-medium">Or upload an image</span>
                </>
              )}
            </div>

            <button
              id="step1-next"
              onClick={() => setStep(2)}
              disabled={!textInput && !image}
              className="mt-12 bg-[#2C2C2C] text-white px-10 py-4 rounded-full text-xs font-medium tracking-[0.2em] disabled:opacity-30 transition-all hover:px-12"
            >
              NEXT STEP
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
            <h2 className="text-4xl font-serif italic mb-8">Choose your aesthetic</h2>
            <p className="text-[#7D7D7D] font-light mb-12">
              Select the visual mood that best represents your memory.
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
                BACK
              </button>
              <button
                id="step2-generate"
                onClick={handleStartGeneration}
                className="flex-[2] bg-[#2C2C2C] text-white px-10 py-4 rounded-full text-xs font-medium tracking-[0.2em] flex items-center justify-center gap-2 group"
              >
                <Sparkles size={16} /> GENERATE PATTERN
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
                <h2 className="text-2xl font-serif italic mb-4">Weaving your pattern...</h2>
                <p className="text-sm font-light text-[#7D7D7D] max-w-xs leading-relaxed">
                  Our AI is analyzing the emotional nuances of your memory to create a design that belongs only to you.
                </p>
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
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="text-[120px] font-serif opacity-10 select-none tracking-tighter italic">Cadeau</div>
                      </div>
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
                    <span className="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-40">Your Unique Design</span>
                    <h2 className="text-5xl font-serif leading-tight italic">{result.title}</h2>
                    <p className="text-sm font-light text-[#7D7D7D] leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  <div className="bg-[#F9F6F1] p-8 rounded-3xl border border-[#E8DCC4]/50">
                    <h3 className="text-xs uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
                       <Heart size={14} fill="#2C2C2C" /> THE STORY
                    </h3>
                    <p className="font-serif italic text-lg leading-relaxed text-[#5A4B3A]">
                      "{result.story}"
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-[#E8DCC4]">
                      <span className="text-[10px] uppercase tracking-widest font-medium">Applied to: The Ribbon Bag</span>
                      <span className="text-[10px] uppercase tracking-widest font-medium">$245.00</span>
                    </div>
                    
                    <button
                      id="buy-btn"
                      className="w-full bg-[#2C2C2C] text-white py-5 rounded-full text-xs font-medium tracking-[0.2em] transition-all hover:scale-[1.02]"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                    
                    <button
                      id="regenerate-btn"
                      onClick={() => setStep(2)}
                      className="w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <RefreshCw size={12} /> REGENERATE DESIGN
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
