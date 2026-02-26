import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Design3() {
  return (
    <div className="bg-white text-black font-sans min-h-screen">
      <header className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-black/10">
        <div className="font-bold text-2xl tracking-tighter">Azul.Arc</div>
      </header>

      {/* 1. Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-24 text-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-zinc-500">Welcome to Azul Arc</div>
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[0.85] mb-10">
            We operationalize<br/>your business.
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-zinc-600 leading-snug mb-12">
            An elite technology partner for established organizations ready to scale.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-transform mx-auto text-lg"
          >
            Start Your Discovery <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* 2. Logo Scroller */}
      <section className="py-10 border-y-2 border-black bg-zinc-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center gap-8">
          <div className="text-xs font-bold uppercase tracking-widest shrink-0">Trusted By</div>
          <div className="overflow-hidden mask-edges w-full">
            <div className="flex gap-16 items-center animate-marquee whitespace-nowrap opacity-60">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-2xl font-bold font-serif tracking-tighter shrink-0">
                  COMPANY {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem-First Routing Cards (Sticky Layout) */}
      <section className="max-w-7xl mx-auto px-8 py-32 relative">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <h2 className="text-5xl font-bold tracking-tighter mb-6 leading-none">Select your<br/>challenge.</h2>
            <p className="text-xl text-zinc-500 font-medium">We build solutions tailored to your specific operational bottlenecks.</p>
          </div>
          
          <div className="lg:w-2/3 flex flex-col gap-12">
            {[
              {
                prob: "Drowning in legacy case management?",
                cta: "Modernize Court Operations",
                bg: "bg-zinc-100"
              },
              {
                prob: "Sales team flying blind with physical products?",
                cta: "Illuminate Commercial Processes",
                bg: "bg-zinc-100"
              },
              {
                prob: "Outgrowing your manual processes?",
                cta: "Scale Without Overhead",
                bg: "bg-zinc-100"
              }
            ].map((card, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="group cursor-pointer flex flex-col md:flex-row gap-8 items-center"
              >
                <div className={`${card.bg} rounded-xl w-full md:w-1/2 aspect-square relative overflow-hidden shrink-0`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5"></div>
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white shadow-2xl border border-black/10 p-4 flex flex-col gap-3"
                  >
                    <div className="w-full h-1/2 bg-zinc-100"></div>
                    <div className="w-2/3 h-4 bg-zinc-200"></div>
                    <div className="w-1/2 h-4 bg-zinc-200"></div>
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">{card.prob}</h3>
                  <div className="text-zinc-500 font-bold flex items-center gap-2 group-hover:text-black transition-colors uppercase text-sm tracking-wider">
                    {card.cta} <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Case Study */}
      <section className="bg-black text-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 relative"
          >
            <div className="aspect-[3/4] bg-zinc-900 overflow-hidden relative group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://picsum.photos/seed/editorial/800/1000" 
                alt="Case Study" 
                className="w-full h-full object-cover opacity-80 grayscale" 
                referrerPolicy="no-referrer" 
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8">Featured Outcome</div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-none tracking-tighter">CaseHub: Transforming State Court Operations.</h2>
            <p className="text-2xl text-zinc-400 mb-12 leading-snug font-medium">
              How we modernized a legacy case management system to reduce processing time by 40% and eliminate critical infrastructure risk.
            </p>
            <button className="border-b-2 border-white pb-1 text-lg font-bold hover:text-zinc-400 hover:border-zinc-400 transition-colors flex items-center gap-2">
              Read Case Study <ArrowUpRight className="w-5 h-5" />
            </button>
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
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-10 leading-none">Structure and clarity across every engagement.</h2>
            <p className="text-2xl text-zinc-600 mb-8 font-medium leading-snug">
              We partner exclusively with established organizations ($10M–$200M) facing concrete operational pain points.
            </p>
            <p className="text-xl text-zinc-500 leading-relaxed">
              Every engagement begins with a rigorous discovery phase to ensure alignment, map operational bottlenecks, and guarantee concrete ROI before development begins. We do not do staff augmentation or "just build it" projects.
            </p>
          </motion.div>
          <div className="space-y-12 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border-b-2 border-black pb-10"
            >
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Discovery Phase</div>
              <div className="text-6xl font-bold tracking-tighter">$20K–$25K</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-b-2 border-black pb-10"
            >
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Typical Implementation</div>
              <div className="text-6xl font-bold tracking-tighter">$100K–$500K</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-32 text-center px-8 bg-zinc-50 border-t-2 border-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-[7rem] font-bold tracking-tighter mb-12 leading-none">Ready to<br/>operationalize?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-5 rounded-full font-bold flex items-center gap-2 transition-transform text-xl mx-auto mb-8"
          >
            Start Your Discovery <ArrowRight className="w-6 h-6" />
          </motion.button>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
            Engagements begin with a $20K–$25K discovery phase.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
