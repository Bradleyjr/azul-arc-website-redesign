import { ArrowRight, Database, LayoutGrid, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

const SVGTransformUI = () => {
  return (
    <div className="w-full h-full bg-zinc-100 rounded-3xl overflow-hidden flex items-center justify-center p-4 md:p-8">
      <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="modernGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="modernGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="15" stdDeviation="20" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Base Desktop / Background */}
        <motion.rect 
          animate={{
            fill: ["#008080", "#008080", "#f8fafc", "#f8fafc", "#f8fafc", "#f8fafc", "#f8fafc", "#f8fafc", "#008080", "#008080"],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1] }}
          x="0" y="0" width="800" height="600"
        />

        {/* Main Application Window / Loading Ball */}
        <motion.rect 
          animate={{
            x: [40, 40, 350, 350, 80, 80, 350, 350, 40, 40],
            y: [40, 40, 250, 250, 80, 80, 250, 250, 40, 40],
            width: [720, 720, 100, 100, 640, 640, 100, 100, 720, 720],
            height: [520, 520, 100, 100, 440, 440, 100, 100, 520, 520],
            fill: ["#c0c0c0", "#c0c0c0", "#3b82f6", "#3b82f6", "#ffffff", "#ffffff", "#3b82f6", "#3b82f6", "#c0c0c0", "#c0c0c0"],
            rx: [0, 0, 50, 50, 20, 20, 50, 50, 0, 0],
          }}
          style={{ filter: "url(#softShadow)" }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1] }}
        />

        {/* Legacy Elements (Fade out during loading) */}
        <motion.g
          animate={{ opacity: [1, 1, 0, 0, 0, 0, 0, 0, 1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.15, 0.3, 0.4, 0.6, 0.7, 0.85, 0.9, 1] }}
        >
           {/* Legacy Title Bar */}
           <rect x="42" y="42" width="716" height="24" fill="#000080" />
           <rect x="730" y="46" width="16" height="16" fill="#c0c0c0" />
           <path d="M734 50 L742 58 M742 50 L734 58" stroke="#000" strokeWidth="2" />
           <text x="50" y="58" fill="#fff" fontFamily="monospace" fontSize="12" fontWeight="bold">Legacy_System_v3.1.exe</text>
           
           {/* Legacy Sidebar */}
           <rect x="50" y="80" width="150" height="470" fill="#ffffff" stroke="#808080" strokeWidth="2" />
           <rect x="50" y="80" width="150" height="20" fill="#000080" />
           <text x="55" y="94" fill="#fff" fontFamily="monospace" fontSize="10">Menu</text>
           <rect x="60" y="120" width="100" height="8" fill="#808080" />
           <rect x="60" y="140" width="120" height="8" fill="#808080" />
           <rect x="60" y="160" width="80" height="8" fill="#808080" />

           {/* Legacy Chart Area */}
           <rect x="210" y="80" width="540" height="470" fill="#ffffff" stroke="#808080" strokeWidth="2" />
           <rect x="210" y="80" width="540" height="20" fill="#000080" />
           <text x="215" y="94" fill="#fff" fontFamily="monospace" fontSize="10">Data_Viewer</text>
           
           {/* Legacy Bars */}
           <rect x="260" y="460" width="60" height="40" fill="#ff0000" stroke="#000" strokeWidth="2" />
           <rect x="360" y="380" width="60" height="120" fill="#ff0000" stroke="#000" strokeWidth="2" />
           <rect x="460" y="300" width="60" height="200" fill="#ff0000" stroke="#000" strokeWidth="2" />
           <rect x="560" y="220" width="60" height="280" fill="#ff0000" stroke="#000" strokeWidth="2" />
        </motion.g>

        {/* Loading Spinner Ring (Visible only during loading) */}
        <motion.circle
          cx="400" cy="300" r="70"
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="8"
          strokeDasharray="100 300"
          strokeLinecap="round"
          animate={{ 
            opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
            rotate: [0, 0, 180, 540, 720, 720, 900, 1260, 1440, 1440]
          }}
          style={{ transformOrigin: "400px 300px" }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1] }}
        />

        {/* Modern Elements (Fade in after loading) */}
        <motion.g
          animate={{ opacity: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.35, 0.4, 0.6, 0.65, 0.8, 0.9, 1] }}
        >
           {/* Modern Header */}
           <rect x="110" y="105" width="40" height="40" fill="#3b82f6" rx="12" />
           <text x="123" y="132" fill="#fff" fontFamily="sans-serif" fontSize="24" fontWeight="bold">A</text>
           <rect x="170" y="115" width="200" height="20" fill="#f1f5f9" rx="10" />
           
           {/* Modern Sidebar */}
           <rect x="110" y="180" width="140" height="310" fill="#f8fafc" rx="16" />
           <rect x="120" y="200" width="120" height="30" fill="#e0e7ff" rx="8" />
           <rect x="120" y="250" width="100" height="12" fill="#cbd5e1" rx="6" />
           <rect x="120" y="280" width="110" height="12" fill="#cbd5e1" rx="6" />
           <rect x="120" y="310" width="90" height="12" fill="#cbd5e1" rx="6" />
           
           {/* Modern Chart Area */}
           <rect x="280" y="180" width="410" height="310" fill="#ffffff" rx="16" style={{ filter: "url(#softShadow)" }} />
           
           {/* Modern Bars */}
           <rect x="320" y="410" width="40" height="40" fill="url(#modernGrad1)" rx="8" />
           <rect x="390" y="330" width="40" height="120" fill="url(#modernGrad2)" rx="8" />
           <rect x="460" y="250" width="40" height="200" fill="url(#modernGrad1)" rx="8" />
           <rect x="530" y="210" width="40" height="240" fill="url(#modernGrad2)" rx="8" />
           <rect x="600" y="290" width="40" height="160" fill="url(#modernGrad1)" rx="8" />
        </motion.g>
      </svg>
    </div>
  );
};

