import { ArrowRight, Terminal, Activity, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayedText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-4 bg-blue-600 ml-1 align-middle"
      />
    </span>
  );
};

export default function Design2() {
  return (
    <div className="bg-white text-zinc-900 font-sans min-h-screen selection:bg-blue-500/20">
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-zinc-100">
        <div className="font-mono font-bold text-xl tracking-tight flex items-center gap-3">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 bg-blue-600 rounded-sm"
          />
          Azul.Arc
        </div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-32 pb-24">
        <div className="inline-block border border-zinc-200 rounded-full px-4 py-1.5 text-xs font-mono text-zinc-500 mb-8 bg-zinc-50">
          <TypewriterText text="SYSTEMS ARCHITECTURE & ENGINEERING" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-[6.5rem] font-medium tracking-tight leading-[1.05] mb-8 max-w-5xl"
        >
          We operationalize <br/><span className="text-blue-600">your business.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl text-zinc-500 max-w-3xl font-light leading-relaxed mb-12"
        >
          An elite technology partner for established organizations ready to scale.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white px-8 py-4 rounded-md font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors text-lg"
        >
          Start Your Discovery <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>

      {/* 2. Logo Scroller */}
      <section className="py-12 border-y border-zinc-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="text-xs font-mono text-zinc-400 tracking-widest shrink-0">
            TRUSTED_BY
          </div>
          <div className="overflow-hidden mask-edges w-full">
            <div className="flex gap-20 items-center animate-marquee whitespace-nowrap opacity-40 grayscale">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-2xl font-bold font-serif tracking-tighter shrink-0">
                  COMPANY {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem-First Routing Cards (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          {[
            {
              prob: "Drowning in legacy case management?",
              cta: "Modernize Court Operations",
              icon: <Terminal className="w-6 h-6 text-blue-600" />,
              span: "md:col-span-8"
            },
            {
              prob: "Sales team flying blind with physical products?",
              cta: "Illuminate Commercial Processes",
              icon: <Activity className="w-6 h-6 text-blue-600" />,
              span: "md:col-span-4"
            },
            {
              prob: "Outgrowing your manual processes?",
              cta: "Scale Without Overhead",
              icon: <Code2 className="w-6 h-6 text-blue-600" />,
              span: "md:col-span-12"
            }
          ].map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group cursor-pointer border border-zinc-200 p-8 rounded-2xl hover:border-blue-600 transition-colors flex flex-col bg-white ${card.span} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              <div className="mb-6 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center relative z-10">
                {card.icon}
              </div>
              <h3 className="text-3xl font-medium mb-6 leading-snug relative z-10 max-w-2xl">{card.prob}</h3>
              <div className="mt-auto text-blue-600 font-mono text-sm flex items-center gap-2 relative z-10">
                {card.cta} <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Study */}
      <section className="border-y border-zinc-200 bg-zinc-50 py-32">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-mono text-blue-600 mb-6 tracking-wider">FEATURED_OUTCOME</div>
            <h2 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">CaseHub: Transforming State Court Operations.</h2>
            <p className="text-zinc-500 text-xl mb-10 leading-relaxed font-light">
              How we modernized a legacy case management system to reduce processing time by 40% and eliminate critical infrastructure risk.
            </p>
            <button className="border border-zinc-300 bg-white text-zinc-900 px-6 py-3 rounded-md font-medium hover:bg-zinc-100 transition-colors text-sm">
              Read Case Study
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-square bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
             <motion.img 
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.8 }}
               src="https://picsum.photos/seed/tech/800/800" 
               alt="Tech" 
               className="w-full h-full object-cover rounded-xl relative z-10 opacity-90" 
               referrerPolicy="no-referrer" 
             />
          </motion.div>
        </div>
      </section>

      {/* 5. How We Work Teaser */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-medium mb-8">Structure and clarity across every engagement.</h2>
            <p className="text-zinc-500 mb-6 text-lg leading-relaxed font-light">
              We partner exclusively with established organizations ($10M–$200M) facing concrete operational pain points.
            </p>
            <p className="text-zinc-500 text-lg leading-relaxed font-light">
              Every engagement begins with a rigorous discovery phase to ensure alignment, map operational bottlenecks, and guarantee concrete ROI before development begins. We do not do staff augmentation or "just build it" projects.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-zinc-200 p-8 rounded-xl bg-white"
            >
              <div className="text-xs font-mono text-zinc-400 mb-4 tracking-wider">DISCOVERY_PHASE</div>
              <div className="font-medium text-4xl text-zinc-900">$20K–$25K</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-zinc-200 p-8 rounded-xl bg-white"
            >
              <div className="text-xs font-mono text-zinc-400 mb-4 tracking-wider">TYPICAL_PROJECT</div>
              <div className="font-medium text-4xl text-zinc-900">$100K–$500K</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-32 text-center px-8 border-t border-zinc-100 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-medium mb-10">Ready to operationalize?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-10 py-5 rounded-md font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors text-lg mx-auto mb-8"
          >
            Start Your Discovery <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="text-zinc-500 font-mono text-sm">
            // Engagements begin with a $20K–$25K discovery phase.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
