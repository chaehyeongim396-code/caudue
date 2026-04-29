import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  onStartDesign: () => void;
}

export default function Home({ onStartDesign }: HomeProps) {
  return (
    <div className="px-6 box-border bg-[#dbe8e7]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto h-[70vh] flex flex-col md:flex-row items-center gap-12 mb-24 overflow-hidden">
        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6"
          >
            Your Memories, <br />
            <span className="italic">Woven into Art.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'Georgia, serif' }}
            className="text-sm md:text-base font-light text-[#7D7D7D] max-w-sm mb-10 leading-relaxed"
          >
            Cadeau transforms your most cherished memories into bespoke patterns for personalized fashion items.
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
            CREATE YOUR PATTERN <ArrowRight size={16} />
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
            <h2 className="text-3xl font-serif italic">The Canvas</h2>
          </div>
          <button className="text-[10px] uppercase tracking-[0.2em] border-b border-[#2C2C2C] pb-1 hover:opacity-60 transition-opacity font-medium" style={{ fontFamily: 'Georgia, serif' }}>View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'The Ribbon Bag', img: '/regenerated_image_1777443635601.png', category: 'Bags' },
            { title: 'Vintage Scarf', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600', category: 'Silk' },
            { title: 'Canvas Tote', img: '/regenerated_image_1777443639611.png', category: 'Accessories' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
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
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold opacity-40" style={{ backgroundColor: '#f8f5ec', color: '#000000' }}>Our Philosophy</span>
            <p className="text-2xl md:text-4xl font-serif italic leading-relaxed" style={{ backgroundColor: '#f8f5ec', color: '#000000' }}>
              "We believe that fashion should be a mirror to our souls. Not just trends, but the stories that made us who we are."
            </p>
            <div className="w-px h-16 bg-[#000000]/20 mx-auto"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
