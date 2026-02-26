import { ArrowRight, ArrowUpRight, Terminal, LayoutGrid, BarChart3, Menu, X, ChevronDown, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

// --- Animation Variants ---
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

// --- Nav Data ---
const navLinks = [
  { label: 'Who We Serve', href: '#', hasDropdown: true },
  { label: 'Capabilities', href: '#' },
  { label: 'How We Work', href: '#' },
  { label: 'Work', href: '#' },
  { label: 'Insights', href: '#' },
  { label: 'About', href: '#' },
];

const segments = [
  { label: 'Court Systems', href: '#', desc: 'GovTech & judicial modernization' },
  { label: 'Product Manufacturers', href: '#', desc: 'Sales tools & commercial platforms' },
  { label: 'Growth-Stage SMBs', href: '#', desc: 'Scaling operations & legacy replacement' },
];

// --- SVG Transformation Animation ---
const SVGTransformUI = () => {
  return (
    <div className="w-full h-full bg-zinc-900/80 rounded-2xl overflow-hidden flex items-center justify-center p-4 md:p-8">
      <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="finalModernGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2176b9" />
            <stop offset="100%" stopColor="#125f9c" />
          </linearGradient>
          <linearGradient id="finalModernGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2aa7df" />
            <stop offset="100%" stopColor="#2176b9" />
          </linearGradient>
          <filter id="finalSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="15" stdDeviation="20" floodOpacity="0.08" />
          </filter>
        </defs>

        <motion.rect
          animate={{
            fill: ["#008080", "#008080", "#f8fafc", "#f8fafc", "#f8fafc", "#f8fafc", "#f8fafc", "#f8fafc", "#008080", "#008080"],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1] }}
          x="0" y="0" width="800" height="600"
        />

        <motion.rect
          animate={{
            x: [40, 40, 350, 350, 80, 80, 350, 350, 40, 40],
            y: [40, 40, 250, 250, 80, 80, 250, 250, 40, 40],
            width: [720, 720, 100, 100, 640, 640, 100, 100, 720, 720],
            height: [520, 520, 100, 100, 440, 440, 100, 100, 520, 520],
            fill: ["#c0c0c0", "#c0c0c0", "#2176b9", "#2176b9", "#ffffff", "#ffffff", "#2176b9", "#2176b9", "#c0c0c0", "#c0c0c0"],
            rx: [0, 0, 50, 50, 20, 20, 50, 50, 0, 0],
          }}
          style={{ filter: "url(#finalSoftShadow)" }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1] }}
        />

        {/* Legacy Elements */}
        <motion.g
          animate={{ opacity: [1, 1, 0, 0, 0, 0, 0, 0, 1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.15, 0.3, 0.4, 0.6, 0.7, 0.85, 0.9, 1] }}
        >
          <rect x="42" y="42" width="716" height="24" fill="#000080" />
          <rect x="730" y="46" width="16" height="16" fill="#c0c0c0" />
          <path d="M734 50 L742 58 M742 50 L734 58" stroke="#000" strokeWidth="2" />
          <text x="50" y="58" fill="#fff" fontFamily="monospace" fontSize="12" fontWeight="bold">Legacy_System_v3.1.exe</text>
          <rect x="50" y="80" width="150" height="470" fill="#ffffff" stroke="#808080" strokeWidth="2" />
          <rect x="50" y="80" width="150" height="20" fill="#000080" />
          <text x="55" y="94" fill="#fff" fontFamily="monospace" fontSize="10">Menu</text>
          <rect x="60" y="120" width="100" height="8" fill="#808080" />
          <rect x="60" y="140" width="120" height="8" fill="#808080" />
          <rect x="60" y="160" width="80" height="8" fill="#808080" />
          <rect x="210" y="80" width="540" height="470" fill="#ffffff" stroke="#808080" strokeWidth="2" />
          <rect x="210" y="80" width="540" height="20" fill="#000080" />
          <text x="215" y="94" fill="#fff" fontFamily="monospace" fontSize="10">Data_Viewer</text>
          <rect x="260" y="460" width="60" height="40" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <rect x="360" y="380" width="60" height="120" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <rect x="460" y="300" width="60" height="200" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <rect x="560" y="220" width="60" height="280" fill="#ff0000" stroke="#000" strokeWidth="2" />
        </motion.g>

        {/* Loading Spinner */}
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

        {/* Modern Elements */}
        <motion.g
          animate={{ opacity: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.35, 0.4, 0.6, 0.65, 0.8, 0.9, 1] }}
        >
          <rect x="110" y="105" width="40" height="40" fill="#2176b9" rx="12" />
          <text x="123" y="132" fill="#fff" fontFamily="sans-serif" fontSize="24" fontWeight="bold">A</text>
          <rect x="170" y="115" width="200" height="20" fill="#f1f5f9" rx="10" />
          <rect x="110" y="180" width="140" height="310" fill="#f8fafc" rx="16" />
          <rect x="120" y="200" width="120" height="30" fill="#dbeafe" rx="8" />
          <rect x="120" y="250" width="100" height="12" fill="#cbd5e1" rx="6" />
          <rect x="120" y="280" width="110" height="12" fill="#cbd5e1" rx="6" />
          <rect x="120" y="310" width="90" height="12" fill="#cbd5e1" rx="6" />
          <rect x="280" y="180" width="410" height="310" fill="#ffffff" rx="16" style={{ filter: "url(#finalSoftShadow)" }} />
          <rect x="320" y="410" width="40" height="40" fill="url(#finalModernGrad1)" rx="8" />
          <rect x="390" y="330" width="40" height="120" fill="url(#finalModernGrad2)" rx="8" />
          <rect x="460" y="250" width="40" height="200" fill="url(#finalModernGrad1)" rx="8" />
          <rect x="530" y="210" width="40" height="240" fill="url(#finalModernGrad2)" rx="8" />
          <rect x="600" y="290" width="40" height="160" fill="url(#finalModernGrad1)" rx="8" />
        </motion.g>
      </svg>
    </div>
  );
};

