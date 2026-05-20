import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings, Package, Heart, LogOut } from 'lucide-react';
import { SAMPLES } from './Archive';

interface ProfileProps {
  onStartDesign?: () => void;
}

export default function Profile({ onStartDesign }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites'>('orders');
  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const savedStr = localStorage.getItem('cadeau_liked_patterns');
      const ids = savedStr ? JSON.parse(savedStr) : [];
      setLikedIds(ids);
    } catch (e) {
      console.error(e);
    }
  }, [activeTab]); // update when tab changes in case user liked something in gallery

  const removeFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedIds = likedIds.filter(itemId => itemId !== id);
    setLikedIds(updatedIds);
    try {
      localStorage.setItem('cadeau_liked_patterns', JSON.stringify(updatedIds));
    } catch (err) {
      console.error(err);
    }
  };

  const savedItems = SAMPLES.filter(item => likedIds.includes(item.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-16">
        {/* Sidebar */}
        <aside className="space-y-12">
          <div className="text-center md:text-left">
            <div className="w-24 h-24 rounded-full bg-[#E8DCC4] mx-auto md:mx-0 mb-6 flex items-center justify-center text-4xl font-serif italic text-white shadow-inner">M</div>
            <h1 className="text-2xl font-serif italic mb-1">한미나</h1>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-semibold">2026년부터 멤버십 이용 중</p>
          </div>

          <nav className="flex flex-col gap-6 text-[10px] tracking-[0.2em] font-medium uppercase">
             <button 
               onClick={() => setActiveTab('orders')}
               className={`flex items-center gap-3 transition-opacity ${activeTab === 'orders' ? 'opacity-100 font-bold' : 'opacity-40 hover:opacity-100'}`}
             >
               <Package size={16} strokeWidth={1.5} /> 주문 내역
             </button>
             <button 
               onClick={() => setActiveTab('favorites')}
               className={`flex items-center gap-3 transition-opacity ${activeTab === 'favorites' ? 'opacity-100 font-bold' : 'opacity-40 hover:opacity-100'}`}
             >
               <Heart size={16} strokeWidth={1.5} /> 저장된 패턴
             </button>
             <button className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
               <Settings size={16} strokeWidth={1.5} /> 환경 설정
             </button>
             <div className="h-[1px] bg-[#E8DCC4] w-full my-4"></div>
             <button className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity text-red-800">
               <LogOut size={16} strokeWidth={1.5} /> 로그아웃
             </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="space-y-16">
          {activeTab === 'orders' ? (
            <>
              <section>
                <div className="flex justify-between items-end mb-8 border-b border-[#E8DCC4] pb-4">
                  <h2 className="text-sm font-medium uppercase tracking-[0.2em]">최근 주문</h2>
                  <button className="text-[10px] opacity-40 uppercase tracking-widest font-semibold hover:opacity-100 font-medium">전체보기</button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { id: '#CDO-9821', date: '2026년 4월 20일', status: '배송 중', item: '에코백 "첫 눈"' },
                    { id: '#CDO-9745', date: '2026년 3월 12일', status: '배송 완료', item: '실크 스카프 "벨벳 에코"' }
                  ].map((order, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-white border border-[#E8DCC4]/50 rounded-2xl hover:shadow-md transition-shadow">
                      <div className="space-y-1">
                        <span className="text-[8px] opacity-40 uppercase tracking-widest font-bold">{order.id}</span>
                        <h3 className="text-sm font-serif">{order.item}</h3>
                        <p className="text-[10px] opacity-40">{order.date}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <span className="text-[10px] px-3 py-1 rounded-full bg-[#E8DCC4]/30 uppercase font-bold tracking-widest text-xs">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-end mb-8 border-b border-[#E8DCC4] pb-4">
                  <h2 className="text-sm font-medium uppercase tracking-[0.2em]">나의 제작물</h2>
                  <button className="text-[10px] opacity-40 uppercase tracking-widest font-semibold hover:opacity-100">디자인 둘러보기</button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { title: '골든 아워', img: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=200' },
                    { title: '비 오는 카페', img: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?auto=format&fit=crop&q=80&w=200' },
                  ].map((design, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-[#F9F6F1] relative group cursor-pointer">
                      <img src={design.img} alt={design.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] text-white uppercase tracking-widest font-bold">{design.title}</span>
                      </div>
                    </div>
                  ))}
                  <button 
                    className="aspect-square rounded-2xl border-2 border-dashed border-[#E8DCC4] flex flex-col items-center justify-center gap-2 hover:bg-[#F9F6F1] transition-colors"
                    onClick={() => onStartDesign && onStartDesign()}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E8DCC4]/30 flex items-center justify-center">
                      <Package size={14} className="text-[#5A4B3A]" />
                    </div>
                    <span className="text-[8px] uppercase tracking-widest font-bold opacity-60">새로 만들기</span>
                  </button>
                </div>
              </section>
            </>
          ) : (
            <section>
              <div className="flex justify-between items-end mb-8 border-b border-[#E8DCC4] pb-4">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em]">저장된 패턴</h2>
                <span className="text-[10px] opacity-40 uppercase tracking-widest font-semibold font-mono">총 {savedItems.length}개</span>
              </div>
              
              {savedItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {savedItems.map((item) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="aspect-square rounded-2xl overflow-hidden bg-[#F9F6F1] relative group cursor-pointer border border-[#E8DCC4]/30 hover:shadow-md transition-all"
                    >
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                        <div className="flex justify-end">
                          <button 
                            onClick={(e) => removeFavorite(item.id, e)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF5A5F] shadow-sm transform hover:scale-110 active:scale-95 transition-transform"
                          >
                            <Heart size={14} fill="#FF5A5F" />
                          </button>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] text-white/60 uppercase tracking-widest font-bold">BY {item.author}</span>
                          <h4 className="text-sm font-serif text-white">{item.title}</h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[2rem] border-2 border-dashed border-[#E8DCC4]/50 py-16 text-center space-y-4">
                  <Heart size={24} className="mx-auto opacity-30 text-[#5A4B3A]" />
                  <p className="text-xs text-[#7D7D7D] font-light">저장한 패턴이 없습니다. 갤러리에서 마음에 드는 패턴을 다이아몬드처럼 담아보세요.</p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
