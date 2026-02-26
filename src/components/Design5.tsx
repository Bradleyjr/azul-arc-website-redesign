import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Design5() {
  return (
    <div className="bg-[#fafafa] text-zinc-900 font-sans min-h-screen selection:bg-zinc-900 selection:text-white">
      <header className="px-8 py-8 flex justify-between items-center max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-bold text-2xl tracking-tighter"
        >
          Azul Arc.
        </motion.div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-[1400px] mx-auto px-8 pt-24 pb-32">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <div className="overflow-hidden mb-6">
            <motion.h1 
              variants={fadeUp}
              className="text-6xl md:text-[8.5rem] font-medium tracking-tighter leading-[0.9]"
            >
              We operationalize
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12 flex items-center gap-8">
            <motion.div 
              variants={fadeUp}
              className="w-24 md:w-48 h-[2px] bg-zinc-900 hidden md:block"
            />
            <motion.h1 
              variants={fadeUp}
              className="text-6xl md:text-[8.5rem] font-medium tracking-tighter leading-[0.9]"
            >
              your business.
            </motion.h1>
          </div>
          
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-10 items-start md:items-center">
            <p className="text-2xl text-zinc-500 max-w-xl font-light leading-snug">
              An elite technology partner for established organizations ready to scale.
            </p>
            <button className="bg-zinc-900 text-white px-8 py-5 rounded-full font-medium flex items-center gap-3 hover:bg-zinc-800 transition-all text-lg group">
              Start Your Discovery 
              <motion.span
                group-hover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Logo Scroller */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-16 border-y border-zinc-200/60 bg-white"
      >
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="text-sm font-semibold text-zinc-400 uppercase tracking-widest shrink-0">
            Trusted by leaders at
          </div>
          <div className="overflow-hidden mask-edges w-full">
            <div className="flex gap-20 items-center animate-marquee whitespace-nowrap opacity-40 grayscale">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-2xl font-bold tracking-tighter shrink-0">
                  COMPANY {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Problem-First Routing Cards */}
      <section className="max-w-[1400px] mx-auto px-8 py-40">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-12 gap-12"
        >
          {[
            {
              prob: "Drowning in legacy case management?",
              cta: "Modernize Court Operations",
              colSpan: "md:col-span-5",
              height: "aspect-[4/5]"
            },
            {
              prob: "Sales team flying blind with physical products?",
              cta: "Illuminate Commercial Processes",
              colSpan: "md:col-span-7",
              height: "aspect-[16/9]"
            },
            {
              prob: "Outgrowing your manual processes?",
              cta: "Scale Without Overhead",
              colSpan: "md:col-span-12",
              height: "aspect-[21/9]"
            }
          ].map((card, i) => (
            <motion.div 
              variants={fadeUp}
              key={i} 
              className={`group cursor-pointer flex flex-col ${card.colSpan}`}
            >
              <div className={`bg-zinc-100 rounded-2xl mb-8 ${card.height} relative overflow-hidden border border-zinc-200/50`}>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-8 md:inset-12 bg-white rounded-xl shadow-sm border border-zinc-200 p-8 flex flex-col gap-6"
                >
                  <div className="w-1/4 h-2 bg-zinc-200 rounded-full"></div>
                  <div className="w-full h-24 bg-zinc-50 rounded-lg border border-zinc-100"></div>
                  <div className="w-full flex-1 bg-zinc-50 rounded-lg border border-zinc-100"></div>
                </motion.div>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight max-w-xl">{card.prob}</h3>
                <div className="text-zinc-500 font-medium flex items-center gap-2 group-hover:text-zinc-900 transition-colors shrink-0">
                  {card.cta} <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Featured Case Study */}
      <section className="bg-zinc-900 text-white py-40 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-zinc-400 font-medium uppercase tracking-widest text-xs mb-8">Featured Outcome</div>
            <h2 className="text-5xl md:text-6xl font-medium mb-8 leading-tight tracking-tight">CaseHub: Transforming State Court Operations.</h2>
            <p className="text-zinc-400 text-xl mb-12 leading-relaxed font-light">
              How we modernized a legacy case management system to reduce processing time by 40% and eliminate critical infrastructure risk.
            </p>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-colors">
              Read Case Study
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[4/5] bg-zinc-800 rounded-2xl overflow-hidden relative"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src="https://picsum.photos/seed/agency/800/1000" 
              alt="Case Study" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
        </div>
      </section>

      {/* 5. How We Work Teaser */}
      <section className="max-w-[1400px] mx-auto px-8 py-40">
        <div className="grid md:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight mb-10 leading-tight">Structure and clarity across every engagement.</h2>
            <div className="text-xl text-zinc-500 leading-relaxed space-y-6 font-light max-w-2xl">
              <p>
                We partner exclusively with established organizations ($10M–$200M) facing concrete operational pain points.
              </p>
              <p>
                Every engagement begins with a rigorous discovery phase to ensure alignment, map operational bottlenecks, and guarantee concrete ROI before development begins. We do not do staff augmentation or "just build it" projects.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <div className="bg-white p-12 rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/50">
              <div className="mb-12">
                <div className="text-zinc-400 font-medium uppercase tracking-widest text-xs mb-4">Discovery Phase</div>
                <div className="text-6xl font-medium tracking-tighter text-zinc-900">$20K<span className="text-3xl text-zinc-400">-$25K</span></div>
              </div>
              <div className="w-full h-px bg-zinc-100 mb-12"></div>
              <div>
                <div className="text-zinc-400 font-medium uppercase tracking-widest text-xs mb-4">Typical Implementation</div>
                <div className="text-6xl font-medium tracking-tighter text-zinc-900">$100K<span className="text-3xl text-zinc-400">-$500K</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-40 border-t border-zinc-200/60 text-center px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h2 className="text-6xl md:text-[7rem] font-medium tracking-tighter mb-12">Ready to operationalize?</h2>
          <button className="bg-zinc-900 text-white px-10 py-5 rounded-full font-medium flex items-center gap-3 hover:bg-zinc-800 transition-all text-xl mx-auto mb-8 group">
            Start Your Discovery 
            <motion.span group-hover={{ x: 5 }} transition={{ type: "spring" }}>
              <ArrowRight className="w-6 h-6" />
            </motion.span>
          </button>
          <p className="text-zinc-500 font-medium">
            Engagements begin with a $20K–$25K discovery phase.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