// --- Challenge Data ---
const challenges = [
  {
    id: 0,
    label: "01 / Government & Courts",
    prob: "Legacy systems slowing down your agency?",
    cta: "See How We Modernize Public Systems",
    desc: "State agencies run on software built decades ago. We replace fragile legacy systems with secure, modern platforms — without disrupting daily operations. Our CaseHub project cut case processing time by 40% for a state court system serving 2M+ residents.",
    icon: <Terminal className="w-5 h-5" />,
    accentBg: "bg-brand-blue/10",
    accentBorder: "border-brand-blue/30",
    accentText: "text-brand-blue",
    accentIcon: "text-brand-blue",
  },
  {
    id: 1,
    label: "02 / Manufacturing & Distribution",
    prob: "Your sales team can't see the full picture?",
    cta: "See How We Build Visibility",
    desc: "When product catalogs live in spreadsheets and pricing changes take weeks, revenue leaks. We build digital product platforms that give your sales team real-time inventory, dynamic pricing, and customer analytics — so they close faster.",
    icon: <LayoutGrid className="w-5 h-5" />,
    accentBg: "bg-brand-orange/10",
    accentBorder: "border-brand-orange/30",
    accentText: "text-brand-orange",
    accentIcon: "text-brand-orange",
  },
  {
    id: 2,
    label: "03 / Growth-Stage Companies",
    prob: "Manual processes killing your margins?",
    cta: "See How We Automate Growth",
    desc: "You've grown past what spreadsheets and workarounds can handle, but you're not ready for a 50-person IT department. We automate the operational bottlenecks — approvals, reporting, data entry — that are eating your margins and capping your growth.",
    icon: <BarChart3 className="w-5 h-5" />,
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    accentText: "text-emerald-600",
    accentIcon: "text-emerald-500",
  }
];