export default function Design6() {
  return (
    <div className="bg-[#fafafa] text-zinc-900 font-sans min-h-screen relative overflow-hidden">
      {/* 1. Global Noise Texture for Tactile Feel */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.04] pointer-events-none z-50 mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter6">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter6)"/>
      </svg>

      {/* 2. Animated Spatial Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: ['-5%', '5%', '-5%']
          }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            y: ['-5%', '5%', '-5%']
          }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-indigo-600/10 rounded-full blur-[150px]"
        />
      </div>

      {/* 3. Blueprint Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-zinc-200/50 relative z-10 bg-white/40 backdrop-blur-md">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-600 rounded-sm shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
          Azul Arc
        </div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-24 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-1 bg-blue-600 mb-8 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-[7rem] font-medium tracking-tight leading-[0.95] mb-8"
            >
              We operationalize your business.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-zinc-600 max-w-2xl font-light leading-snug mb-10"
            >
              An elite technology partner for established organizations ready to scale.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-none font-medium flex items-center gap-3 hover:bg-blue-700 transition-colors text-lg shadow-lg shadow-blue-600/20"
            >
              Start Your Discovery <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="md:col-span-4 hidden md:block relative">
            {/* Abstract Blueprint Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-square border border-zinc-300/50 bg-white/30 backdrop-blur-xl p-8 relative flex flex-col gap-4 shadow-2xl shadow-blue-900/5"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-600 -mt-px -ml-px"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-600 -mt-px -mr-px"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-600 -mb-px -ml-px"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-600 -mb-px -mr-px"></div>
              
              <motion.div animate={{ height: ["20%", "80%", "20%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-full bg-white/50 border border-zinc-300/50 backdrop-blur-sm"></motion.div>
              <div className="flex gap-4 flex-1">
                <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-1/2 bg-white/50 border border-zinc-300/50 backdrop-blur-sm"></motion.div>
                <motion.div animate={{ height: ["40%", "90%", "40%"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="w-1/2 bg-white/50 border border-zinc-300/50 backdrop-blur-sm"></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Logo Scroller */}
      <section className="py-10 border-y border-zinc-200/50 bg-white/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex items-center gap-12">
          <div className="text-xs font-mono text-zinc-500 tracking-widest shrink-0 uppercase">
            Trusted By Leaders
          </div>
          <div className="overflow-hidden mask-edges w-full">
            <div className="flex gap-20 items-center animate-marquee whitespace-nowrap opacity-50 grayscale">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-2xl font-bold font-serif tracking-tighter shrink-0">
                  COMPANY {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem-First Routing Cards */}
      <section className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="grid md:grid-cols-3 gap-px bg-zinc-200/50 border border-zinc-200/50 backdrop-blur-sm shadow-xl shadow-zinc-900/5">
          {[
            {
              prob: "Drowning in legacy case management?",
              cta: "Modernize Court Operations",
              icon: <Database className="w-6 h-6 text-blue-600" />
            },
            {
              prob: "Sales team flying blind with physical products?",
              cta: "Illuminate Commercial Processes",
              icon: <LayoutGrid className="w-6 h-6 text-blue-600" />
            },
            {
              prob: "Outgrowing your manual processes?",
              cta: "Scale Without Overhead",
              icon: <BarChart3 className="w-6 h-6 text-blue-600" />
            }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/80 backdrop-blur-md p-10 group cursor-pointer hover:bg-white transition-colors flex flex-col relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-8 w-12 h-12 border border-zinc-200 flex items-center justify-center bg-white group-hover:border-blue-600 transition-colors relative z-10 shadow-sm">
                {card.icon}
              </div>
              
              {/* Blueprint UI Mockup */}
              <div className="mb-10 aspect-video border border-zinc-200/80 bg-zinc-50/50 p-4 flex flex-col gap-2 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-50"></div>
                <motion.div 
                  className="w-full h-4 border border-zinc-300 bg-white/80 backdrop-blur-sm relative z-10"
                  whileHover={{ width: "90%" }}
                />
                <motion.div 
                  className="w-3/4 h-4 border border-zinc-300 bg-white/80 backdrop-blur-sm relative z-10"
                  whileHover={{ width: "100%" }}
                />
                <motion.div 
                  className="w-1/2 h-4 border border-zinc-300 bg-white/80 backdrop-blur-sm relative z-10"
                  whileHover={{ width: "80%" }}
                />
              </div>

              <h3 className="text-2xl font-medium mb-6 leading-snug relative z-10">{card.prob}</h3>
              <div className="mt-auto text-blue-600 font-medium flex items-center gap-2 text-sm uppercase tracking-wider relative z-10">
                {card.cta} <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Study */}
      <section className="border-y border-zinc-200/50 bg-white/40 backdrop-blur-lg py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs font-mono text-blue-600 mb-6 tracking-widest uppercase">Featured Outcome</div>
            <h2 className="text-4xl md:text-5xl font-medium mb-8 leading-tight tracking-tight">CaseHub: Transforming State Court Operations.</h2>
            <p className="text-zinc-600 text-xl mb-10 leading-relaxed font-light">
              How we modernized a legacy case management system to reduce processing time by 40% and eliminate critical infrastructure risk.
            </p>
            <button className="border border-zinc-300 bg-white text-zinc-900 px-8 py-4 font-medium hover:bg-zinc-50 transition-colors shadow-sm">
              Read Case Study
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] bg-white/80 backdrop-blur-sm border border-zinc-200 p-2 relative overflow-hidden group shadow-2xl shadow-zinc-900/10 rounded-3xl"
          >
             <SVGTransformUI />
          </motion.div>
        </div>
      </section>

      {/* 5. How We Work Teaser */}
      <section className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-medium mb-8 tracking-tight">Structure and clarity across every engagement.</h2>
            <p className="text-zinc-600 mb-6 text-xl leading-relaxed font-light">
              We partner exclusively with established organizations ($10M–$200M) facing concrete operational pain points.
            </p>
            <p className="text-zinc-600 text-xl leading-relaxed font-light">
              Every engagement begins with a rigorous discovery phase to ensure alignment, map operational bottlenecks, and guarantee concrete ROI before development begins. We do not do staff augmentation or "just build it" projects.
            </p>
          </motion.div>
          <div className="flex flex-col gap-px bg-zinc-200/50 border border-zinc-200/50 shadow-xl shadow-zinc-900/5 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md p-12 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-xs font-mono text-zinc-500 mb-4 tracking-widest uppercase relative z-10">Discovery Phase</div>
              <div className="font-medium text-5xl text-zinc-900 relative z-10">$20K–$25K</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md p-12 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-xs font-mono text-zinc-500 mb-4 tracking-widest uppercase relative z-10">Typical Implementation</div>
              <div className="font-medium text-5xl text-zinc-900 relative z-10">$100K–$500K</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-32 text-center px-8 border-t border-zinc-200/50 bg-white/40 backdrop-blur-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-medium mb-10 tracking-tight">Ready to operationalize?</h2>
          <button className="bg-blue-600 text-white px-10 py-5 rounded-none font-medium flex items-center gap-3 hover:bg-blue-700 transition-colors text-xl mx-auto mb-8 shadow-lg shadow-blue-600/20">
            Start Your Discovery <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
            Engagements begin with a $20K–$25K discovery phase.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
