import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Design1() {
  return (
    <div className="bg-[#fcfcfc] text-zinc-900 font-sans min-h-screen relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-bold text-xl tracking-tighter"
        >
          Azul Arc
        </motion.div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-4xl mx-auto px-8 pt-32 pb-24 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-8 text-zinc-900"
        >
          We operationalize your business.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-12"
        >
          An elite technology partner for established organizations ready to scale.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-zinc-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200 flex items-center gap-2 mx-auto"
        >
          Start Your Discovery <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>

      {/* 2. Logo Scroller */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-8 mb-8 text-center text-sm font-semibold text-zinc-400 uppercase tracking-widest">
          Trusted by leaders at
        </div>
        <div className="max-w-5xl mx-auto overflow-hidden mask-edges">
          <div className="flex gap-16 items-center animate-marquee whitespace-nowrap opacity-50 grayscale">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="text-2xl font-bold font-serif tracking-tighter shrink-0">
                COMPANY {i}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Problem-First Routing Cards */}
      <section className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              prob: "Drowning in legacy case management?",
              cta: "Modernize Court Operations",
              bg: "bg-blue-50"
            },
            {
              prob: "Sales team flying blind with physical products?",
              cta: "Illuminate Commercial Processes",
              bg: "bg-orange-50"
            },
            {
              prob: "Outgrowing your manual processes?",
              cta: "Scale Without Overhead",
              bg: "bg-green-50"
            }
          ].map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-zinc-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer group flex flex-col"
            >
              <div className={`${card.bg} rounded-2xl mb-8 aspect-video relative overflow-hidden flex items-center justify-center`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-3/4 h-3/4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white p-4 flex flex-col gap-3"
                >
                  <div className="w-full h-4 bg-zinc-200/50 rounded"></div>
                  <div className="w-2/3 h-4 bg-zinc-200/50 rounded"></div>
                </motion.div>
              </div>
              <h3 className="text-2xl font-semibold mb-6 tracking-tight leading-snug">{card.prob}</h3>
              <div className="mt-auto text-zinc-500 font-medium flex items-center gap-2 group-hover:text-zinc-900 transition-colors">
                {card.cta} <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Study */}
      <section className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-zinc-100 rounded-[2.5rem] p-12 md:p-16 grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <div className="text-zinc-500 font-semibold uppercase tracking-widest text-sm mb-6">Featured Outcome</div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">CaseHub: Transforming State Court Operations.</h2>
            <p className="text-zinc-600 text-xl mb-10 leading-relaxed">
              How we modernized a legacy case management system to reduce processing time by 40% and eliminate critical infrastructure risk.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-zinc-900 px-8 py-4 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow"
            >
              Read Case Study
            </motion.button>
          </div>
          <div className="aspect-[4/3] bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden relative group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src="https://picsum.photos/seed/clean/800/600" 
              alt="Case Study" 
              className="w-full h-full object-cover opacity-90" 
              referrerPolicy="no-referrer" 
            />
          </div>
        </motion.div>
      </section>

      {/* 5. How We Work Teaser */}
      <section className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">Structure and clarity across every engagement.</h2>
            <p className="text-zinc-600 mb-6 text-xl leading-relaxed">
              We partner exclusively with established organizations ($10M–$200M) facing concrete operational pain points.
            </p>
            <p className="text-zinc-600 text-xl leading-relaxed">
              Every engagement begins with a rigorous discovery phase to ensure alignment, map operational bottlenecks, and guarantee concrete ROI before development begins. We do not do staff augmentation or "just build it" projects.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 bg-white rounded-[2.5rem] p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-zinc-100 w-full"
          >
            <div className="mb-10">
              <div className="text-zinc-500 font-semibold uppercase tracking-widest text-sm mb-3">Discovery Phase</div>
              <div className="text-5xl font-semibold tracking-tight text-zinc-900">$20K–$25K</div>
            </div>
            <div className="w-full h-px bg-zinc-100 mb-10"></div>
            <div>
              <div className="text-zinc-500 font-semibold uppercase tracking-widest text-sm mb-3">Typical Implementation</div>
              <div className="text-5xl font-semibold tracking-tight text-zinc-900">$100K–$500K</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-32 text-center px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-10">Ready to operationalize?</h2>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-zinc-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200 flex items-center gap-2 mx-auto mb-8"
          >
            Start Your Discovery <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="text-zinc-500 font-medium">
            Engagements begin with a $20K–$25K discovery phase.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
