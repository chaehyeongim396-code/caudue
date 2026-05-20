import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/images/regenerated_image_1778585349920.png';
import bagImg1 from '../assets/images/original_classic_canvas.png';
import bagImg2 from '../assets/images/original_linen_shoulder.png';
import bagImg3 from '../assets/images/regenerated_image_1777443640441.png';
import bagImg4 from '../assets/images/regenerated_image_1777443631544.png';
import bagImg6 from '../assets/images/regenerated_image_1777442501187.png';
import twistEcoBagImg from '../assets/images/regenerated_image_1779260826431.png';
import wearClassicCanvas from '../assets/images/wear_classic_canvas.png';
import wearLinenShoulder from '../assets/images/wear_linen_shoulder.png';
import wearMiniDaily from '../assets/images/wear_mini_daily.png';
import wearCloudBag from '../assets/images/wear_cloud_bag.png';
import wearBasicTote from '../assets/images/wear_basic_tote.png';
import wearTwistEco from '../assets/images/wear_twist_eco.png';
import wearTwistEco2 from '../assets/images/wear_twist_eco_2.png';
import wearPouch from '../assets/images/wear_pouch.png';
import wearPouch2 from '../assets/images/wear_pouch_2.png';
import wearCoaster from '../assets/images/wear_coaster.png';
import wearCoaster2 from '../assets/images/wear_coaster_2.png';
import wearCoaster3 from '../assets/images/wear_coaster_3.png';
import coasterImg from '../assets/images/regenerated_image_1778665142121.png';
import pouchImg from '../assets/images/regenerated_image_1778663374750.png';

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'eco-bag', label: '에코백' },
  { id: 'acc', label: '소품' }
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
    printAreaClass: 'top-[31%] left-[24%] w-[51%] h-[44%] rounded-sm',
    wearImages: [
      wearClassicCanvas
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
    printAreaClass: 'top-[35%] left-[25%] w-[49%] h-[38%] rounded-sm',
    wearImages: [
      wearLinenShoulder
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
    printAreaClass: 'top-[33%] left-[27%] w-[46%] h-[40%] rounded-md',
    wearImages: [
      wearMiniDaily
    ]
  },
  { 
    id: 4, 
    category: 'eco-bag', 
    title: '클라우드백', 
    price: '19,000원', 
    img: bagImg4,
    description: '구름처럼 부드럽고 가벼운 실루엣의 숄더백입니다.\n넉넉한 수납공간과 유연하게 흐르는 핏으로 일상의 편안함을 더해줍니다.',
    size: '가로 42cm x 세로 38cm x 폭 10cm',
    material: 'Soft Nylon 100%',
    printAreaClass: 'top-[36%] left-[23%] w-[53%] h-[36%] rounded-sm',
    wearImages: [
      wearCloudBag
    ]
  },
  { 
    id: 6, 
    category: 'eco-bag', 
    title: '베이직 토트백', 
    price: '13,000원', 
    img: bagImg6,
    description: '심플하고 군더더기 없는 디자인의 베이직 토트백입니다.\n탄탄한 캔버스 원단으로 제작되어 데일리 수납에 용이하며, 어떤 커스텀 패턴과도 내추럴하게 어울립니다.',
    size: '가로 36cm x 세로 40cm',
    material: 'Natural Cotton 100%',
    printAreaClass: 'top-[29%] left-[23%] w-[54%] h-[49%] rounded-sm',
    wearImages: [
      wearBasicTote
    ]
  },
  { 
    id: 7, 
    category: 'eco-bag', 
    title: '꼬임 에코백', 
    price: '24,000원', 
    img: twistEcoBagImg,
    description: '자연스러운 주름과 유니크한 꼬임 디테일이 매력적인 에코백입니다.',
    size: '가로 34cm x 세로 30cm (끈 길이 45cm)',
    material: 'Cotton 100% (Premium Soft Fabric)',
    printAreaClass: 'top-[30%] left-[28%] w-[44%] h-[40%] rounded-md',
    wearImages: [
      wearTwistEco,
      wearTwistEco2
    ]
  },
  { 
    id: 8, 
    category: 'acc', 
    title: '파우치', 
    price: '8,000원', 
    img: pouchImg,
    description: '소지품을 깔끔하게 수납할 수 있는 파우치입니다. 부드러운 코튼 소재로 제작되었습니다.',
    size: '15cm x 12cm',
    material: 'Cotton',
    printAreaClass: 'top-[24%] left-[22%] w-[56%] h-[54%] rounded-xl',
    wearImages: [
      wearPouch,
      wearPouch2
    ]
  },
  { 
    id: 9, 
    category: 'acc', 
    title: '핸드메이드 티코스터', 
    price: '4,500원', 
    img: coasterImg,
    description: '한 땀 한 땀 손으로 제작한 티코스터입니다. 테이블의 분위기를 따뜻하게 바꿔줍니다.',
    size: '10cm x 10cm',
    material: 'Cotton Thread',
    printAreaClass: 'top-[18%] left-[18%] w-[64%] h-[64%] rounded-2xl',
    wearImages: [
      wearCoaster,
      wearCoaster2,
      wearCoaster3
    ]
  }
];

