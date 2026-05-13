import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, ChevronLeft } from 'lucide-react';
import logo from '../assets/images/regenerated_image_1778585349920.png';
import bagImg1 from '../assets/images/regenerated_image_1777443635601.png';
import bagImg2 from '../assets/images/regenerated_image_1777443639611.png';
import bagImg3 from '../assets/images/regenerated_image_1777443640441.png';
import bagImg4 from '../assets/images/regenerated_image_1777443631544.png';
import bagImg5 from '../assets/images/regenerated_image_1777444452917.png';
import bagImg6 from '../assets/images/regenerated_image_1777442501187.png';
import wearImg1 from '../assets/images/regenerated_image_1778662295101.png';
import wearImg2 from '../assets/images/regenerated_image_1778662139513.png';
import wearBasicWhite from '../assets/images/wear_basic_white.png';

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
    img: bagImg1,
    description: '어떤 룩에도 잘 어울리는 가장 기본적인 디자인의 캔버스 백입니다.\n탄탄한 조직감의 10수 캔버스 원단으로 제작되어 내구성이 뛰어납니다.',
    size: '가로 36cm x 세로 40cm (끈 길이 60cm)',
    material: 'Cotton 100% (10oz Canvas)',
    wearImages: [
      wearImg1,
      wearImg2
    ]
  },
  { 
    id: 2, 
    category: 'eco-bag', 
    title: '네추럴 린넨 숄더', 
    price: '18,000원', 
    img: bagImg2,
    description: '린넨 특유의 내추럴한 질감이 돋보이는 숄더백입니다.\n가벼운 무게감으로 여름철 데일리백으로 강력 추천합니다.',
    size: '가로 38cm x 세로 42cm (끈 길이 65cm)',
    material: 'Linen 55% Cotton 45%',
    wearImages: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=600'
    ]
  },
  { 
    id: 3, 
    category: 'eco-bag', 
    title: '미니 데일리 토트', 
    price: '12,000원', 
    img: bagImg3,
    description: '가벼운 외출에 적합한 콤팩트한 사이즈의 토트백입니다.\n내부에 작은 포켓이 있어 수납이 편리합니다.',
    size: '가로 25cm x 세로 22cm x 폭 8cm',
    material: 'Cotton 100%',
    wearImages: [
      'https://images.unsplash.com/photo-1544816153-12ad5d7140a1?auto=format&fit=crop&q=80&w=600'
    ]
  },
  { 
    id: 4, 
    category: 'eco-bag', 
    title: '캔버스 포켓 에코백', 
    price: '19,000원', 
    img: bagImg4,
    description: '외부에 큰 포켓이 있어 실용성을 높인 디자인입니다.\n넉넉한 수납공간으로 보조 가방이나 장바구니로도 훌륭합니다.',
    size: '가로 42cm x 세로 38cm x 폭 10cm',
    material: 'Cotton 100% (High Density)',
    wearImages: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=600'
    ]
  },
  { 
    id: 5, 
    category: 'eco-bag', 
    title: '스트라이프 코튼백', 
    price: '16,000원', 
    img: bagImg5,
    description: '청량감 있는 스트라이프 패턴이 포인트가 되는 코튼백입니다.\n캐주얼한 룩에 경쾌함을 더해줍니다.',
    size: '가로 35cm x 세로 38cm',
    material: 'Yarn-dyed Cotton 100%',
    wearImages: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=600'
    ]
  },
  { 
    id: 6, 
    category: 'eco-bag', 
    title: '베이직 화이트', 
    price: '13,000원', 
    img: bagImg6,
    description: '깨끗한 화이트 컬러의 정석 에코백입니다.\n어떠한 전사나 인쇄에도 방해받지 않는 순수한 화이트 캔버스입니다.',
    size: '가로 36cm x 세로 40cm',
    material: 'Bleached Cotton 100%',
    wearImages: [
      wearBasicWhite
    ]
  },
  { 
    id: 7, 
    category: 'acc', 
    title: '린넨 파우치', 
    price: '8,000원', 
    img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400',
    description: '화장품이나 소지품 정리에 좋은 린넨 파우치입니다. 스트링으로 입구를 조절할 수 있습니다.',
    size: '15cm x 18cm',
    material: 'Linen 100%',
    wearImages: []
  },
  { 
    id: 8, 
    category: 'acc', 
    title: '코튼 키링', 
    price: '5,000원', 
    img: 'https://images.unsplash.com/photo-1629131726617-43cf24892461?auto=format&fit=crop&q=80&w=400',
    description: '가방에 포인트를 주기 좋은 앙증맞은 키링입니다. 부드러운 코튼 소재로 제작되었습니다.',
    size: '5cm x 8cm',
    material: 'Cotton, Stainless Steel',
    wearImages: []
  },
  { 
    id: 9, 
    category: 'acc', 
    title: '핸드메이드 티코스터', 
    price: '4,500원', 
    img: 'https://images.unsplash.com/photo-1610471168199-923f59676e19?auto=format&fit=crop&q=80&w=400',
    description: '한 땀 한 땀 손으로 제작한 티코스터입니다. 테이블의 분위기를 따뜻하게 바꿔줍니다.',
    size: '10cm x 10cm',
    material: 'Cotton Thread',
    wearImages: []
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="flex items-center gap-2 text-[#8BA8A4] text-xs font-medium hover:text-[#4A4A4A] transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          뒤로 가기
        </button>
        
        {/* Upper Layout: Preview & Options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24"
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
              <h1 className="text-2xl font-bold text-[#4A4A4A] tracking-tight">제품 맞춤 제작</h1>
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
              <h3 className="text-sm font-serif italic text-[#8BA8A4] tracking-wider">다른 기본 아이템 선택</h3>
              <div className="grid grid-cols-5 gap-3">
                {PRODUCTS.filter(p => p.category === activeCategory).slice(0, 10).map((p) => (
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

            <div className="space-y-4 pt-8">
              <button className="w-full py-6 bg-[#1F2937] text-white rounded-[1.5rem] font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1">
                제작 요청하기 (주문)
              </button>
              <p className="text-[10px] text-center text-[#8BA8A4] tracking-widest uppercase">커스텀 이미지를 포함한 제작이 진행됩니다</p>
            </div>
          </div>
        </motion.div>

        {/* Detailed Product Info Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-24 border-t border-gray-100 pt-24"
        >
          {/* Wearing Images */}
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8BA8A4]">Lookbook</span>
              <h2 className="text-3xl font-serif italic text-[#4A4A4A]">제품 착용</h2>
            </div>
            
            <div className="space-y-16 flex flex-col items-center">
              {selectedProduct.wearImages.length > 0 ? (
                selectedProduct.wearImages.map((img, i) => (
                  <div key={i} className="w-full md:max-w-4xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-[#F9F6F1] shadow-2xl transition-all duration-500 hover:shadow-3xl">
                    <img 
                      src={img} 
                      className="w-full h-auto block" 
                      alt={`${selectedProduct.title} look ${i + 1}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))
              ) : (
                <div className="w-full aspect-video rounded-[2rem] bg-[#F9F6F1] flex items-center justify-center text-[#8BA8A4] italic">
                   착용 이미지가 준비 중입니다.
                </div>
              )}
            </div>
          </div>

          {/* Description & Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8BA8A4]">Description</span>
                <h3 className="text-2xl font-serif">{selectedProduct.title} 상세 정보</h3>
                <p className="text-base text-[#666666] leading-relaxed whitespace-pre-line">
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            <div className="bg-[#F9F6F1]/50 rounded-[2.5rem] p-12 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8BA8A4]">Details</span>
                <div className="space-y-6">
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-xs font-bold text-[#4A4A4A]">소재</span>
                    <span className="text-xs text-[#666666]">{selectedProduct.material}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-xs font-bold text-[#4A4A4A]">사이즈</span>
                    <span className="text-xs text-[#666666]">{selectedProduct.size}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-xs font-bold text-[#4A4A4A]">제조국</span>
                    <span className="text-xs text-[#666666]">대한민국</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8BA8A4]">Care</span>
                <p className="text-[10px] text-[#8BA8A4] leading-relaxed uppercase tracking-wider">
                  찬물 세탁 권장 / 표백제 사용 금지 / 건조기 사용 지양 / 낮은 온도 다림질
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-0"
        >
          <img 
            src={logo} 
            alt="Cadeau" 
            className="h-32 md:h-48 w-auto object-contain" 
            referrerPolicy="no-referrer" 
          />
          <span className="text-sm tracking-[0.4em] font-medium text-[#8BA8A4] uppercase -mt-2">퍼스널 디자인 브랜드</span>
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
