import { ArrowRight, ArrowUpRight, Terminal, GridFour, ChartBar, List, X, CaretDown, LinkedinLogo, XLogo, EnvelopeSimple, Monitor, Database, FlowArrow, Stack, HardDrives, Code, MagnifyingGlass, FileCode, Rocket, Headset, Quotes } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
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
  const [pricingTab, setPricingTab] = useState<'web' | 'software'>('web');
  const [activeTestimonial, setActiveTestimonial] = useState(0);


  return (
    <div className="bg-[#fafafa] text-zinc-900 font-sans min-h-screen relative overflow-hidden selection:bg-brand-blue selection:text-white">

      {/* === Global Background Layers === */}

      {/* Noise Texture — lightweight CSS grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] mix-blend-multiply opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
      />

      {/* Blueprint Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Ambient Gradient Blobs — CSS-only, GPU composited */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-blue/10 rounded-full blur-[120px] animate-[blob-drift-1_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand-dark/8 rounded-full blur-[150px] animate-[blob-drift-2_25s_ease-in-out_3s_infinite]" />
      </div>


      {/* === 1. Navigation === */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 right-4 z-40 flex justify-center"
      >
        <div className="w-full max-w-7xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-lg shadow-zinc-950/[0.03] rounded-2xl">
          <div className="px-5 lg:px-6 py-2.5 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="shrink-0">
              <img src="/azul-arc-logo.png" alt="Azul Arc" className="h-8 w-auto" />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <a
                    href={link.href}
                    className="px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100/80 transition-all duration-200 flex items-center gap-1"
                  >
                    {link.label}
                    {link.hasDropdown && <CaretDown size={12} weight="bold" className="text-zinc-400 group-hover:text-zinc-600 transition-colors" />}
                  </a>

                  {link.hasDropdown && link.dropdownKey && (
                    <div className="fixed top-[64px] left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white/90 backdrop-blur-3xl backdrop-saturate-150 rounded-2xl border border-zinc-200/60 shadow-xl shadow-zinc-300/30 p-3">
                        <div className={`grid gap-2.5 ${link.dropdownKey === 'industries' ? 'grid-cols-3 w-[640px] max-w-[calc(100vw-2rem)]' : 'grid-cols-4 w-[820px] max-w-[calc(100vw-2rem)]'}`}>
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
            </nav>

            {/* Desktop CTA + Mobile Hamburger */}
            <div className="flex items-center gap-2.5">
              <a
                href="#pricing"
                className="hidden lg:flex bg-zinc-900 text-white px-4 py-2 rounded-xl text-[13px] font-medium items-center gap-1.5 hover:bg-zinc-800 transition-all duration-200 hover:shadow-lg hover:shadow-zinc-900/20 active:scale-[0.97]"
              >
                Get Started <ArrowRight size={14} weight="bold" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 rounded-xl transition-all duration-200"
              >
                {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
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
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden border-t border-zinc-200/40 overflow-hidden"
              >
                <div className="px-4 py-3 flex flex-col gap-0.5">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      {link.hasDropdown && link.dropdownKey ? (
                        <>
                          <button
                            onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.dropdownKey ? null : link.dropdownKey!)}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-[15px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/60 rounded-xl transition-all duration-200"
                          >
                            {link.label}
                            <CaretDown size={14} weight="bold" className={`text-zinc-400 transition-transform duration-200 ${mobileDropdownOpen === link.dropdownKey ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {mobileDropdownOpen === link.dropdownKey && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-3 overflow-hidden"
                              >
                                {dropdownItems[link.dropdownKey]?.map((item) => (
                                  <a key={item.label} href={item.href} className="block px-3 py-2 text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/60 rounded-lg transition-all duration-200">
                                    {item.label}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a href={link.href} className="block px-3 py-2.5 text-[15px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/60 rounded-xl transition-all duration-200">
                          {link.label}
                        </a>
                      )}
                    </div>
                  ))}
                  <div className="pt-2 mt-1.5 border-t border-zinc-200/40">
                    <a href="#pricing" className="w-full bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all duration-200">
                      Get Started <ArrowRight size={14} weight="bold" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>


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
                className="btn-wipe btn-wipe-dark bg-zinc-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2.5 transition-colors text-lg shadow-lg shadow-zinc-900/10 shrink-0"
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
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-blue/15 rounded-full blur-[150px] pointer-events-none animate-[blob-pulse_10s_ease-in-out_infinite]" />

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
                className="btn-wipe btn-wipe-light bg-white text-zinc-900 px-8 py-4 rounded-full font-medium transition-colors inline-flex items-center gap-2"
              >
                Read the Full Story <ArrowUpRight size={20} weight="duotone" />
              </motion.a>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-8 bg-brand-blue/10 rounded-3xl blur-[60px] pointer-events-none" />

              <div
                className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                style={{ transform: 'perspective(1200px) rotateY(-4deg)' }}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/60">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm font-medium text-white tracking-tight">CaseHub</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-full">v3.2.1</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {['Dashboard', 'Cases', 'Analytics'].map((tab, i) => (
                      <span
                        key={tab}
                        className={`text-[11px] px-3 py-1 rounded-md transition-colors ${i === 0 ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-4 border-b border-zinc-800/80">
                  {[
                    { value: '2M+', label: 'Residents', color: 'text-brand-light' },
                    { value: '2,000+', label: 'Staff', color: 'text-brand-blue' },
                    { value: '6 mo', label: 'Deployed', color: 'text-brand-orange' },
                    { value: '99.9%', label: 'Uptime', color: 'text-emerald-400' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                      className={`px-4 py-3 ${i < 3 ? 'border-r border-zinc-800/80' : ''}`}
                    >
                      <div className={`text-lg font-display font-medium ${stat.color}`}>{stat.value}</div>
                      <div className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Main content area */}
                <div className="grid grid-cols-5">
                  {/* Cases list — left 3 cols */}
                  <div className="col-span-3 border-r border-zinc-800/80 p-4">
                    <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mb-3">Active Cases</div>
                    <div className="space-y-2">
                      {[
                        { id: 'CV-2024-08412', status: 'In Review', statusColor: 'bg-amber-400', county: 'Franklin Co.', time: '2m ago' },
                        { id: 'CR-2024-03199', status: 'Scheduled', statusColor: 'bg-brand-light', county: 'Hamilton Co.', time: '8m ago' },
                        { id: 'CV-2024-11024', status: 'Active', statusColor: 'bg-emerald-400', county: 'Cuyahoga Co.', time: '14m ago' },
                        { id: 'DR-2024-00718', status: 'Pending', statusColor: 'bg-zinc-500', county: 'Summit Co.', time: '21m ago' },
                        { id: 'CR-2024-05531', status: 'Active', statusColor: 'bg-emerald-400', county: 'Montgomery Co.', time: '34m ago' },
                      ].map((c, i) => (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${c.statusColor}`} />
                            <span className="text-xs font-mono text-zinc-300">{c.id}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-zinc-600 hidden sm:inline">{c.county}</span>
                            <span className="text-[10px] text-zinc-600">{c.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Chart — right 2 cols */}
                  <div className="col-span-2 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Case Volume</div>
                      <div className="text-[10px] font-mono text-emerald-400">+24%</div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <svg viewBox="0 0 200 80" className="w-full h-auto" fill="none">
                        {/* Grid lines */}
                        {[0, 20, 40, 60].map(y => (
                          <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#27272a" strokeWidth="0.5" />
                        ))}
                        {/* Area fill */}
                        <path
                          d="M0 65 L28 55 L56 58 L84 42 L112 38 L140 28 L168 22 L200 12 L200 80 L0 80Z"
                          fill="url(#casehub-gradient)"
                          opacity="0.3"
                        />
                        {/* Line */}
                        <path
                          d="M0 65 L28 55 L56 58 L84 42 L112 38 L140 28 L168 22 L200 12"
                          stroke="#2aa7df"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dot on latest */}
                        <circle cx="200" cy="12" r="3" fill="#2aa7df" />
                        <circle cx="200" cy="12" r="6" fill="#2aa7df" opacity="0.2" />
                        <defs>
                          <linearGradient id="casehub-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2aa7df" />
                            <stop offset="100%" stopColor="#2aa7df" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                    {/* Mini labels */}
                    <div className="flex justify-between mt-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => (
                        <span key={m} className="text-[8px] font-mono text-zinc-600">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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


      {/* === 8. Testimonials === */}
      <section className="py-28 relative z-10 overflow-hidden border-t border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4">
              Client Results
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[0.95]">
              What our partners say.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Featured quote — left 3 cols */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Quotes size={48} weight="duotone" className="text-brand-blue/20 mb-6" />
                  <p className="text-2xl md:text-3xl lg:text-[2rem] font-display font-medium text-zinc-800 leading-snug tracking-tight mb-8">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div>
                    <div className="font-medium text-zinc-900">{testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-zinc-400 font-mono tracking-wider uppercase mt-1">{testimonials[activeTestimonial].company}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector list — right 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`text-left px-5 py-4 rounded-xl transition-all duration-300 border ${
                    i === activeTestimonial
                      ? 'bg-white border-zinc-200 shadow-lg shadow-zinc-200/50'
                      : 'bg-transparent border-transparent hover:bg-white/60 hover:border-zinc-200/40'
                  }`}
                >
                  <div className={`text-sm font-medium transition-colors duration-300 ${i === activeTestimonial ? 'text-zinc-900' : 'text-zinc-500'}`}>
                    {t.name}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 tracking-wider uppercase mt-0.5">
                    {t.company}
                  </div>
                  {/* Progress bar for active */}
                  {i === activeTestimonial && (
                    <motion.div
                      className="h-0.5 bg-brand-blue rounded-full mt-3"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear' }}
                      onAnimationComplete={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* === 9. Pricing — Tabbed === */}
      <section id="pricing" className="bg-[#fafafa] relative z-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-4">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6 leading-[0.95]">
              Transparent pricing. No surprises.
            </h2>
            <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
              Whether you need a modern web presence or a full-scale custom platform, every engagement is scoped clearly upfront.
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-zinc-100 rounded-xl p-1 border border-zinc-200/60 relative">
              {[
                { key: 'web' as const, label: 'Web Design' },
                { key: 'software' as const, label: 'Custom Software' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPricingTab(tab.key)}
                  className="relative px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 z-10"
                  style={{ color: pricingTab === tab.key ? '#18181b' : '#71717a' }}
                >
                  {pricingTab === tab.key && (
                    <motion.div
                      layoutId="pricing-tab-pill"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm shadow-zinc-200/60"
                      transition={{ type: 'spring', stiffness: 120, damping: 28, mass: 1.2 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
          {/* Web Design Cards */}
          {pricingTab === 'web' && (
            <motion.div
              key="web"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
                exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
              }}
              className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
              <div
                className="pricing-card bg-white p-8 md:p-10 rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/50 flex flex-col"
                style={{ '--glow-color': 'var(--color-brand-blue)' } as React.CSSProperties}
                onMouseMove={(e) => { const el = e.currentTarget; if ((el as any)._raf) return; (el as any)._raf = requestAnimationFrame(() => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; el.style.transition = 'transform 0.15s ease-out'; el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translate3d(0,-6px,0)`; (el as any)._raf = null; }); }}
                onMouseLeave={(e) => { const el = e.currentTarget; if ((el as any)._raf) { cancelAnimationFrame((el as any)._raf); (el as any)._raf = null; } el.style.transition = ''; el.style.transform = ''; }}
              >
                <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">
                  Marketing Site
                </div>
                <div className="text-5xl md:text-6xl font-display font-medium tracking-tighter text-zinc-900 mb-3">
                  $15K<span className="text-2xl text-zinc-400 ml-1">– $25K</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-1">
                  4–8 weeks. Full site redesign, responsive development, CMS integration, and SEO foundations — a modern web presence that converts.
                </p>
                <ul className="text-sm text-zinc-500 space-y-2 mb-8">
                  {['Custom design & responsive build', 'CMS integration (Storyblok, WordPress)', 'SEO & performance optimization', 'Up to 10 unique pages'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-brand-blue mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-wipe btn-wipe-dark bg-zinc-900 text-white px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Get a Quote <ArrowRight size={16} weight="duotone" />
                </motion.a>
              </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
              <div
                className="pricing-card bg-zinc-900 text-white p-8 md:p-10 rounded-2xl border border-zinc-800 shadow-lg shadow-zinc-900/20 flex flex-col"
                style={{ '--glow-color': 'var(--color-brand-light)' } as React.CSSProperties}
                onMouseMove={(e) => { const el = e.currentTarget; if ((el as any)._raf) return; (el as any)._raf = requestAnimationFrame(() => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; el.style.transition = 'transform 0.15s ease-out'; el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translate3d(0,-6px,0)`; (el as any)._raf = null; }); }}
                onMouseLeave={(e) => { const el = e.currentTarget; if ((el as any)._raf) { cancelAnimationFrame((el as any)._raf); (el as any)._raf = null; } el.style.transition = ''; el.style.transform = ''; }}
              >
                <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-3">
                  Custom Web Platform
                </div>
                <div className="text-5xl md:text-6xl font-display font-medium tracking-tighter mb-3">
                  $25K<span className="text-2xl text-zinc-500 ml-1">– $50K+</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                  6–12 weeks. Complex marketing sites with custom interactions, advanced functionality, third-party integrations, and tailored content architecture.
                </p>
                <ul className="text-sm text-zinc-400 space-y-2 mb-8">
                  {['Everything in Marketing Site', 'Custom animations & interactions', 'Advanced integrations & APIs', 'Content strategy & migration'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-brand-light mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-wipe btn-wipe-light bg-white text-zinc-900 px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Book a Discovery Call <ArrowRight size={16} weight="duotone" />
                </motion.a>
              </div>
              </motion.div>
            </motion.div>
          )}

          {/* Custom Software Cards */}
          {pricingTab === 'software' && (
            <motion.div
              key="software"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
                exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
              }}
              className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
              <div
                className="pricing-card bg-white p-8 md:p-10 rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/50 flex flex-col"
                style={{ '--glow-color': 'var(--color-brand-blue)' } as React.CSSProperties}
                onMouseMove={(e) => { const el = e.currentTarget; if ((el as any)._raf) return; (el as any)._raf = requestAnimationFrame(() => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; el.style.transition = 'transform 0.15s ease-out'; el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translate3d(0,-6px,0)`; (el as any)._raf = null; }); }}
                onMouseLeave={(e) => { const el = e.currentTarget; if ((el as any)._raf) { cancelAnimationFrame((el as any)._raf); (el as any)._raf = null; } el.style.transition = ''; el.style.transform = ''; }}
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
                <ul className="text-sm text-zinc-500 space-y-2 mb-8">
                  {['Stakeholder interviews & audits', 'Technical architecture blueprint', 'ROI projections & risk analysis', 'Go/no-go recommendation'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-brand-blue mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-wipe btn-wipe-dark bg-zinc-900 text-white px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Start with Discovery <ArrowRight size={16} weight="duotone" />
                </motion.a>
              </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
              <div
                className="pricing-card bg-zinc-900 text-white p-8 md:p-10 rounded-2xl border border-zinc-800 shadow-lg shadow-zinc-900/20 flex flex-col"
                style={{ '--glow-color': 'var(--color-brand-light)' } as React.CSSProperties}
                onMouseMove={(e) => { const el = e.currentTarget; if ((el as any)._raf) return; (el as any)._raf = requestAnimationFrame(() => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; el.style.transition = 'transform 0.15s ease-out'; el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translate3d(0,-6px,0)`; (el as any)._raf = null; }); }}
                onMouseLeave={(e) => { const el = e.currentTarget; if ((el as any)._raf) { cancelAnimationFrame((el as any)._raf); (el as any)._raf = null; } el.style.transition = ''; el.style.transform = ''; }}
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
                <ul className="text-sm text-zinc-400 space-y-2 mb-8">
                  {['End-to-end design & engineering', 'Milestone-based delivery', 'Staff training & documentation', 'Post-launch support & iteration'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-brand-light mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-wipe btn-wipe-light bg-white text-zinc-900 px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Book a Discovery Call <ArrowRight size={16} weight="duotone" />
                </motion.a>
              </div>
              </motion.div>
            </motion.div>
          )}
          </AnimatePresence>
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
            className="btn-wipe btn-wipe-dark bg-zinc-900 text-white px-10 py-5 rounded-full font-medium inline-flex items-center gap-3 transition-all text-xl mx-auto mb-8 shadow-xl shadow-zinc-900/20"
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
