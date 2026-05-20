import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { useCart, parsePrice, CartItem } from '../context/CartContext';

interface CartDrawerProps {
  onClose: () => void;
  setCurrentPage: (page: string) => void;
}

export default function CartDrawer({ onClose, setCurrentPage }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Calculate prices
  const subtotal = cart.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);

  const shippingFee = subtotal > 50000 || subtotal === 0 ? 0 : 3000;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsOrdering(true);
    
    // Simulate premium checkout delay
    setTimeout(() => {
      const orderNum = `CDO-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsOrdering(false);
      setOrderSuccess(orderNum);
      clearCart();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isOrdering) {
                onClose();
                // If order is successful, close clears the success state
                if (orderSuccess) setOrderSuccess(null);
              }
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#F2EDE4] text-[#2C2C2C] shadow-2xl z-[110] flex flex-col border-l border-[#E8DCC4]"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-[#E8DCC4]/60">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <h2 className="text-sm font-sans tracking-[0.2em] uppercase font-bold text-[#5A4B3A]">
                  Shopping Bag
                </h2>
                <span className="text-xs bg-[#2C2C2C] text-white px-2 py-0.5 rounded-full font-mono font-bold">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={onClose}
                disabled={isOrdering}
                className="hover:rotate-90 transition-transform duration-200 p-1 opacity-70 hover:opacity-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {orderSuccess ? (
                /* Order Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8BA8A4]/20 flex items-center justify-center text-[#8BA8A4]">
                    <CheckCircle size={36} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8BA8A4]">주문 완료</span>
                    <h3 className="text-xl font-serif italic font-medium text-[#4A4A4A]">소중한 흔적을 담아 제작을 시작합니다</h3>
                  </div>
                  <div className="p-5 bg-white/60 border border-[#E8DCC4] rounded-2xl w-full text-xs space-y-3 font-light text-[#5A4B3A]">
                    <div className="flex justify-between">
                      <span className="opacity-60">주문 번호</span>
                      <span className="font-mono font-semibold">{orderSuccess}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">제작 기간</span>
                      <span className="font-semibold">영업일 기준 5~7일 소요</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-60">배송구분</span>
                      <span className="font-semibold">무료 배송 (CJ대한통운)</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-[#7D7D7D] font-light">
                    마이페이지에서 실시간 디자인 매칭 및 제작 진행 상황을 확인하실 수 있습니다.
                  </p>
                  <div className="pt-6 w-full space-y-3">
                    <button
                      onClick={() => {
                        setOrderSuccess(null);
                        setCurrentPage('profile');
                        onClose();
                      }}
                      className="w-full bg-[#2C2C2C] text-white py-4 rounded-full text-xs font-semibold tracking-widest hover:bg-black transition-all"
                    >
                      마이페이지로 이동
                    </button>
                    <button
                      onClick={() => {
                        setOrderSuccess(null);
                        setCurrentPage('gallery');
                        onClose();
                      }}
                      className="w-full border border-[#2C2C2C] text-[#2C2C2C] py-4 rounded-full text-xs font-semibold tracking-widest hover:bg-white/40 transition-all"
                    >
                      계속 쇼핑하기
                    </button>
                  </div>
                </motion.div>
              ) : cart.length === 0 ? (
                /* Empty Cart View */
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-dashed border-[#E8DCC4] flex items-center justify-center opacity-60">
                    <ShoppingBag size={18} strokeWidth={1} className="text-[#5A4B3A]" />
                  </div>
                  <div>
                    <h3 className="font-serif italic text-lg text-[#5A4B3A]">장바구니가 비어 있습니다</h3>
                    <p className="text-xs font-light text-[#7D7D7D] mt-1 text-center">나의 이야기 혹은 커스텀 패턴을 담아 완성해 보세요.</p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage('gallery');
                      onClose();
                    }}
                    className="mt-4 bg-[#2C2C2C] text-white text-[10px] tracking-widest uppercase py-3 px-6 rounded-full font-medium hover:bg-black transition-colors"
                  >
                    쇼핑하러 가기
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-[#E8DCC4]/50 rounded-2xl p-4 flex gap-4 hover:shadow-sm transition-shadow relative group/item"
                    >
                      {/* Thumbnail Container */}
                      <div className="w-20 h-20 bg-[#F9F6F1] rounded-xl border border-gray-100 overflow-hidden relative flex items-center justify-center p-1 cursor-default select-none">
                        {item.type === 'custom' && item.colors ? (
                          /* AI Custom Pattern Background Preview */
                          <div 
                            className="w-full h-full rounded-lg relative overflow-hidden flex flex-wrap"
                            style={{ backgroundColor: item.colors[0], opacity: 0.9 }}
                          >
                            {[...Array(6)].map((_, idx) => (
                              <div
                                key={idx}
                                className="w-6 h-6 rounded-full blur-md absolute"
                                style={{
                                  backgroundColor: item.colors?.[Math.floor(Math.random() * item.colors.length)],
                                  top: `${Math.random() * 60}%`,
                                  left: `${Math.random() * 60}%`,
                                  opacity: 0.6
                                }}
                              />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                              <span className="text-[8px] uppercase tracking-widest text-white font-bold bg-[#8BA8A4]/90 px-1.5 py-0.5 rounded">CUSTOM</span>
                            </div>
                          </div>
                        ) : (
                          /* Gallery product option thumbnail */
                          <div className="w-full h-full relative flex items-center justify-center">
                            <img src={item.img} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="item preview" referrerPolicy="no-referrer" />
                            {item.customImage ? (
                              /* Superimpose user custom image badge or mini overlay! */
                              <div className={`absolute ${item.printAreaClass || 'top-[25%] left-[25%] w-[50%] h-[50%]'} pointer-events-none overflow-hidden scale-[1]`}>
                                <img 
                                  src={item.customImage} 
                                  className={`w-full h-full ${item.printFit === 'contain' ? 'object-contain' : 'object-cover'} mix-blend-multiply opacity-80`} 
                                  referrerPolicy="no-referrer"
                                  alt="overlay" 
                                />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>

                      {/* Item details */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#4A4A4A] line-clamp-1 pr-6">{item.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-2 text-[9px] opacity-50 font-serif">
                            <span>{item.type === 'custom' ? 'AI 감정 매칭' : '맞춤 인쇄'}</span>
                            {item.size && (
                              <>
                                <span>•</span>
                                <span>{item.size}</span>
                              </>
                            )}
                          </div>
                          {item.story && (
                            <p className="text-[9px] text-[#8BA8A4] font-serif italic line-clamp-1">"{item.story}"</p>
                          )}
                          {item.customImage && (
                            <span className="inline-block text-[8px] text-[#8BA8A4] border border-[#8BA8A4]/30 px-1 bg-[#8BA8A4]/10 rounded font-medium">나만의 패턴 적용</span>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-semibold text-[#2C2C2C]">
                            {item.price}
                          </span>

                          <div className="flex items-center gap-1 border border-[#E8DCC4] rounded-lg p-0.5 bg-[#F9F6F1]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-white rounded transition-colors text-xs text-[#5A4B3A]"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-[10px] font-mono min-w-[20px] text-center font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white rounded transition-colors text-xs text-[#5A4B3A]"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delete Button top corner */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-4 right-4 text-[#8C7A6B]/50 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary (if elements exist) */}
            {cart.length > 0 && !orderSuccess && (
              <div className="border-t border-[#E8DCC4]/60 bg-white/75 backdrop-blur-md p-6 space-y-4">
                <div className="space-y-2.5 text-xs text-[#5A4B3A] font-light">
                  <div className="flex justify-between">
                    <span>주문 소계</span>
                    <span className="font-medium font-mono">{subtotal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>배송비</span>
                    <span>
                      {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-[9px] text-[#8BA8A4] text-right font-light italic">
                      50,000원 이상 구매 시 무료 배송
                    </p>
                  )}
                  <div className="h-[1px] bg-[#E8DCC4]/60 my-2" />
                  <div className="flex justify-between text-sm text-[#2C2C2C] font-bold">
                    <span>최종 결제 금액</span>
                    <span className="font-mono text-[#D05A3F]">{total.toLocaleString()}원</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isOrdering}
                  className="w-full bg-[#2C2C2C] hover:bg-black text-white text-xs font-semibold tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-55 group"
                >
                  {isOrdering ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>결제 진행 중...</span>
                    </div>
                  ) : (
                    <>
                      <CreditCard size={14} strokeWidth={1.5} />
                      <span>{total.toLocaleString()}원 결제 요청 / 주문 완료</span>
                    </>
                  )}
                </button>
                <p className="text-[9px] text-center text-[#7D7D7D] opacity-65 font-light">
                  주문 완료 시 실시간 작업 매칭 시스템을 통해 수공예 공방에 전달됩니다.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
