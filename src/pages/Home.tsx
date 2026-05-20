import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import bagImg1 from '../assets/images/regenerated_image_1779258635502.png';
import bagImg2 from '../assets/images/regenerated_image_1777443639611.png';
import propImg2 from '../assets/images/regenerated_image_1779268495494.png';

interface HomeProps {
  onStartDesign: () => void;
  onNavigateToShop: (category: string) => void;
}

export default function Home({ onStartDesign, onNavigateToShop }: HomeProps) {
  return (
    <div className="px-6 box-border bg-[#dbe8e7]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto h-[70vh] flex flex-col md:flex-row items-center gap-12 mb-24 overflow-hidden">
        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[42px] font-serif leading-[1.1] mb-6 text-black"
          >
            "당신의 기억이 <br />
            <span className="font-normal not-italic">세상에 하나뿐인 디자인이 됩니다"</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'Georgia, serif' }}
            className="text-base font-light text-[#7D7D7D] max-w-[1001px] mb-10 leading-relaxed"
          >
            Cadeau는 당신의 소중한 추억을 가공하여 <br />
            세상에 하나뿐인 퍼스널 패션 아이템을 위한 독창적인 패턴으로 재탄생시킵니다.
          </motion.p>
          <motion.button
            id="hero-cta"
            onClick={onStartDesign}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ x: 5 }}
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="flex items-center gap-4 bg-[#2C2C2C] text-white px-8 py-4 rounded-full text-xs font-medium tracking-[0.2em] transition-all"
          >
            나만의 패턴 만들기 <ArrowRight size={16} />
          </motion.button>
        </div>
        
        <div className="flex-1 relative w-full h-full min-h-[400px]">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full overflow-hidden rounded-[2rem] md:rounded-[4rem]"
          >
            <img 
              src="/regenerated_image_1777443631544.png" 
              alt="Balletcore aesthetic" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#E8DCC4]/10 pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto mb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40 mb-2 block">Collections</span>
            <h2 className="text-3xl font-serif italic">더 캔버스</h2>
          </div>
          <button 
            onClick={() => onNavigateToShop('all')}
            className="text-[10px] uppercase tracking-[0.2em] border-b border-[#2C2C2C] pb-1 hover:opacity-60 transition-opacity font-medium" 
            style={{ fontFamily: 'Georgia, serif' }}
          >
            전체보기
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: '에코백', img: bagImg1, category: 'ECO BAG', shopCategory: 'eco-bag' },
            { title: '소품', img: propImg2, category: 'ACCESSORIES', shopCategory: 'acc' },
            { title: '소품', img: bagImg2, category: 'ACCESSORIES', shopCategory: 'acc' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              onClick={() => onNavigateToShop(item.shopCategory)}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-[#F9F6F1]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-serif mb-1">{item.title}</h3>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 font-medium">{item.category}</span>
                </div>
                <button className="w-8 h-8 rounded-full border border-[#E8DCC4] flex items-center justify-center group-hover:bg-[#2C2C2C] group-hover:text-white transition-colors">
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#f8f5ec] text-[#000000] -mx-6 px-6 py-24 mb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            
            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed font-normal break-keep">
              <p className="max-w-4xl mx-auto px-4">
                <span className="md:block md:whitespace-nowrap mb-1 md:mb-0">
                  <span className="inline-block">우리의 스마트폰 속에는</span>{" "}
                  <span className="inline-block">수천 장의 사진이 잠들어 있습니다.</span>
                </span>
                <span className="md:block md:whitespace-nowrap mb-1 md:mb-0">
                  <span className="inline-block">사랑하는 사람의 미소,</span>{" "}
                  <span className="inline-block">여행지의 낯선 공기, 혹은</span>{" "}
                  <span className="inline-block">노을이 지던 어느 날의 이름 모를 골목까지.</span>
                </span>
                <span className="md:block md:whitespace-nowrap">
                  <span className="inline-block">하지만 그 소중한 기억들은</span>{" "}
                  <span className="inline-block">시간이 흐름에 따라 서서히 잊히곤 합니다.</span>
                </span>
              </p>
              <p className="pt-4 text-sm font-medium tracking-wide text-gray-500">
                Cadeau는 질문했습니다.
              </p>
            </div>

            <p className="text-xl md:text-3xl font-serif italic leading-relaxed pt-2 text-[#2C2C2C] max-w-4xl mx-auto break-keep px-4">
              <span className="md:block md:whitespace-nowrap mb-2 md:mb-0">
                <span className="inline-block">"당신의 가장 찬란했던 순간을</span>{" "}
                <span className="inline-block">일상 속에서 만질 수 있고,</span>
              </span>
              <span className="md:block md:whitespace-nowrap">
                <span className="inline-block">입을 수 있는 예술로</span>{" "}
                <span className="inline-block">바꿀 수 있다면 어떨까?"</span>
              </span>
            </p>

            <div className="w-px h-16 bg-[#000000]/20 mx-auto pt-4"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
