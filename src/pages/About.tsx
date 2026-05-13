import React from 'react';
import { motion } from 'motion/react';
import { Upload, Lightbulb, CheckCircle, ShoppingBag } from 'lucide-react';
import logo from '../assets/images/regenerated_image_1778585349920.png';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-32">
        
        {/* Brand Story Section */}
        <section className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-0"
          >
            <img 
              src={logo} 
              alt="Cadeau" 
              className="h-32 md:h-48 w-auto object-contain" 
              referrerPolicy="no-referrer" 
            />
            <p className="text-[#8BA8A4] text-xs md:text-sm font-medium tracking-[0.2em] uppercase mt-4">
              개인 경험을 디자인으로 재해석하여 패션 아이템으로 제공하는 퍼스널 디자인 브랜드
            </p>
            
            {/* Dots */}
            <div className="flex gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#8BA8A4]" />
              <div className="w-2 h-2 rounded-full bg-[#8BA8A4]/20" />
              <div className="w-2 h-2 rounded-full bg-[#8BA8A4]/20" />
            </div>
          </motion.div>

          <div className="relative mt-32">
             <div className="mb-12 flex items-center justify-center pointer-events-none">
                <span className="text-3xl md:text-5xl font-serif tracking-[0.4em] uppercase italic text-[#8BA8A4]">Brand Story</span>
             </div>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative z-10 space-y-8 py-16 bg-white rounded-[4rem] border border-[#8BA8A4]/10 shadow-2xl shadow-teal-900/5 px-8 md:px-20"
             >
                <h2 className="text-xl md:text-2xl font-bold text-[#333333] tracking-tight">
                  "당신의 기억이 세상에 하나뿐인 디자인이 됩니다."
                </h2>
                <div className="max-w-3xl mx-auto space-y-4 text-[#666666] leading-relaxed font-normal text-sm md:text-base">
                  <p>
                    사용자의 소중한 추억과 특별한 경험을 AI 알고리즘을 통해 독창적인 패턴으로 시각화합니다.
                  </p>
                  <p className="md:whitespace-nowrap">
                    Cadeau는 단순한 패션 아이템을 넘어, 당신의 이야기를 담은 가장 개인적인 선물을 제안합니다.
                  </p>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Process Visualization */}
        <section className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-16 pb-12 px-4 py-32 bg-[#E9F1EF]/30 rounded-[5rem] my-24 shadow-inner text-center">
            <div className="flex flex-col items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-64 md:w-72 lg:w-80 aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/50 ring-8 ring-white/20"
              >
                 <img src="/about_inspiration.png" className="w-full h-full object-cover" alt="Source Inspiration" />
              </motion.div>
              <span className="text-[10px] tracking-[0.3em] font-medium text-[#8BA8A4] uppercase">Step 01. 영감 기록</span>
            </div>
            
            <div className="hidden md:block">
               <span className="text-[#8BA8A4] text-5xl font-light opacity-30">›</span>
            </div>

            <div className="flex flex-col items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-64 md:w-72 lg:w-80 aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/50 ring-8 ring-white/20"
              >
                 <img src="/about_pattern.png" className="w-full h-full object-cover" alt="AI Generated Patterns" />
              </motion.div>
              <span className="text-[10px] tracking-[0.3em] font-medium text-[#8BA8A4] uppercase">Step 02. 패턴 디자인</span>
            </div>

            <div className="hidden md:block">
               <span className="text-[#8BA8A4] text-5xl font-light opacity-30">›</span>
            </div>

            <div className="flex flex-col items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="w-64 md:w-72 lg:w-80 aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/50 ring-8 ring-white/20 bg-white"
              >
                 <img src="/about_product.png" className="w-full h-full object-cover" alt="Final Personalized Products" />
              </motion.div>
              <span className="text-[10px] tracking-[0.3em] font-medium text-[#8BA8A4] uppercase">Step 03. 패션 아이템</span>
            </div>
        </section>

        {/* How to Order Section */}
        <section className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif tracking-[0.3em] text-[#4A4A4A] uppercase not-italic">구매 방법</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                step: '01', 
                title: '사진 및 경험 업로드', 
                desc: '추억이 담긴 사진을 공유하세요', 
                icon: Upload,
                highlight: false
              },
              { 
                step: '02', 
                title: 'AI 디자인 변환', 
                desc: '감성을 분석하여 패턴을 생성합니다', 
                icon: Lightbulb,
                highlight: true
              },
              { 
                step: '03', 
                title: '커스텀 패턴 승인', 
                desc: '최종 디자인을 확인하고 선택하세요', 
                icon: CheckCircle,
                highlight: false
              },
              { 
                step: '04', 
                title: '핸드메이드 제작/배송', 
                desc: '정성을 담아 제작하여 보내드립니다', 
                icon: ShoppingBag,
                highlight: false
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-500 group text-center flex flex-col items-center gap-8 border border-gray-50"
              >
                <div className="w-14 h-14 flex items-center justify-center text-[#8BA8A4] group-hover:scale-110 transition-transform duration-500">
                  <item.icon strokeWidth={1} size={40} />
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-[#8BA8A4] uppercase">단계 {item.step}</span>
                  <h3 className={`text-base font-bold whitespace-nowrap ${item.highlight ? 'text-[#8BA8A4] italic' : 'text-[#333333]'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7D7D7D] font-normal leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
