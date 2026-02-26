import { ArrowRight, LayoutGrid, BarChart3, Database } from 'lucide-react';
import { motion } from 'motion/react';

const springTransition = { type: "spring", stiffness: 100, damping: 20 };

export default function Design4() {
  return (
    <div className="bg-white text-zinc-900 font-sans min-h-screen relative overflow-hidden">
      {/* Dynamic Gradient Mesh Background */}
      <motion.div 
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/80 via-rose-50/50 to-white opacity-80 -z-10 blur-3xl bg-[length:200%_200%]"
      />

      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-xl flex items-center gap-3 tracking-tight"
        >
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">A</div>
          Azul Arc
        </motion.div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-24 pb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-[6.5rem] font-medium tracking-tight leading-[1.1] mb-10 text-zinc-900"
        >
          We{' '}
          <motion.span 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, ...springTransition }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="inline-flex items-center justify-center bg-blue-100/80 backdrop-blur-sm text-blue-900 text-4xl md:text-6xl px-6 py-2 rounded-3xl mx-2 align-middle font-semibold shadow-sm border border-blue-200/50 cursor-default"
          >
            operationalize
          </motion.span>{' '}
          your{' '}
          <motion.span 
            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, ...springTransition }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="inline-flex items-center justify-center bg-orange-100/80 backdrop-blur-sm text-orange-900 text-4xl md:text-6xl px-6 py-2 rounded-3xl mx-2 align-middle font-semibold shadow-sm border border-orange-200/50 cursor-default"
          >
            business.
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-zinc-600 max-w-2xl mx-auto mb-12 font-medium leading-snug"
        >
          An elite technology partner for established organizations ready to scale.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...springTransition }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl shadow-black/10 text-lg mx-auto"
        >
          Start Your Discovery <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>

      {/* 2. Logo Scroller */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-12 border-y border-zinc-100 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-8 mb-6 text-center text-sm font-bold text-zinc-400 uppercase tracking-widest">
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
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              prob: "Drowning in legacy case management?",
              cta: "Modernize Court Operations",
              gradient: "from-blue-100 to-indigo-50",
              icon: <Database className="w-8 h-8 text-blue-500" />
            },
            {
              prob: "Sales team flying blind with physical products?",
              cta: "Illuminate Commercial Processes",
              gradient: "from-orange-100 to-amber-50",
              icon: <LayoutGrid className="w-8 h-8 text-orange-500" />
            },
            {
              prob: "Outgrowing your manual processes?",
              cta: "Scale Without Overhead",
              gradient: "from-emerald-100 to-teal-50",
              icon: <BarChart3 className="w-8 h-8 text-emerald-500" />
            }
          ].map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, ...springTransition }}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${card.gradient} p-8 rounded-[2.5rem] mb-6 aspect-square flex flex-col relative overflow-hidden`}>
                {/* Abstract UI Mockup with floating animation */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i }}
                  className="absolute -right-4 -bottom-4 w-4/5 h-3/5 bg-white/60 backdrop-blur-md rounded-tl-2xl shadow-xl border border-white/80 p-6 flex flex-col gap-4"
                >
                  <motion.div className="w-1/3 h-3 bg-zinc-200 rounded-full" />
                  <motion.div 
                    className="w-full h-24 bg-zinc-100 rounded-xl origin-left"
                    whileHover={{ scaleX: 1.05 }}
                  />
                  <motion.div className="w-2/3 h-3 bg-zinc-200 rounded-full" />
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white/80 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-auto relative z-10"
                >
                  {card.icon}
                </motion.div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight leading-snug pr-4">{card.prob}</h3>
              <div className="text-zinc-500 font-medium flex items-center gap-2 group-hover:text-black transition-colors">
                {card.cta} <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Study */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-zinc-950 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px]"
          />
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6">Featured Outcome</div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">CaseHub: Transforming State Court Operations.</h2>
              <p className="text-zinc-400 text-xl mb-10 leading-relaxed">
                How we modernized a legacy case management system to reduce processing time by 40% and eliminate critical infrastructure risk.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-full font-bold transition-colors"
              >
                Read Case Study
              </motion.button>
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ ...springTransition }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
                <img src="https://picsum.photos/seed/dashboard/800/600" alt="Dashboard" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 5. How We Work Teaser */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">Structure and clarity across every engagement.</h2>
            <p className="text-xl text-zinc-600 leading-relaxed mb-8">
              We partner exclusively with established organizations ($10M–$200M) facing concrete operational pain points. We do not do staff augmentation or "just build it" projects.
            </p>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Every engagement begins with a rigorous discovery phase to ensure alignment, map operational bottlenecks, and guarantee concrete ROI before development begins.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-50 rounded-[2.5rem] p-12 border border-zinc-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -z-0 blur-2xl"></div>
            <div className="relative z-10">
              <div className="mb-10">
                <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-3">Discovery Phase</div>
                <div className="text-5xl font-semibold tracking-tighter text-zinc-900">$20K<span className="text-3xl text-zinc-400">-$25K</span></div>
              </div>
              <div className="w-full h-px bg-zinc-200 mb-10"></div>
              <div>
                <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-3">Typical Implementation</div>
                <div className="text-5xl font-semibold tracking-tighter text-zinc-900">$100K<span className="text-3xl text-zinc-400">-$500K</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-32 text-center px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/50 -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-10">Ready to operationalize?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/20 text-xl mx-auto mb-8"
          >
            Start Your Discovery <ArrowRight className="w-6 h-6" />
          </motion.button>
          <p className="text-zinc-500 font-medium">
            Engagements begin with a $20K–$25K discovery phase.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