interface GalleryProps {
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function Gallery({ initialCategory = 'eco-bag', onCategoryChange }: GalleryProps) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [printFit, setPrintFit] = useState<'cover' | 'contain'>('contain');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectProduct = (product: typeof PRODUCTS[0] | null) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0 });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setUploadedImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={() => handleSelectProduct(null)}
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
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-bold tracking-[0.3em] text-[#8BA8A4] uppercase mb-8">미리보기</h2>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square bg-[#F5F5F3] rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden relative cursor-pointer hover:border-[#8BA8A4]/50 transition-all group/preview flex items-center justify-center p-0"
              >
                {/* Product base image layer (crisp and high contrast, fully visible) */}
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.title} 
                  className="absolute w-full h-full object-contain transition-transform duration-300 group-hover/preview:scale-[1.02] p-8 pointer-events-none" 
                />

                {/* The Mockup Layer: Uploaded Design overlay placed exactly over printAreaClass */}
                {uploadedImage ? (
                  <div className={`absolute ${selectedProduct.printAreaClass || 'top-[25%] left-[25%] w-[50%] h-[50%]'} pointer-events-none transition-transform duration-300 group-hover/preview:scale-[1.02] overflow-hidden`}>
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded pattern Mockup" 
                      className={`w-full h-full ${printFit === 'contain' ? 'object-contain' : 'object-cover'} mix-blend-multiply opacity-85 animate-fade-in`} 
                    />
                    
                    {/* Hover indicator for editing */}
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
                      <div className="bg-[#8BA8A4]/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[9px] tracking-widest uppercase shadow-sm font-medium">
                        클릭하여 이미지 교체
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Guided Visual Design Overlay Area when no image is uploaded */
                  <div className={`absolute ${selectedProduct.printAreaClass || 'top-[25%] left-[25%] w-[50%] h-[50%]'} border-2 border-dashed border-[#8BA8A4]/30 rounded-xl flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] hover:bg-white/10 transition-colors pointer-events-none`}>
                    <span className="text-xl text-[#8BA8A4]/60 font-light mb-1">+</span>
                    <span className="text-[8px] text-[#8BA8A4]/60 font-medium tracking-widest uppercase">DESIGN AREA</span>
                  </div>
                )}
              </div>
            </div>

            {uploadedImage && (
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPrintFit('contain')}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all shadow-sm ${
                    printFit === 'contain'
                      ? 'bg-[#8BA8A4] text-white'
                      : 'bg-white text-[#8BA8A4] border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  디자인 맞춤 (Fit)
                </button>
                <button
                  type="button"
                  onClick={() => setPrintFit('cover')}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all shadow-sm ${
                    printFit === 'cover'
                      ? 'bg-[#8BA8A4] text-white'
                      : 'bg-white text-[#8BA8A4] border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  꽉 채우기 (Fill)
                </button>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-5 bg-[#8BA8A4] text-white rounded-2xl font-bold tracking-widest text-sm hover:bg-[#7A9793] transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
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
                    onClick={() => handleSelectProduct(p)}
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
              <button 
                onClick={() => {
                  addToCart({
                    id: `gallery-${selectedProduct.id}-${uploadedImage ? 'custom' : 'base'}-${Date.now()}`,
                    productId: selectedProduct.id,
                    title: selectedProduct.title + (uploadedImage ? ' (맞춤 디자인)' : ''),
                    price: selectedProduct.price,
                    img: selectedProduct.img,
                    customImage: uploadedImage,
                    printFit: printFit,
                    printAreaClass: selectedProduct.printAreaClass,
                    type: 'gallery',
                    size: selectedProduct.size
                  });
                }}
                className="w-full py-6 bg-[#1F2937] text-white rounded-[1.5rem] font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1"
              >
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
          {/* Wearing Images / Detailed Images */}
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8BA8A4]">
                {selectedProduct.category === 'acc' ? 'Detail View' : 'Lookbook'}
              </span>
              <h2 className="text-3xl font-serif italic text-[#4A4A4A]">
                {selectedProduct.category === 'acc' ? '상세 이미지' : '제품 착용'}
              </h2>
            </div>
            
            <div className="space-y-16 flex flex-col items-center">
              {selectedProduct.wearImages.length > 0 ? (
                selectedProduct.wearImages.map((img, i) => (
                  <div key={i} className="w-full md:max-w-4xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-[#F9F6F1] shadow-2xl transition-all duration-500 hover:shadow-3xl relative">
                    <img 
                      src={img} 
                      className="w-full h-auto block" 
                      alt={`${selectedProduct.title} detail ${i + 1}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))
              ) : (
                <div className="w-full aspect-video rounded-[2rem] bg-[#F9F6F1] flex items-center justify-center text-[#8BA8A4] italic">
                   {selectedProduct.category === 'acc' ? '상세 이미지가 준비 중입니다.' : '착용 이미지가 준비 중입니다.'}
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
              onClick={() => handleCategoryChange(cat.id)}
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
              onClick={() => handleSelectProduct(item)}
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
