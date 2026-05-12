import React from 'react';
import { motion } from 'motion/react';
import { Heart, Search } from 'lucide-react';
import sampleImg1 from '../assets/images/regenerated_image_1778585270912.png';
import sampleImg2 from '../assets/images/regenerated_image_1778585349920.png';
import sampleImg3 from '../assets/images/regenerated_image_1778577239412.png';
import sampleImg4 from '../assets/images/regenerated_image_1778577242626.png';
import sampleImg5 from '../assets/images/regenerated_image_1778577357126.png';
import sampleImg6 from '../assets/images/regenerated_image_1778577360113.png';

const SAMPLES = [
  { id: 1, title: '별빛 햄스터', author: '강서윤', img: sampleImg1, likes: 124 },
  { id: 2, title: '들판 위의 토끼', author: '이민수', img: sampleImg2, likes: 89 },
  { id: 3, title: '몽글몽글 구름', author: '박지혜', img: sampleImg3, likes: 210 },
  { id: 4, title: '가을 숲의 속삭임', author: '최유진', img: sampleImg4, likes: 156 },
  { id: 5, title: '여름 바다의 노래', author: '김도훈', img: sampleImg5, likes: 342 },
  { id: 6, title: '블루 빈티지 플라워', author: '정다은', img: sampleImg6, likes: 178 }
];

const Archive: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div className="max-w-md">
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#8BA8A4] mb-4 block">Archive</span>
          <h1 className="text-4xl md:text-6xl font-serif italic mb-6 text-[#4A4A4A]">패턴 갤러리</h1>
          <p className="text-sm font-light text-[#7D7D7D] leading-relaxed">
            우리 커뮤니티가 만든 고유한 패턴들을 탐색해보세요. <br />
            각 작품은 개인적인 여정의 디지털 발자국입니다.
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
           <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
           <input 
            type="text" 
            placeholder="추억 검색하기..." 
            className="w-full bg-[#F9F6F1] border-none rounded-full py-3 pl-12 pr-6 text-xs focus:ring-1 focus:ring-[#8BA8A4]/20 focus:outline-none"
           />
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {SAMPLES.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="break-inside-avoid group cursor-pointer"
          >
            <div className="relative rounded-[2rem] overflow-hidden mb-4 shadow-sm border border-transparent group-hover:border-[#E8DCC4] transition-all">
              <img src={item.img} alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2C2C2C] shadow-lg">
                  <Heart size={16} />
                </button>
              </div>
            </div>
            <div className="px-4 flex justify-end items-center">
              <div className="flex items-center gap-1 opacity-40">
                <Heart size={10} />
                <span className="text-[10px] font-mono">{item.likes}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <button className="bg-transparent border border-[#E8DCC4] text-[#2C2C2C] px-12 py-4 rounded-full text-xs font-medium tracking-[0.2em] transition-all hover:bg-[#8BA8A4] hover:text-white hover:border-transparent">
          더 보기
        </button>
      </div>
    </div>
  );
};

export default Archive;
