import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, ChevronLeft } from 'lucide-react';
import bagImg1 from '../assets/images/regenerated_image_1777443635601.png';
import bagImg2 from '../assets/images/regenerated_image_1777443639611.png';
import bagImg3 from '../assets/images/regenerated_image_1777443640441.png';
import bagImg4 from '../assets/images/regenerated_image_1777443631544.png';
import bagImg5 from '../assets/images/regenerated_image_1777444452917.png';
import bagImg6 from '../assets/images/regenerated_image_1777442501187.png';

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'eco-bag', label: '에코백' },
  { id: 'acc', label: '소품' },
];

const PRODUCTS = [
  { 
    id: 1, 
    category: 'eco-bag', 
    title: '클래식 캔버스 백', 
    price: '15,000원', 
    img: bagImg1 
  },
  { 
    id: 2, 
    category: 'eco-bag', 
    title: '네추럴 린넨 숄더', 
    price: '18,000원', 
    img: bagImg2 
  },
  { 
    id: 3, 
    category: 'eco-bag', 
    title: '미니 데일리 토트', 
    price: '12,000원', 
    img: bagImg3 
  },
  { 
    id: 4, 
    category: 'eco-bag', 
    title: '캔버스 포켓 에코백', 
    price: '19,000원', 
    img: bagImg4 
  },
  { 
    id: 5, 
    category: 'eco-bag', 
    title: '스트라이프 코튼백', 
    price: '16,000원', 
    img: bagImg5 
  },
  { 
    id: 6, 
    category: 'eco-bag', 
    title: '베이직 화이트', 
    price: '13,000원', 
    img: bagImg6 
  },
  { 
    id: 7, 
    category: 'acc', 
    title: '린넨 파우치', 
    price: '8,000원', 
    img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 8, 
    category: 'acc', 
    title: '코튼 키링', 
    price: '5,000원', 
    img: 'https://images.unsplash.com/photo-1629131726617-43cf24892461?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 9, 
    category: 'acc', 
    title: '핸드메이드 티코스터', 
    price: '4,500원', 
    img: 'https://images.unsplash.com/photo-1610471168199-923f59676e19?auto=format&fit=crop&q=80&w=400' 
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('eco-bag');
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (selectedProduct) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="flex items-center gap-2 text-[#8BA8A4] text-xs font-medium hover:text-[#4A4A4A] transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          뒤로 가기
        </button>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Preview Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#8BA8A4] uppercase mb-8">미리보기</h2>
              <div className="aspect-square bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden flex items-center justify-center p-8 relative">
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.title} 
                  className="max-w-full max-h-full object-contain opacity-40 mix-blend-multiply" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                   <div className="w-12 h-12 border-2 border-dashed border-[#8BA8A4] rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">+</span>
                   </div>
                   <p className="text-[10px] text-[#8BA8A4] tracking-widest uppercase">이미지를 업로드하세요</p>
                </div>
              </div>
            </div>
            
            <button className="w-full py-5 bg-[#8BA8A4] text-white rounded-2xl font-bold tracking-widest text-sm hover:bg-[#7A9793] transition-all flex items-center justify-center gap-3">
              <Upload size={18} />
              이미지 업로드 (.JPG / .PNG)
            </button>
          </div>

          {/* Right: Options Section */}
          <div className="space-y-12 pt-8">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-[#4A4A4A] tracking-tight">가방 옵션</h1>
              <div className="h-[1px] bg-gray-100" />
            </div>

            <div className="bg-[#F9F6F1] rounded-[2.5rem] p-6 flex items-center gap-8 border border-[#E8DCC4]/30">
              <div className="w-24 h-24 flex items-center justify-center">
                <img src={selectedProduct.img} className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#4A4A4A]">{selectedProduct.title}</h3>
                <p className="text-sm font-medium text-[#8BA8A4]">{selectedProduct.price}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-serif italic text-[#8BA8A4] tracking-wider">다른 스타일 선택하기</h3>
              <div className="grid grid-cols-5 gap-3">
                {PRODUCTS.filter(p => p.category === 'eco-bag').slice(0, 6).map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`aspect-square rounded-xl border-2 transition-all p-1 flex items-center justify-center overflow-hidden bg-white ${
                      selectedProduct.id === p.id ? 'border-[#8BA8A4] bg-white' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img src={p.img} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 pt-8">
              <button className="w-full py-6 bg-[#1F2937] text-white rounded-[1.5rem] font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1">
                제작 요청하기 (주문)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-0"
        >
          <span className="text-6xl md:text-8xl font-serif italic text-[#8DC4B8]" style={{ fontFamily: "'Great Vibes', cursive" }}>Cadeau</span>
          <span className="text-[10px] tracking-[0.4em] font-medium text-[#8BA8A4] uppercase -mt-2">퍼스널 디자인 브랜드</span>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mt-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-2.5 rounded-full text-xs font-medium tracking-[0.1em] transition-all duration-300 ${
                activeCategory === cat.id 
                  ? 'bg-[#8BA8A4]/40 text-[#4A4A4A]' 
                  : 'text-[#4A4A4A] hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-24">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProduct(item)}
              className="group cursor-pointer"
            >
              <div className="bg-[#F9F6F1] rounded-[2rem] p-4 aspect-[4/5] flex flex-col items-center justify-center gap-6 overflow-hidden border border-transparent group-hover:border-[#E8DCC4] transition-all">
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="text-center space-y-2 mt-auto pb-4">
                  <h3 className="text-sm font-bold text-[#4A4A4A]">{item.title}</h3>
                  <p className="text-xs text-[#8BA8A4] font-medium">{item.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
