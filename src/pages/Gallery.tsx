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
import wearLinenShoulder from '../assets/images/wear_linen_shoulder.png';
import wearClassicCanvas from '../assets/images/assets/wear_classic_canvas-C39h55ke.png';
import wearBasicTote from '../assets/images/regenerated_image_1779689580045.png';
import wearMiniDaily from '../assets/images/wear_mini_daily.png';
import wearCloudBag from '../assets/images/wear_cloud_bag.png';
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
    title: '클래식 캔버스 백 (L)', 
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
    id: 10, 
    category: 'eco-bag', 
    title: '클래식 캔버스 백 (S)', 
    price: '13,000원', 
    img: bagImg1,
    description: '어떤 룩에도 가볍게 어울리는 클래식 캔버스 백의 콤팩트한 스몰 에디션입니다.\n원래보다 아담한 사이즈로, 간편한 데일리 소지품을 귀엽고 탄탄하게 수납할 수 있습니다.',
    size: '가로 28cm x 세로 32cm (끈 길이 52cm)',
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

function generateCleanShadowMap(imgSrc: string): Promise<{ mask: string; shadow: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({ mask: imgSrc, shadow: imgSrc });
        return;
      }
      ctx.drawImage(img, 0, 0);
      
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      
      // 1. Calculate average background color from the corner pixels of the image
      const corners = [
        0,                      // top-left
        width - 1,              // top-right
        (height - 1) * width,   // bottom-left
        width * height - 1      // bottom-right
      ];
      let bgSumR = 0, bgSumG = 0, bgSumB = 0, bgCount = 0;
      corners.forEach(idx => {
        const pIdx = idx * 4;
        if (data[pIdx + 3] >= 150) { // must be mostly opaque to use as color reference
          bgSumR += data[pIdx];
          bgSumG += data[pIdx + 1];
          bgSumB += data[pIdx + 2];
          bgCount++;
        }
      });
      
      const hasBgColor = bgCount > 0;
      const refBgR = hasBgColor ? Math.round(bgSumR / bgCount) : 245;
      const refBgG = hasBgColor ? Math.round(bgSumG / bgCount) : 245;
      const refBgB = hasBgColor ? Math.round(bgSumB / bgCount) : 245;

      // BFS index-based queue flood fill to detect background
      const visited = new Uint8Array(width * height);
      const isBg = new Uint8Array(width * height);
      const queue = new Int32Array(width * height);
      let head = 0;
      let tail = 0;
      
      // 2. Seed any pixels that are transparent (alpha < 150) OR extremely close to the background color
      // This ensures solid/opaque background areas inside the handle loops are seeded as backgrounds
      for (let i = 0; i < width * height; i++) {
        const pIdx = i * 4;
        const r = data[pIdx];
        const g = data[pIdx + 1];
        const b = data[pIdx + 2];
        const a = data[pIdx + 3];
        
        const isTransparent = a < 150;
        const isBgColor = Math.abs(r - refBgR) < 10 && Math.abs(g - refBgG) < 10 && Math.abs(b - refBgB) < 10;
        
        if (isTransparent || isBgColor) {
          visited[i] = 1;
          queue[tail++] = i;
        }
      }
      
      // 3. Seed the border pixels (to capture any remaining non-transparent background borders)
      for (let x = 0; x < width; x++) {
        const idxTop = 0 * width + x;
        if (!visited[idxTop]) {
          visited[idxTop] = 1;
          queue[tail++] = idxTop;
        }
        
        const idxBottom = (height - 1) * width + x;
        if (!visited[idxBottom]) {
          visited[idxBottom] = 1;
          queue[tail++] = idxBottom;
        }
      }
      for (let y = 1; y < height - 1; y++) {
        const idxLeft = y * width + 0;
        if (!visited[idxLeft]) {
          visited[idxLeft] = 1;
          queue[tail++] = idxLeft;
        }
        
        const idxRight = y * width + (width - 1);
        if (!visited[idxRight]) {
          visited[idxRight] = 1;
          queue[tail++] = idxRight;
        }
      }
      
      while (head < tail) {
        const idx = queue[head++];
        const cx = idx % width;
        const cy = Math.floor(idx / width);
        const pIdx = idx * 4;
        
        const r = data[pIdx];
        const g = data[pIdx + 1];
        const b = data[pIdx + 2];
        const a = data[pIdx + 3];
        
        const isTransparent = a < 150;
        const isColorMatch = Math.abs(r - refBgR) < 15 && Math.abs(g - refBgG) < 15 && Math.abs(b - refBgB) < 15;
        const isLight = (r + g + b) > 720;
        
        if (isTransparent || isColorMatch || isLight) {
          isBg[idx] = 1;
          
          if (cx + 1 < width) {
            const nIdx = idx + 1;
            if (!visited[nIdx]) { visited[nIdx] = 1; queue[tail++] = nIdx; }
          }
          if (cx - 1 >= 0) {
            const nIdx = idx - 1;
            if (!visited[nIdx]) { visited[nIdx] = 1; queue[tail++] = nIdx; }
          }
          if (cy + 1 < height) {
            const nIdx = idx + width;
            if (!visited[nIdx]) { visited[nIdx] = 1; queue[tail++] = nIdx; }
          }
          if (cy - 1 >= 0) {
            const nIdx = idx - width;
            if (!visited[nIdx]) { visited[nIdx] = 1; queue[tail++] = nIdx; }
          }
        }
      }
      
      // Calculate average color of valid fabric
      let totalR = 0, totalG = 0, totalB = 0, totalCount = 0;
      for (let i = 0; i < width * height; i++) {
        if (!isBg[i]) {
          const pIdx = i * 4;
          totalR += data[pIdx];
          totalG += data[pIdx + 1];
          totalB += data[pIdx + 2];
          totalCount++;
        }
      }
      const avgR = totalCount > 0 ? Math.round(totalR / totalCount) : 230;
      const avgG = totalCount > 0 ? Math.round(totalG / totalCount) : 225;
      const avgB = totalCount > 0 ? Math.round(totalB / totalCount) : 220;
      const avgGray = Math.round(0.299 * avgR + 0.587 * avgG + 0.114 * avgB);
      
      // Create color bleed image data to avoid white edge glows during scale blurring
      const bleedCanvas = document.createElement('canvas');
      bleedCanvas.width = width;
      bleedCanvas.height = height;
      const bleedCtx = bleedCanvas.getContext('2d')!;
      const bleedImgData = bleedCtx.createImageData(width, height);
      const bleedPixels = bleedImgData.data;
      
      for (let i = 0; i < width * height; i++) {
        const pIdx = i * 4;
        if (isBg[i]) {
          bleedPixels[pIdx] = avgR;
          bleedPixels[pIdx + 1] = avgG;
          bleedPixels[pIdx + 2] = avgB;
          bleedPixels[pIdx + 3] = 255;
        } else {
          bleedPixels[pIdx] = data[pIdx];
          bleedPixels[pIdx + 1] = data[pIdx + 1];
          bleedPixels[pIdx + 2] = data[pIdx + 2];
          bleedPixels[pIdx + 3] = 255;
        }
      }
      bleedCtx.putImageData(bleedImgData, 0, 0);
      
      // Downscale to heavily blur original high-frequency patterns
      const blurSize = 80;
      const blurCanvas = document.createElement('canvas');
      blurCanvas.width = blurSize;
      blurCanvas.height = blurSize;
      const blurCtx = blurCanvas.getContext('2d')!;
      blurCtx.imageSmoothingEnabled = true;
      blurCtx.imageSmoothingQuality = 'high';
      blurCtx.drawImage(bleedCanvas, 0, 0, blurSize, blurSize);
      
      // Scale-stretch back up to original size (bilinear-smoothing blur)
      const blurredCanvas = document.createElement('canvas');
      blurredCanvas.width = width;
      blurredCanvas.height = height;
      const blurredCtx = blurredCanvas.getContext('2d')!;
      blurredCtx.imageSmoothingEnabled = true;
      blurredCtx.imageSmoothingQuality = 'high';
      blurredCtx.drawImage(blurCanvas, 0, 0, width, height);
      
      const blurredImgData = blurredCtx.getImageData(0, 0, width, height);
      const bPixels = blurredImgData.data;
      
      // Construct final outputs
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = width;
      maskCanvas.height = height;
      const maskCtx = maskCanvas.getContext('2d')!;
      const maskImgData = maskCtx.createImageData(width, height);
      const maskPixels = maskImgData.data;
      
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = width;
      shadowCanvas.height = height;
      const shadowCtx = shadowCanvas.getContext('2d')!;
      const shadowImgData = shadowCtx.createImageData(width, height);
      const shadowPixels = shadowImgData.data;
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          const pIdx = idx * 4;
          
          if (isBg[idx]) {
            maskPixels[pIdx] = 0;
            maskPixels[pIdx + 1] = 0;
            maskPixels[pIdx + 2] = 0;
            maskPixels[pIdx + 3] = 0;
            
            shadowPixels[pIdx] = 255;
            shadowPixels[pIdx + 1] = 255;
            shadowPixels[pIdx + 2] = 255;
            shadowPixels[pIdx + 3] = 0;
          } else {
            maskPixels[pIdx] = 0;
            maskPixels[pIdx + 1] = 0;
            maskPixels[pIdx + 2] = 0;
            maskPixels[pIdx + 3] = 255;
            
            const br = bPixels[pIdx];
            const bg = bPixels[pIdx + 1];
            const bb = bPixels[pIdx + 2];
            
            const gray = Math.round(0.299 * br + 0.587 * bg + 0.114 * bb);
            const shadowFactor = Math.min(255, Math.max(0, Math.round((gray * 255) / avgGray)));
            
            shadowPixels[pIdx] = shadowFactor;
            shadowPixels[pIdx + 1] = shadowFactor;
            shadowPixels[pIdx + 2] = shadowFactor;
            shadowPixels[pIdx + 3] = 255;
          }
        }
      }
      
      maskCtx.putImageData(maskImgData, 0, 0);
      shadowCtx.putImageData(shadowImgData, 0, 0);
      
      resolve({
        mask: maskCanvas.toDataURL(),
        shadow: shadowCanvas.toDataURL()
      });
    };
    img.onerror = () => {
      resolve({ mask: imgSrc, shadow: imgSrc });
    };
    img.src = imgSrc;
  });
}

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
  const [mockupMode, setMockupMode] = useState<'wrap' | 'print'>('wrap');
  const [patternSize, setPatternSize] = useState<'small' | 'medium' | 'large' | 'single'>('medium');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [productMask, setProductMask] = useState<string | null>(null);
  const [productShadow, setProductShadow] = useState<string | null>(null);
  const maskCache = useRef<Record<number, string>>({});
  const shadowCache = useRef<Record<number, string>>({});

  useEffect(() => {
    if (!selectedProduct) {
      setProductMask(null);
      setProductShadow(null);
      return;
    }
    
    const productId = selectedProduct.id;
    if (maskCache.current[productId] && shadowCache.current[productId]) {
      setProductMask(maskCache.current[productId]);
      setProductShadow(shadowCache.current[productId]);
      return;
    }

    setProductMask(null);
    setProductShadow(null);
    generateCleanShadowMap(selectedProduct.img).then(({ mask, shadow }) => {
      maskCache.current[productId] = mask;
      shadowCache.current[productId] = shadow;
      setProductMask(mask);
      setProductShadow(shadow);
    });
  }, [selectedProduct?.id]);

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
                {/* Product base image layer */}
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.title} 
                  className={`absolute w-full h-full object-contain transition-transform duration-300 group-hover/preview:scale-[1.02] p-8 pointer-events-none ${uploadedImage && mockupMode === 'wrap' ? 'opacity-0' : 'opacity-100'}`} 
                />

                {/* The Mockup Layer */}
                {uploadedImage ? (
                  mockupMode === 'wrap' ? (
                    <div className="absolute inset-0 w-full h-full p-8 pointer-events-none transition-transform duration-300 group-hover/preview:scale-[1.02] flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* 1. Masked Pattern layer */}
                        <div 
                          className="absolute inset-0 w-full h-full overflow-hidden"
                          style={{
                            maskImage: `url(${productMask || selectedProduct.img})`,
                            WebkitMaskImage: `url(${productMask || selectedProduct.img})`,
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                          }}
                        >
                          <div 
                            className="w-full h-full animate-fade-in"
                            style={{
                              backgroundImage: `url(${uploadedImage})`,
                              backgroundSize: patternSize === 'small' ? '80px 80px' : patternSize === 'medium' ? '150px 150px' : patternSize === 'large' ? '260px 260px' : 'contain',
                              backgroundRepeat: patternSize === 'single' ? 'no-repeat' : 'repeat',
                              backgroundPosition: 'center',
                              opacity: 0.95,
                            }}
                          />
                        </div>

                        {/* 2. Highlight & Shadow Overlay layer (mix-blend-multiply of clean patternless product shadow map) */}
                        <img 
                          src={productShadow || selectedProduct.img} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
                          style={{ opacity: 1.0 }}
                        />
                      </div>
                    </div>
                  ) : (
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
                  )
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
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-gray-200/60 shadow-sm space-y-6">
                {/* 1. Mockup Mode Toggle */}
                <div className="space-y-2">
                  <span className="text-[10px] text-[#8BA8A4] uppercase tracking-wider font-semibold block text-left">인쇄 스타일 (Print Style)</span>
                  <div className="grid grid-cols-2 gap-2 bg-[#F5F5F3] p-1.5 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setMockupMode('wrap')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        mockupMode === 'wrap'
                          ? 'bg-[#8BA8A4] text-white shadow-sm'
                          : 'text-[#8BA8A4] hover:text-[#4A4A4A]'
                      }`}
                    >
                      ✨ 3D 패턴 랩핑 (전체)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMockupMode('print')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        mockupMode === 'print'
                          ? 'bg-[#8BA8A4] text-white shadow-sm'
                          : 'text-[#8BA8A4] hover:text-[#4A4A4A]'
                      }`}
                    >
                      ▫️ 중앙 평면 인쇄 (일부)
                    </button>
                  </div>
                </div>

                {/* 2. Style Options based on Mockup Mode */}
                {mockupMode === 'wrap' ? (
                  <div className="space-y-3">
                    <span className="text-[10px] text-[#8BA8A4] uppercase tracking-wider font-semibold block text-left">패턴 크기 (Pattern Density)</span>
                    <div className="grid grid-cols-4 gap-2">
                      {(['small', 'medium', 'large', 'single'] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPatternSize(size)}
                          className={`py-2 rounded-xl text-[10px] font-bold transition-all text-center border capitalize ${
                            patternSize === size
                              ? 'bg-[#4A4A4A] text-white border-[#4A4A4A] shadow-sm'
                              : 'bg-white text-[#8BA8A4] border-gray-100 hover:bg-gray-50'
                          }`}
                        >
                          {size === 'small' ? '촘촘하게' : size === 'medium' ? '기본' : size === 'large' ? '크게' : '한번만'}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-[10px] text-[#8BA8A4] uppercase tracking-wider font-semibold block text-left">인쇄 비율 (Print Fit)</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPrintFit('contain')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                          printFit === 'contain'
                            ? 'bg-[#4A4A4A] text-white border-[#4A4A4A]'
                            : 'bg-white text-[#8BA8A4] border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        디자인 맞춤 (Fit)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPrintFit('cover')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                          printFit === 'cover'
                            ? 'bg-[#4A4A4A] text-white border-[#4A4A4A]'
                            : 'bg-white text-[#8BA8A4] border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        꽉 채우기 (Fill)
                      </button>
                    </div>
                  </div>
                )}
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

            {(selectedProduct.id === 1 || selectedProduct.id === 10) && (
              <div className="space-y-3 bg-white/40 backdrop-blur-[1px] p-5 rounded-[2rem] border border-gray-100/80">
                <span className="text-[10px] text-[#8BA8A4] uppercase tracking-wider font-semibold block text-left">사이즈 옵션 (Size Option)</span>
                <div className="grid grid-cols-2 gap-2 bg-[#F5F5F3] p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      const lProduct = PRODUCTS.find(p => p.id === 1);
                      if (lProduct) handleSelectProduct(lProduct);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedProduct.id === 1
                        ? 'bg-[#8BA8A4] text-white shadow-sm'
                        : 'text-[#8BA8A4] hover:text-[#4A4A4A]'
                    }`}
                  >
                    Large
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const sProduct = PRODUCTS.find(p => p.id === 10);
                      if (sProduct) handleSelectProduct(sProduct);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedProduct.id === 10
                        ? 'bg-[#8BA8A4] text-white shadow-sm'
                        : 'text-[#8BA8A4] hover:text-[#4A4A4A]'
                    }`}
                  >
                    Small
                  </button>
                </div>
                <p className="text-[10px] text-[#8BA8A4] italic block text-left">
                  {selectedProduct.id === 1 
                    ? '가로 36cm x 세로 40cm 규격의 넉넉한 수납을 제공합니다.' 
                    : '가로 28cm x 세로 32cm 규격의 가볍고 귀여운 미니 에디션입니다.'}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <h3 className="text-sm font-serif italic text-[#8BA8A4] tracking-wider">다른 기본 아이템 선택</h3>
              <div className="grid grid-cols-5 gap-3">
                {(activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory)).slice(0, 10).map((p) => (
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
