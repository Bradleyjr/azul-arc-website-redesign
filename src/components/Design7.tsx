import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function Design7() {
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const cards = [
    {
      prob: "Drowning in legacy case management?",
      cta: "Modernize Court Operations",
      desc: "We rebuild legacy systems into scalable, secure, and lightning-fast platforms for judicial leadership.",
      color: "bg-white/60"
    },
    {
      prob: "Sales team flying blind with physical products?",
      cta: "Illuminate Commercial Processes",
      desc: "We create digital twins and interactive catalogs that give your sales team unparalleled visibility.",
      color: "bg-white/60"
    },
    {
      prob: "Outgrowing your manual processes?",
      cta: "Scale Without Overhead",
      desc: "We automate the bottlenecks that are preventing your established SMB from reaching the next tier of growth.",
      color: "bg-white/60"
    }
  ];

  return (
    <div className="bg-[#e4e4e7] text-black font-sans min-h-screen selection:bg-black selection:text-white relative overflow-hidden">
      
      {/* 1. Global Noise Texture for Editorial Print Feel */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.06] pointer-events-none z-50 mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter7">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter7)"/>
      </svg>

      {/* 2. Fluid Monochromatic Shader Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#e4e4e7_0%,#f4f4f5_25%,#d4d4d8_50%,#f4f4f5_75%,#e4e4e7_100%)] opacity-80 blur-[80px]" 
        />
        {/* Subtle Azul Blue Accent drifting */}
        <motion.div 
          animate={{ 
            x: ['-20vw', '20vw', '-20vw'],
            y: ['-10vh', '30vh', '-10vh']
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-blue-400/10 rounded-full blur-[100px] mix-blend-multiply"
        />
      </div>

      <header className="px-8 py-8 flex justify-between items-center max-w-7xl mx-auto relative z-10">
        <div className="font-bold text-2xl tracking-tighter mix-blend-difference text-white">Azul.Arc</div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-32 relative z-10">
        <div className="max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[5rem] md:text-[9rem] font-bold tracking-tighter leading-[0.85] mb-12 mix-blend-difference text-white"
          >
            We <br/>operationalize <br/>your business.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t-4 border-black/20 pt-8"
          >
            <p className="text-2xl md:text-3xl font-medium max-w-2xl leading-snug text-zinc-800">
              An elite technology partner for established organizations ready to scale.
            </p>
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-zinc-800 transition-colors text-lg shrink-0 shadow-2xl shadow-black/20">
              Start Your Discovery <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Logo Scroller */}
      <section className="py-12 border-y-4 border-black/20 overflow-hidden relative z-10 bg-white/10 backdrop-blur-sm">
        <div className="flex gap-20 items-center animate-marquee whitespace-nowrap opacity-60 mix-blend-multiply">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="text-4xl font-bold font-serif tracking-tighter shrink-0">
              TRUSTED COMPANY {i}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Problem-First Routing Cards (Kinetic Accordion) */}
      <section className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <h2 className="text-4xl font-bold tracking-tighter mb-12 mix-blend-difference text-white">Select your challenge.</h2>
        <div className="flex flex-col gap-4">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              layout
              onClick={() => setActiveCard(activeCard === i ? null : i)}
              className={`${card.color} backdrop-blur-xl rounded-3xl overflow-hidden cursor-pointer border border-white/40 shadow-xl shadow-black/5 hover:bg-white/80 transition-colors`}
            >
              <motion.div layout className="p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <motion.h3 layout className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl text-zinc-900">
                  {card.prob}
                </motion.h3>
                <motion.div 
                  animate={{ rotate: activeCard === i ? 45 : 0 }}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-lg"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.div>
              
              <AnimatePresence>
                {activeCard === i && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="px-8 md:px-12 pb-12"
                  >
                    <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-black/10">
                      <div>
                        <p className="text-2xl font-medium text-zinc-700 mb-8">{card.desc}</p>
                        <button className="text-lg font-bold border-b-2 border-black pb-1 flex items-center gap-2 hover:text-zinc-600 hover:border-zinc-600 transition-colors">
                          {card.cta} <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="aspect-video bg-white/50 backdrop-blur-md rounded-xl shadow-inner border border-white/60 p-6 flex flex-col gap-4">
                        <div className="w-1/3 h-4 bg-zinc-300/50 rounded-full"></div>
                        <div className="w-full h-full bg-zinc-200/50 rounded-lg"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Study */}
      <section className="bg-black text-white py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-12">Featured Outcome</div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-[6rem] font-bold mb-16 leading-[0.9] tracking-tighter max-w-5xl"
          >
            CaseHub: Transforming State Court Operations.
          </motion.h2>
          
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-5">
              <p className="text-2xl text-zinc-400 mb-10 leading-snug font-medium">
                How we modernized a legacy case management system to reduce processing time by 40% and eliminate critical infrastructure risk.
              </p>
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors text-lg">
                Read Case Study
              </button>
            </div>
            <div className="md:col-span-7">
              <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="https://picsum.photos/seed/editorial/1000/600" alt="Case Study" className="w-full h-full object-cover opacity-80 grayscale hover:scale-105 transition-transform duration-1000 mix-blend-luminosity" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How We Work Teaser */}
      <section className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-10 leading-none mix-blend-difference text-white">Structure and clarity across every engagement.</h2>
            <p className="text-2xl text-zinc-800 mb-8 font-medium leading-snug">
              We partner exclusively with established organizations ($10M–$200M) facing concrete operational pain points.
            </p>
            <p className="text-xl text-zinc-700 leading-relaxed">
              Every engagement begins with a rigorous discovery phase to ensure alignment, map operational bottlenecks, and guarantee concrete ROI before development begins. We do not do staff augmentation or "just build it" projects.
            </p>
          </motion.div>
          <div className="flex flex-col justify-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-l-4 border-black/20 pl-8"
            >
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-600 mb-4">Discovery Phase</div>
              <div className="text-6xl md:text-7xl font-bold tracking-tighter text-zinc-900">$20K–$25K</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border-l-4 border-black/20 pl-8"
            >
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-600 mb-4">Typical Implementation</div>
              <div className="text-6xl md:text-7xl font-bold tracking-tighter text-zinc-900">$100K–$500K</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-40 text-center px-8 bg-black text-white rounded-t-[4rem] relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-[8rem] font-bold tracking-tighter mb-12 leading-none">Ready to scale?</h2>
          <button className="bg-white text-black px-12 py-6 rounded-full font-bold flex items-center gap-3 hover:bg-zinc-200 transition-colors text-2xl mx-auto mb-8 shadow-2xl shadow-white/10">
            Start Your Discovery <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">
            Engagements begin with a $20K–$25K discovery phase.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
