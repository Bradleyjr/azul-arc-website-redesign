import { ArrowRight, ArrowUpRight, Terminal, GridFour, ChartBar, List, X, CaretDown, LinkedinLogo, XLogo, EnvelopeSimple, Monitor, Database, FlowArrow, Stack, HardDrives, Code, MagnifyingGlass, FileCode, Rocket, Headset, Quotes } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

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

// --- Hero Background Component ---
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <MeshGradient
      speed={0.6}
      colors={['#e0eaff', '#9ecdff', '#f5faff', '#ebf9ff']}
      distortion={0.83}
      swirl={0}
      grainMixer={0.25}
      grainOverlay={0}
      fit="contain"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  </div>
);

// --- Nav Data ---
const navLinks = [
  { label: 'Industries', href: '#industries', hasDropdown: true, dropdownKey: 'industries' },
  { label: 'What We Do', href: '#what-we-do', hasDropdown: true, dropdownKey: 'whatWeDo' },
  { label: 'How We Work', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Insights & Resources', href: '#insights' },
  { label: 'About', href: '#about' },
];

const industries = [
  { label: 'Court Systems', href: '#industries', desc: 'GovTech & judicial modernization', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&q=80' },
  { label: 'Product Manufacturers', href: '#industries', desc: 'Sales tools & commercial platforms', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&q=80' },
  { label: 'Growth-Stage SMBs', href: '#industries', desc: 'Scaling operations & legacy replacement', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&q=80' },
];

const services = [
  { label: 'Digital Product Strategy', href: '#what-we-do', desc: 'Research-driven roadmaps for digital products', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop&q=80' },
  { label: 'Custom Web Design & Development', href: '#what-we-do', desc: 'Bespoke platforms built for your workflow', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop&q=80' },
  { label: '3D Visualisation', href: '#what-we-do', desc: 'Immersive 3D experiences & product renders', image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=300&fit=crop&q=80' },
  { label: 'Case Management Systems', href: '#what-we-do', desc: 'End-to-end case tracking & automation', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80' },
];

const dropdownItems: Record<string, typeof industries> = {
  industries,
  whatWeDo: services,
};

// --- Challenge Data ---
const challenges = [
  {
    id: 0,
    label: "01 / Government & Courts",
    prob: "Legacy systems slowing down your agency?",
    cta: "See How We Modernize Public Systems",
    desc: "State agencies run on software built decades ago. We replace fragile legacy systems with secure, modern platforms — without disrupting daily operations. Our CaseHub project cut case processing time by 40% for a state court system serving 2M+ residents.",
    icon: <Terminal size={20} weight="duotone" />,
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
    icon: <GridFour size={20} weight="duotone" />,
    accentBg: "bg-brand-orange/10",
    accentBorder: "border-brand-orange/30",
    accentText: "text-brand-orange",
    accentIcon: "text-brand-orange",
  },
  {
    id: 2,
    label: "03 / Growth-Stage Companies",
    prob: "Manual processes killing your margins?",
    cta: "See How We Automate Operations",
    desc: "You've grown past what spreadsheets and workarounds can handle, but you're not ready for a 50-person IT department. We automate the operational bottlenecks — approvals, reporting, data entry — that are eating your margins and capping your growth.",
    icon: <ChartBar size={20} weight="duotone" />,
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    accentText: "text-emerald-600",
    accentIcon: "text-emerald-500",
  }
];

// --- Capabilities Data ---
const capabilities = [
  {
    icon: <Monitor size={24} weight="duotone" />,
    title: "Custom Platforms",
    desc: "Purpose-built applications designed around how your team actually works — not how a vendor thinks you should.",
  },
  {
    icon: <Database size={24} weight="duotone" />,
    title: "Data & Analytics",
    desc: "Dashboards and reporting that surface real-time insights, not last month's spreadsheet.",
  },
  {
    icon: <Stack size={24} weight="duotone" />,
    title: "System Integrations",
    desc: "Connect your ERP, CRM, and operational tools into a single source of truth.",
  },
  {
    icon: <FlowArrow size={24} weight="duotone" />,
    title: "Workflow Automation",
    desc: "Eliminate manual approvals, data entry, and reporting that slow your team down.",
  },
  {
    icon: <HardDrives size={24} weight="duotone" />,
    title: "Legacy Modernization",
    desc: "Migrate off decades-old systems without disrupting daily operations or losing data.",
  },
  {
    icon: <Code size={24} weight="duotone" />,
    title: "API & Cloud Infrastructure",
    desc: "Scalable backends, secure APIs, and cloud architecture built for reliability.",
  },
  {
    icon: <Monitor size={24} weight="duotone" />,
    title: "UX & Product Design",
    desc: "Research-driven interfaces that your team will actually want to use every day.",
  },
  {
    icon: <Database size={24} weight="duotone" />,
    title: "Mobile Applications",
    desc: "Native and cross-platform apps that bring your operations into the field.",
  },
];

// --- Process Steps ---
const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "We map your operations, interview stakeholders, and identify the highest-leverage opportunities for impact.",
    icon: <MagnifyingGlass size={20} weight="duotone" />,
    duration: "2–3 weeks",
  },
  {
    num: "02",
    title: "Blueprint",
    desc: "A detailed technical plan with architecture decisions, timeline, and guaranteed ROI projections.",
    icon: <FileCode size={20} weight="duotone" />,
    duration: "2–3 weeks",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Agile sprints with milestone demos. You see working software every two weeks — not slide decks.",
    icon: <Code size={20} weight="duotone" />,
    duration: "3–9 months",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Phased rollouts, data migration, and hands-on training so adoption happens on day one.",
    icon: <Rocket size={20} weight="duotone" />,
    duration: "2–4 weeks",
  },
  {
    num: "05",
    title: "Evolve",
    desc: "Ongoing maintenance, performance monitoring, and iterative improvements as your needs grow.",
    icon: <Headset size={20} weight="duotone" />,
    duration: "Ongoing",
  },
];

// --- Testimonials Data ---
const testimonials = [
  {
    quote: "Azul Arc didn't just build us a new system — they understood our operations deeply enough to fix problems we didn't know we had. Processing time dropped 40% in the first quarter.",
    name: "Director of Court Administration",
    company: "State Judicial Branch",
  },
  {
    quote: "Our sales team went from juggling three spreadsheets to a single platform with real-time pricing. The ROI paid for the engagement in four months.",
    name: "VP of Commercial Operations",
    company: "Industrial Manufacturer",
  },
  {
    quote: "We were drowning in manual processes but couldn't justify a full IT department. Azul Arc automated our biggest bottlenecks and gave us room to grow.",
    name: "COO",
    company: "Growth-Stage Services Company",
  },
  {
    quote: "The discovery phase alone was worth the investment. They mapped our operations better than our own team had in ten years.",
    name: "CTO",
    company: "National Distribution Company",
  },
  {
    quote: "Zero downtime during the transition. Our 2,000+ staff didn't miss a beat. That's what sold us on Azul Arc — they actually deliver.",
    name: "Deputy Director of IT",
    company: "State Government Agency",
  },
  {
    quote: "They replaced a system we'd been afraid to touch for 15 years. The new platform handles triple the volume with half the errors.",
    name: "VP of Operations",
    company: "Regional Manufacturer",
  },
];


// --- Main Component ---
export default function DesignFinal() {
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);


  return (
    <div className="bg-[#fafafa] text-zinc-900 font-sans min-h-screen relative overflow-hidden selection:bg-brand-blue selection:text-white">

      {/* === Global Background Layers === */}

      {/* Noise Texture */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.04] pointer-events-none z-[60] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
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
        <div className="px-6 lg:px-8 py-3 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="shrink-0"
          >
            <img src="/azul-arc-logo.png" alt="Azul Arc" className="h-10 w-auto" />
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
                  {link.hasDropdown && <CaretDown size={14} weight="duotone" className="text-zinc-400 group-hover:text-zinc-600 transition-colors" />}
                </a>

                {link.hasDropdown && link.dropdownKey && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl shadow-zinc-300/40 p-4">
                      <div className={`grid gap-3 ${link.dropdownKey === 'industries' ? 'grid-cols-3 w-[680px]' : 'grid-cols-4 w-[860px]'}`}>
                        {dropdownItems[link.dropdownKey]?.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="group/card flex flex-col rounded-xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-200/40 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                              <img
                                src={item.image}
                                alt={item.label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="p-3 flex flex-col gap-1">
                              <span className="text-sm font-semibold text-zinc-900 group-hover/card:text-brand-blue transition-colors">{item.label}</span>
                              <span className="text-xs text-zinc-500 leading-relaxed">{item.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#pricing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium items-center gap-2 hover:bg-zinc-800 transition-colors hover:scale-[1.03] active:scale-[0.97]"
            >
              Get Started <ArrowRight size={16} weight="duotone" />
            </motion.a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} weight="duotone" /> : <List size={24} weight="duotone" />}
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
                    {link.hasDropdown && link.dropdownKey ? (
                      <>
                        <button
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.dropdownKey ? null : link.dropdownKey!)}
                          className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                        >
                          {link.label}
                          <CaretDown size={16} weight="duotone" className={`text-zinc-400 transition-transform ${mobileDropdownOpen === link.dropdownKey ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileDropdownOpen === link.dropdownKey && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 overflow-hidden"
                            >
                              {dropdownItems[link.dropdownKey]?.map((item) => (
                                <a key={item.label} href={item.href} className="block px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                                  {item.label}
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
                  <a href="#pricing" className="w-full bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
                    Get Started <ArrowRight size={16} weight="duotone" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* === 2. Hero === */}
      <section className="relative z-10 min-h-[90vh] flex items-center overflow-hidden">
        {/* Tweakable Background */}
        <div className="absolute inset-0 z-0">
          <HeroBackground />
        </div>

        <div className="max-w-7xl mx-auto px-8 pt-32 pb-20 relative z-10 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <motion.h1
              variants={fadeUp}
              className="text-[2.75rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-display font-medium tracking-tighter leading-[0.9] mb-10"
            >
              We build the software<br/>
              that{' '}
              <span className="inline-block bg-brand-blue/10 text-brand-blue px-3 md:px-5 py-0.5 md:py-1 rounded-xl md:rounded-2xl border border-brand-blue/20">
                runs
              </span>
              {' '}your business.
            </motion.h1>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <p className="text-xl md:text-2xl text-zinc-500 max-w-lg font-light leading-relaxed">
                Custom platforms for mid-market companies ready to replace legacy systems and scale without the bloat.
              </p>
              <motion.a
                href="#who-we-serve"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-zinc-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2.5 hover:bg-zinc-800 transition-colors text-lg shadow-lg shadow-zinc-900/10 shrink-0"
              >
                Book a Discovery Call <ArrowRight size={20} weight="duotone" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
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


      {/* === 4. Who We Serve — Accordion === */}
      <section id="who-we-serve" className="max-w-7xl mx-auto px-8 py-28 relative z-10">
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
                Who We Serve
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6 leading-[0.95]">
                We've seen this<br/>problem before.
              </h2>
              <p className="text-lg text-zinc-500 font-light leading-relaxed">
                Different industries, same pattern — smart teams held back by software that can't keep up.
              </p>
            </motion.div>
          </div>

          {/* Accordion cards */}
          <div className="lg:w-2/3 flex flex-col gap-3 w-full">
            {challenges.map((card) => (
              <div
                key={card.id}
                className={`bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-300 ${
                  activeCard === card.id
                    ? `${card.accentBorder} shadow-lg`
                    : 'border-zinc-200/60 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <div
                  onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                  className="p-6 md:p-8 flex items-center justify-between gap-4 md:gap-6 cursor-pointer"
                >
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
                      <h3 className="text-lg md:text-2xl font-medium tracking-tight leading-tight">
                        {card.prob}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeCard === card.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      activeCard === card.id ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    <ArrowRight size={20} weight="duotone" />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {activeCard === card.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }, opacity: { duration: 0.25, delay: 0.1 } }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <div className="pt-6 border-t border-zinc-200/60">
                          <p className="text-lg text-zinc-600 font-light leading-relaxed mb-6 max-w-xl">
                            {card.desc}
                          </p>
                          <a
                            href="#"
                            onClick={(e) => e.stopPropagation()}
                            className={`${card.accentText} font-medium inline-flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-70 transition-opacity`}
                          >
                            {card.cta} <ArrowUpRight size={16} weight="duotone" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* === 5. Featured Case Study === */}
      <section id="case-study" className="bg-zinc-950 text-white py-24 md:py-32 relative z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-blue/15 rounded-full blur-[150px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-xs font-mono text-brand-light mb-8 tracking-widest uppercase">
            Case Study — CaseHub
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-8 leading-[0.95] tracking-tighter">
                A state court system that hadn't updated since 2003.
              </h2>

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
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-zinc-900 px-8 py-4 rounded-full font-medium hover:bg-zinc-100 transition-colors inline-flex items-center gap-2"
              >
                Read the Full Story <ArrowUpRight size={20} weight="duotone" />
              </motion.a>
            </motion.div>

            {/* Stats Grid instead of SVG */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "2M+", label: "Residents Served", color: "bg-brand-blue/20 border-brand-blue/30" },
                { value: "2,000+", label: "Court Staff Onboarded", color: "bg-brand-light/20 border-brand-light/30" },
                { value: "6 mo", label: "Full Deployment", color: "bg-brand-dark/20 border-brand-dark/30" },
                { value: "99.9%", label: "Uptime SLA", color: "bg-emerald-500/20 border-emerald-500/30" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={`${stat.color} border rounded-2xl p-6 backdrop-blur-sm`}
                >
                  <div className="text-3xl font-display font-medium mb-1">{stat.value}</div>
                  <div className="text-xs font-mono text-zinc-400 tracking-wider uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 6. Capabilities — Marquee === */}
      <section id="capabilities" className="py-28 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4">
              Capabilities
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[0.95] max-w-lg">
                Design, engineering, and everything in between.
              </h2>
              <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-md">
                We're a full-service digital product agency. From research to production — we own the entire stack.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scrolling marquee of capability cards */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

          {/* Row 1 — scrolls left */}
          <div className="mb-4 overflow-hidden">
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {[...capabilities, ...capabilities].map((cap, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/60 p-6 min-w-[300px] max-w-[300px] shrink-0 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-brand-blue/10 flex items-center justify-center mb-4 transition-colors">
                    <span className="text-zinc-400 group-hover:text-brand-blue transition-colors">
                      {cap.icon}
                    </span>
                  </div>
                  <h3 className="text-base font-medium tracking-tight mb-1.5 whitespace-normal">{cap.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed whitespace-normal">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right (reverse) */}
          <div className="overflow-hidden">
            <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap">
              {[...capabilities.slice().reverse(), ...capabilities.slice().reverse()].map((cap, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/60 p-6 min-w-[300px] max-w-[300px] shrink-0 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-brand-blue/10 flex items-center justify-center mb-4 transition-colors">
                    <span className="text-zinc-400 group-hover:text-brand-blue transition-colors">
                      {cap.icon}
                    </span>
                  </div>
                  <h3 className="text-base font-medium tracking-tight mb-1.5 whitespace-normal">{cap.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed whitespace-normal">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* === 7. Process — Scroll-Triggered === */}
      <section id="process" className="bg-zinc-950 text-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-4">
              How We Work
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[0.95] max-w-lg">
              A clear path from problem to platform.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Left: Step list (sticky) */}
            <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
              <div className="flex flex-col gap-2">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-500 ${
                      activeStep === i
                        ? 'bg-white/10 border border-white/10'
                        : 'border border-transparent hover:bg-white/5'
                    }`}
                    onClick={() => setActiveStep(i)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${
                      activeStep === i ? 'bg-brand-blue text-white' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-zinc-600 tracking-widest">{step.num}</span>
                        <h3 className={`text-lg font-medium tracking-tight transition-colors duration-500 ${
                          activeStep === i ? 'text-white' : 'text-zinc-500'
                        }`}>{step.title}</h3>
                      </div>
                    </div>
                    <span className={`text-xs font-mono tracking-wider transition-colors duration-500 ${
                      activeStep === i ? 'text-brand-light' : 'text-zinc-700'
                    }`}>{step.duration}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-blue rounded-full"
                  animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>

            {/* Right: Step detail (animated) */}
            <div className="md:col-span-7 flex items-center min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
                >
                  <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-8 md:p-12">
                    <div className="w-14 h-14 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-light mb-6">
                      {processSteps[activeStep].icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4">
                      {processSteps[activeStep].title}
                    </h3>
                    <p className="text-lg text-zinc-400 leading-relaxed mb-6 max-w-lg">
                      {processSteps[activeStep].desc}
                    </p>
                    <div className="text-sm font-mono text-brand-light/80 tracking-wider uppercase">
                      Typical Duration: {processSteps[activeStep].duration}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>


      {/* === 8. Pricing === */}
      <section id="pricing" className="bg-[#fafafa] relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4">
              The Investment
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6 leading-[0.95]">
              Two phases. No surprises.
            </h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
              We work with established mid-market companies facing concrete operational challenges. Every engagement starts with a paid discovery phase — so there are no unknowns when we break ground.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-10 rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/50 flex flex-col"
            >
              <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">
                Phase 01 — Discovery
              </div>
              <div className="text-5xl md:text-6xl font-display font-medium tracking-tighter text-zinc-900 mb-3">
                $20K<span className="text-2xl text-zinc-400 ml-1">– $25K</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-1">
                4–6 weeks. We map your operations, interview stakeholders, and deliver a technical blueprint with ROI guarantees — before a single line of production code is written.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
              >
                Start with Discovery <ArrowRight size={16} weight="duotone" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-zinc-900 text-white p-8 md:p-10 rounded-2xl border border-zinc-800 shadow-lg shadow-zinc-900/20 flex flex-col"
            >
              <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-3">
                Phase 02 — Build & Deploy
              </div>
              <div className="text-5xl md:text-6xl font-display font-medium tracking-tighter mb-3">
                $100K<span className="text-2xl text-zinc-500 ml-1">– $500K</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                3–12 months. Full-scale design, engineering, deployment, and training — with milestones tied to measurable business outcomes.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-zinc-900 px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors"
              >
                Book a Discovery Call <ArrowRight size={16} weight="duotone" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 9. Testimonials — Marquee === */}
      <section className="py-28 relative z-10 overflow-hidden border-t border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4">
              Client Results
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[0.95]">
              What our partners say.
            </h2>
          </motion.div>
        </div>

        {/* Testimonial marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee-slow whitespace-nowrap">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/60 p-8 min-w-[380px] max-w-[380px] shrink-0 flex flex-col"
                >
                  <Quotes size={32} weight="duotone" className="text-zinc-200 mb-4 shrink-0" />
                  <p className="text-zinc-700 leading-relaxed mb-6 flex-1 whitespace-normal text-[15px]">
                    "{t.quote}"
                  </p>
                  <div className="shrink-0">
                    <div className="font-medium text-sm text-zinc-900">{t.name}</div>
                    <div className="text-xs text-zinc-400 font-mono tracking-wider uppercase mt-0.5">{t.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* === 10. Final CTA === */}
      <section className="py-24 md:py-32 text-center px-8 relative z-10">
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
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-zinc-900 text-white px-10 py-5 rounded-full font-medium inline-flex items-center gap-3 hover:bg-zinc-800 transition-all text-xl mx-auto mb-8 shadow-xl shadow-zinc-900/20"
          >
            Schedule Your Discovery Session <ArrowRight size={24} weight="duotone" />
          </motion.a>
          <p className="text-zinc-400 text-sm">
            Discovery engagements start at $20K. No commitment beyond that.
          </p>
        </motion.div>
      </section>


      {/* === Footer === */}
      <footer className="bg-zinc-950 text-zinc-400 relative z-10">
        <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="inline-block mb-4">
                <img src="/azul-arc-logo.png" alt="Azul Arc" className="h-10 w-auto brightness-0 invert" />
              </a>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[200px] mb-4">
                We build the software that runs your business.
              </p>
              <a href="mailto:hello@azularc.com" className="text-sm text-zinc-500 hover:text-white transition-colors">
                hello@azularc.com
              </a>
            </div>

            <div>
              <div className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
                What We Do
              </div>
              <ul className="space-y-2.5">
                {['Digital Product Strategy', 'Web Design & Development', '3D Visualisation', 'Case Management Systems'].map((link) => (
                  <li key={link}>
                    <a href="#what-we-do" className="text-sm text-zinc-500 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
                Company
              </div>
              <ul className="space-y-2.5">
                {[
                  { label: 'About', href: '#about' },
                  { label: 'How We Work', href: '#process' },
                  { label: 'Work', href: '#work' },
                  { label: 'Insights & Resources', href: '#insights' },
                  { label: 'Careers', href: '#careers' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-4">
                Connect
              </div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <LinkedinLogo size={16} weight="duotone" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <XLogo size={16} weight="duotone" /> Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <EnvelopeSimple size={16} weight="duotone" /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} Azul Arc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy / Legal</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