// --- Main Component ---
export default function DesignFinal() {
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serveDropdownOpen, setServeDropdownOpen] = useState(false);

  return (
    <div className="bg-[#fafafa] text-zinc-900 font-sans min-h-screen relative overflow-hidden selection:bg-brand-blue selection:text-white">

      {/* === Global Background Layers === */}

      {/* Noise Texture */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.04] pointer-events-none z-50 mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilterFinal">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilterFinal)"/>
      </svg>

      {/* Blueprint Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Ambient Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15], x: ['-5%', '5%', '-5%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-blue/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1], y: ['-5%', '5%', '-5%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand-dark/8 rounded-full blur-[150px]"
        />
      </div>


      {/* === 1. Navigation === */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-xl border-b border-zinc-200/50">
        <div className="px-6 lg:px-8 py-4 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono font-medium text-lg tracking-tight flex items-center gap-2.5 shrink-0"
          >
            <div className="w-3 h-3 bg-brand-blue rounded-sm" />
            Azul.Arc
          </motion.a>

          {/* Desktop Nav */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden lg:flex items-center gap-1"
          >
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />}
                </a>

                {/* Dropdown for "Who We Serve" */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white/90 backdrop-blur-xl rounded-xl border border-zinc-200/60 shadow-xl shadow-zinc-200/40 p-2 min-w-[280px]">
                      {segments.map((seg) => (
                        <a
                          key={seg.label}
                          href={seg.href}
                          className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-zinc-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-zinc-900">{seg.label}</span>
                          <span className="text-xs text-zinc-500">{seg.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:flex bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium items-center gap-2 hover:bg-zinc-800 transition-colors"
            >
              Book a Discovery Call <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden border-t border-zinc-200/50 bg-white/90 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setServeDropdownOpen(!serveDropdownOpen)}
                          className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${serveDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {serveDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 overflow-hidden"
                            >
                              {segments.map((seg) => (
                                <a key={seg.label} href={seg.href} className="block px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                                  {seg.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a href={link.href} className="block px-3 py-3 text-base font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
                <div className="pt-3 mt-2 border-t border-zinc-200/60">
                  <button className="w-full bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
                    Book a Discovery Call <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* === 2. Hero === */}
      <section className="max-w-7xl mx-auto px-8 pt-36 pb-28 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={fadeUp} className="text-[3rem] md:text-[7.5rem] font-display font-medium tracking-tighter leading-[0.9]">
              We build the software
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12 flex items-center gap-6">
            <motion.div variants={fadeUp} className="w-16 md:w-32 h-[2px] bg-zinc-900 hidden md:block" />
            <motion.h1 variants={fadeUp} className="text-[3rem] md:text-[7.5rem] font-display font-medium tracking-tighter leading-[0.9]">
              that{' '}
              <span className="inline-block bg-brand-blue/10 text-brand-blue px-3 md:px-5 py-0.5 md:py-1 rounded-xl md:rounded-2xl border border-brand-blue/20">
                runs
              </span>
              {' '}your business.
            </motion.h1>
          </div>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-8 md:gap-10 items-start md:items-center">
            <p className="text-xl md:text-2xl text-zinc-500 max-w-xl font-light leading-relaxed">
              Custom platforms for mid-market companies replacing legacy systems, automating operations, and scaling without bloat.
            </p>
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-zinc-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2.5 hover:bg-zinc-800 transition-colors text-lg shadow-lg shadow-zinc-900/10"
              >
                Book a Discovery Call <ArrowRight className="w-5 h-5" />
              </motion.button>
              <a href="#pricing" className="text-zinc-500 font-medium flex items-center gap-1.5 hover:text-zinc-900 transition-colors text-sm">
                See Pricing <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>


      {/* === 3. Logo Scroller === */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-10 border-y-2 border-zinc-900 relative z-10 bg-white/40 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center gap-12">
          <div className="text-xs font-mono text-zinc-500 tracking-widest shrink-0 uppercase">
            Trusted By
          </div>
          <div className="overflow-hidden mask-edges w-full">
            <div className="flex gap-20 items-center animate-marquee whitespace-nowrap opacity-40 grayscale">
              {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].map((i, idx) => (
                <div key={idx} className="text-2xl font-bold tracking-tighter shrink-0">
                  COMPANY {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>


      {/* === 4. Problem Routing — Accordion === */}
      <section className="max-w-7xl mx-auto px-8 py-28 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Sticky left sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4">
                Who We Help
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6 leading-[0.95]">
                Find your<br/>situation.
              </h2>
              <p className="text-lg text-zinc-500 font-light leading-relaxed">
                Every engagement starts by understanding the real problem — not just the symptom.
              </p>
            </motion.div>
          </div>

          {/* Accordion cards */}
          <div className="lg:w-2/3 flex flex-col gap-3 w-full">
            {challenges.map((card) => (
              <motion.div
                key={card.id}
                layout
                onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                className={`bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  activeCard === card.id
                    ? `${card.accentBorder} shadow-lg`
                    : 'border-zinc-200/60 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <motion.div layout className="p-6 md:p-8 flex items-center justify-between gap-4 md:gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      activeCard === card.id ? card.accentBg : 'bg-zinc-100'
                    }`}>
                      <span className={`transition-colors ${activeCard === card.id ? card.accentIcon : 'text-zinc-400'}`}>
                        {card.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase mb-1">
                        {card.label}
                      </div>
                      <motion.h3 layout className="text-lg md:text-2xl font-medium tracking-tight leading-tight">
                        {card.prob}
                      </motion.h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeCard === card.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      activeCard === card.id ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {activeCard === card.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 md:px-8 pb-8"
                    >
                      <div className="pt-6 border-t border-zinc-200/60">
                        <p className="text-lg text-zinc-600 font-light leading-relaxed mb-6 max-w-xl">
                          {card.desc}
                        </p>
                        <button className={`${card.accentText} font-medium flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-70 transition-opacity`}>
                          {card.cta} <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* === 5. Featured Case Study === */}
      <section className="bg-zinc-950 text-white py-24 md:py-32 relative z-10 overflow-hidden">
        {/* Subtle radial glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-blue/15 rounded-full blur-[150px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-xs font-mono text-brand-light mb-8 tracking-widest uppercase">
            Case Study
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-8 leading-[0.95] tracking-tighter">
                A state court system that hadn't updated since 2003.
              </h2>

              {/* Key metrics */}
              <div className="flex gap-8 mb-8">
                <div>
                  <div className="text-3xl md:text-4xl font-display font-medium text-brand-light">40%</div>
                  <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">Faster Processing</div>
                </div>
                <div className="w-px bg-zinc-800" />
                <div>
                  <div className="text-3xl md:text-4xl font-display font-medium text-brand-light">Zero</div>
                  <div className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">Downtime in Transition</div>
                </div>
              </div>

              <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-light">
                We rebuilt their case management platform from the ground up — replacing a brittle legacy system with a modern, secure application — while keeping 2,000+ court staff operational throughout.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-zinc-700 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-zinc-900 transition-colors flex items-center gap-2"
              >
                Read the Full Story <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Right: SVG Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[4/3] max-h-[400px] border border-zinc-800/50 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden"
            >
              <SVGTransformUI />
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 6. How We Work / Pricing === */}
      <section id="pricing" className="bg-[#fafafa] relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Left: Philosophy text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7"
            >
              <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-6">
                How We Work
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-8 leading-[0.95]">
                Two phases. No surprises.
              </h2>
              <div className="text-lg text-zinc-600 leading-relaxed space-y-5 max-w-2xl">
                <p>
                  We work exclusively with established companies ($10M–$200M revenue) facing concrete operational problems — not startups chasing product-market fit.
                </p>
                <p>
                  Every project starts with a paid discovery phase. We map your operations, identify the highest-leverage opportunities, and build a detailed technical plan with guaranteed ROI projections — before a single line of production code is written.
                </p>
              </div>
            </motion.div>

            {/* Right: Pricing cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="md:col-span-5 flex flex-col gap-6"
            >
              {/* Discovery Card */}
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/50">
                <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">
                  Phase 01 — Discovery
                </div>
                <div className="text-5xl md:text-6xl font-display font-medium tracking-tighter text-zinc-900 mb-3">
                  $20K<span className="text-2xl text-zinc-400 ml-1">– $25K</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  4–6 weeks. We map your operations, interview stakeholders, and deliver a technical blueprint with ROI guarantees.
                </p>
              </div>

              {/* Implementation Card */}
              <div className="bg-zinc-900 text-white p-8 md:p-10 rounded-2xl border border-zinc-800 shadow-lg shadow-zinc-900/20">
                <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-3">
                  Phase 02 — Build & Deploy
                </div>
                <div className="text-5xl md:text-6xl font-display font-medium tracking-tighter mb-3">
                  $100K<span className="text-2xl text-zinc-500 ml-1">– $500K</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  3–12 months. Full-scale engineering, deployment, and training — with milestones tied to measurable business outcomes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 7. Final CTA === */}
      <section className="py-24 md:py-32 text-center px-8 relative z-10 border-t border-zinc-200/60">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-[3rem] md:text-[6rem] font-display font-medium tracking-tighter mb-10 leading-[0.9] text-zinc-900">
            Let's talk about what's<br className="hidden md:block" /> slowing you down.
          </h2>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-zinc-900 text-white px-10 py-5 rounded-full font-medium flex items-center gap-3 hover:bg-zinc-800 transition-all text-xl mx-auto mb-8 shadow-xl shadow-zinc-900/20"
          >
            Book a Discovery Call <ArrowRight className="w-6 h-6" />
          </motion.button>
          <p className="text-zinc-500 font-mono text-sm tracking-wider">
            // Discovery engagements start at $20K. No commitment beyond that.
          </p>
        </motion.div>
      </section>


      {/* === 8. Footer === */}
      <footer className="bg-zinc-950 text-zinc-400 relative z-10">
        <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
            {/* Col 1: Logo + tagline */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="font-mono font-medium text-lg tracking-tight flex items-center gap-2.5 text-white mb-4">
                <div className="w-3 h-3 bg-brand-blue rounded-sm" />
                Azul.Arc
              </a>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[200px]">
                We build the software that runs your business.
              </p>
            </div>

            {/* Col 2: Navigate */}
            <div>
              <div className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
                Navigate
              </div>
              <ul className="space-y-2.5">
                {['Who We Serve', 'Capabilities', 'How We Work', 'Work'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <div className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
                Company
              </div>
              <ul className="space-y-2.5">
                {['About', 'Careers', 'Insights', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Connect */}
            <div>
              <div className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
                Connect
              </div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <Twitter className="w-4 h-4" /> Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} Azul Arc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
