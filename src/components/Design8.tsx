import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Design8() {
  return (
    <div className="bg-zinc-950 text-white font-sans min-h-screen relative">
      
      {/* Global Noise Texture */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.03] pointer-events-none z-50 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter8">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter8)"/>
      </svg>

      <header className="fixed top-0 left-0 right-0 px-8 py-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-bold text-2xl tracking-tighter">Azul Arc</div>
        <button className="text-sm font-bold uppercase tracking-widest border-b border-white pb-1">Start Discovery</button>
      </header>

      {/* 
        RADICAL LAYOUT: Sticky Stacking Panels 
        Breaking the 6-section flow entirely. Each section is a full viewport height
        that sticks to the top, allowing the next section to slide over it.
      */}

      {/* Panel 1: Hero */}
      <section className="h-screen sticky top-0 bg-zinc-950 flex flex-col justify-center px-8 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"
        />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[6rem] md:text-[10rem] font-medium tracking-tighter leading-[0.85] mb-8"
          >
            We <br/>operationalize <br/>your business.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl md:text-3xl text-zinc-400 max-w-2xl font-light leading-snug"
          >
            An elite technology partner for established organizations ready to scale.
          </motion.p>
        </div>
        <div className="absolute bottom-12 left-8 text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-4">
          <div className="w-px h-12 bg-zinc-500"></div> Scroll to explore
        </div>
      </section>

      {/* Panel 2: GovTech */}
      <section className="h-screen sticky top-0 bg-blue-950 flex flex-col justify-center px-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-blue-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gov/1920/1080')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <div className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6">01 / Public Sector</div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 leading-tight">Drowning in legacy case management?</h2>
            <p className="text-2xl text-blue-200/70 mb-12 font-light leading-relaxed">
              We modernize court operations and rebuild legacy systems into scalable, secure platforms for judicial leadership.
            </p>
            <button className="bg-white text-blue-950 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors text-lg">
              Explore CaseHub <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden md:block">
            <div className="aspect-square rounded-full border border-blue-400/30 p-8 relative animate-[spin_60s_linear_infinite]">
              <div className="absolute inset-0 rounded-full border border-blue-400/10 scale-110"></div>
              <div className="absolute inset-0 rounded-full border border-blue-400/5 scale-125"></div>
              <div className="w-full h-full rounded-full border border-blue-400/50 border-dashed"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Panel 3: Manufacturing */}
      <section className="h-screen sticky top-0 bg-orange-950 flex flex-col justify-center px-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-orange-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/mfg/1920/1080')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div className="hidden md:block">
             <div className="aspect-video bg-orange-900/50 rounded-3xl border border-orange-500/30 backdrop-blur-md p-6 flex flex-col gap-4 transform -rotate-6 hover:rotate-0 transition-transform duration-700">
               <div className="w-full h-8 bg-orange-500/20 rounded-lg"></div>
               <div className="flex gap-4 flex-1">
                 <div className="w-1/3 bg-orange-500/20 rounded-lg"></div>
                 <div className="w-2/3 bg-orange-500/20 rounded-lg"></div>
               </div>
             </div>
          </div>
          <div>
            <div className="text-orange-400 font-bold uppercase tracking-widest text-sm mb-6">02 / Industrial</div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 leading-tight">Sales team flying blind?</h2>
            <p className="text-2xl text-orange-200/70 mb-12 font-light leading-relaxed">
              We illuminate commercial processes for physical product builders, creating digital twins that give your team unparalleled visibility.
            </p>
            <button className="bg-white text-orange-950 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-50 transition-colors text-lg">
              See Manufacturing Solutions <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Panel 4: SMBs */}
      <section className="h-screen sticky top-0 bg-emerald-950 flex flex-col justify-center px-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-emerald-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/smb/1920/1080')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <div className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-6">03 / Enterprise</div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 leading-tight">Outgrowing manual processes?</h2>
            <p className="text-2xl text-emerald-200/70 mb-12 font-light leading-relaxed">
              We automate bottlenecks, allowing established SMBs to scale operations without taking on proportional overhead.
            </p>
            <button className="bg-white text-emerald-950 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-50 transition-colors text-lg">
              Scale Without Overhead <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-emerald-500/20 rounded-3xl border border-emerald-400/30 backdrop-blur-md transform translate-y-8"></div>
              <div className="aspect-square bg-emerald-500/20 rounded-3xl border border-emerald-400/30 backdrop-blur-md"></div>
              <div className="aspect-square bg-emerald-500/20 rounded-3xl border border-emerald-400/30 backdrop-blur-md transform translate-y-8"></div>
              <div className="aspect-square bg-emerald-500/20 rounded-3xl border border-emerald-400/30 backdrop-blur-md"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Panel 5: The Investment (Final) */}
      <section className="min-h-screen sticky top-0 bg-zinc-100 text-zinc-900 flex flex-col justify-center px-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[3rem] z-20">
        <div className="max-w-7xl mx-auto w-full py-32">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-[8rem] font-medium tracking-tighter mb-8">The Investment.</h2>
            <p className="text-2xl text-zinc-500 font-light max-w-3xl mx-auto">
              We partner exclusively with established organizations ($10M–$200M). We do not do staff augmentation or "just build it" projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-200">
              <div className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-6">Phase 01</div>
              <h3 className="text-4xl font-medium tracking-tight mb-4">Discovery</h3>
              <div className="text-6xl font-medium tracking-tighter mb-8">$20K<span className="text-3xl text-zinc-400">-$25K</span></div>
              <p className="text-zinc-500 leading-relaxed">Rigorous mapping of operational bottlenecks to guarantee concrete ROI before development begins.</p>
            </div>
            <div className="bg-zinc-900 text-white p-12 rounded-[2.5rem] shadow-xl shadow-zinc-900/20 border border-zinc-800">
              <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-6">Phase 02</div>
              <h3 className="text-4xl font-medium tracking-tight mb-4">Implementation</h3>
              <div className="text-6xl font-medium tracking-tighter mb-8">$100K<span className="text-3xl text-zinc-500">-$500K</span></div>
              <p className="text-zinc-400 leading-relaxed">Full-scale systems architecture and engineering to operationalize your business.</p>
            </div>
          </div>

          <div className="mt-32 text-center">
            <button className="bg-blue-600 text-white px-12 py-6 rounded-full font-bold flex items-center gap-3 hover:bg-blue-700 transition-colors text-2xl mx-auto shadow-2xl shadow-blue-600/30">
              Start Your Discovery <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
