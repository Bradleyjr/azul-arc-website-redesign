import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  ComputerTerminal01Icon,
  GridViewIcon,
  ChartBarLineIcon,
  Hamburger01Icon,
  Cancel01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
  Mail01Icon,
  ComputerIcon,
  DatabaseIcon,
  FlowIcon,
  Layers01Icon,
  ServerStack01Icon,
  CodeIcon,
  Search01Icon,
  SourceCodeIcon,
  RocketIcon,
  HeadsetIcon,
  QuoteDownIcon,
} from '@hugeicons/core-free-icons';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Nav Data ---
const navLinks = [
  { label: 'Who We Serve', href: '#who-we-serve' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How We Work', href: '#process' },
  { label: 'Case Studies', href: '#case-study' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#' },
];

// --- Challenge Data ---
const challenges = [
  {
    id: 0,
    label: "01 / Government & Courts",
    prob: "Legacy systems slowing down your agency?",
    cta: "See How We Modernize Public Systems",
    desc: "State agencies run on software built decades ago. We replace fragile legacy systems with secure, modern platforms — without disrupting daily operations. Our CaseHub project cut case processing time by 40% for a state court system serving 2M+ residents.",
    icon: ComputerTerminal01Icon,
  },
  {
    id: 1,
    label: "02 / Manufacturing & Distribution",
    prob: "Your sales team can't see the full picture?",
    cta: "See How We Build Visibility",
    desc: "When product catalogs live in spreadsheets and pricing changes take weeks, revenue leaks. We build digital product platforms that give your sales team real-time inventory, dynamic pricing, and customer analytics — so they close faster.",
    icon: GridViewIcon,
  },
  {
    id: 2,
    label: "03 / Growth-Stage Companies",
    prob: "Manual processes killing your margins?",
    cta: "See How We Automate Operations",
    desc: "You've grown past what spreadsheets and workarounds can handle, but you're not ready for a 50-person IT department. We automate the operational bottlenecks — approvals, reporting, data entry — that are eating your margins and capping your growth.",
    icon: ChartBarLineIcon,
  }
];

// --- Capabilities Data ---
const capabilities = [
  {
    icon: ComputerIcon,
    title: "Custom Platforms",
    desc: "Purpose-built applications designed around how your team actually works — not how a vendor thinks you should.",
  },
  {
    icon: DatabaseIcon,
    title: "Data & Analytics",
    desc: "Dashboards and reporting that surface real-time insights, not last month's spreadsheet.",
  },
  {
    icon: Layers01Icon,
    title: "System Integrations",
    desc: "Connect your ERP, CRM, and operational tools into a single source of truth.",
  },
  {
    icon: FlowIcon,
    title: "Workflow Automation",
    desc: "Eliminate manual approvals, data entry, and reporting that slow your team down.",
  },
  {
    icon: ServerStack01Icon,
    title: "Legacy Modernization",
    desc: "Migrate off decades-old systems without disrupting daily operations or losing data.",
  },
  {
    icon: CodeIcon,
    title: "API & Cloud Infrastructure",
    desc: "Scalable backends, secure APIs, and cloud architecture built for reliability.",
  },
  {
    icon: ComputerIcon,
    title: "UX & Product Design",
    desc: "Research-driven interfaces that your team will actually want to use every day.",
  },
  {
    icon: DatabaseIcon,
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
    icon: Search01Icon,
    duration: "2–3 weeks",
  },
  {
    num: "02",
    title: "Blueprint",
    desc: "A detailed technical plan with architecture decisions, timeline, and guaranteed ROI projections.",
    icon: SourceCodeIcon,
    duration: "2–3 weeks",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Agile sprints with milestone demos. You see working software every two weeks — not slide decks.",
    icon: CodeIcon,
    duration: "3–9 months",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Phased rollouts, data migration, and hands-on training so adoption happens on day one.",
    icon: RocketIcon,
    duration: "2–4 weeks",
  },
  {
    num: "05",
    title: "Evolve",
    desc: "Ongoing maintenance, performance monitoring, and iterative improvements as your needs grow.",
    icon: HeadsetIcon,
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

// --- Section Badge Component ---
function SectionBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-brand-primary">&#10022;</span>
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-primary">{label}</span>
    </div>
  );
}

// --- Main Component ---
export default function DesignFinal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white text-brand-dark font-sans min-h-screen relative overflow-hidden selection:bg-brand-primary selection:text-white">

      {/* === 1. Navigation === */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-brand-gray">
        <div className="px-6 lg:px-8 py-3 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <img src="/azul-arc-logo.png" alt="Azul Arc" className="h-10 w-auto" />
          </motion.a>

          {/* Desktop Nav */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex items-center gap-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#pricing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-medium items-center gap-2 hover:bg-brand-navy transition-colors"
            >
              Get Started <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </motion.a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-muted hover:text-brand-dark transition-colors"
            >
              {mobileMenuOpen
                ? <HugeiconsIcon icon={Cancel01Icon} size={24} />
                : <HugeiconsIcon icon={Hamburger01Icon} size={24} />
              }
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
              className="lg:hidden border-t border-brand-gray bg-white/90 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-3 text-base font-medium text-brand-muted hover:text-brand-dark transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 mt-2 border-t border-brand-gray">
                  <a href="#pricing" className="w-full bg-brand-primary text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-navy transition-colors">
                    Get Started <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* === 2. Hero === */}
      <section className="min-h-[85vh] flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <SectionBadge label="WEB PARTNER OF CHOICE" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-navy leading-tight mb-6"
              >
                We build the software that{' '}
                <span className="font-serif italic text-brand-primary">runs</span>{' '}
                your business.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-brand-muted max-w-lg leading-relaxed mb-8"
              >
                Custom platforms for mid-market companies ready to replace legacy systems and scale without the bloat.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#who-we-serve"
                  className="bg-brand-primary text-white rounded-full px-6 py-3 font-medium hover:bg-brand-navy transition-colors inline-flex items-center gap-2 justify-center"
                >
                  Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </a>
                <a
                  href="#capabilities"
                  className="border border-brand-primary text-brand-primary rounded-full px-6 py-3 font-medium hover:bg-brand-primary hover:text-white transition-colors inline-flex items-center gap-2 justify-center"
                >
                  See Our Work <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex gap-8">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-brand-navy">80%</div>
                  <div className="text-sm text-brand-muted mt-1">Faster Processing</div>
                </div>
                <div className="w-px bg-brand-gray" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-brand-navy">99%</div>
                  <div className="text-sm text-brand-muted mt-1">Client Satisfaction</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-brand-tint rounded-2xl aspect-[4/3] flex items-center justify-center"
            >
              <span className="text-brand-muted text-sm">Photography placeholder</span>
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 3. Positioning Statement === */}
      <section className="bg-[#F8FAFC] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4 justify-center">
              <span className="text-brand-primary">&#10022;</span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-primary">ABOUT US</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-3xl md:text-4xl font-medium text-brand-navy max-w-4xl mx-auto leading-relaxed"
            >
              We are passionate about empowering mid-market companies to take control of their operations and achieve their{' '}
              <span className="font-serif italic">growth</span>{' '}goals.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-6 justify-center mt-12">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-brand-tint rounded-xl h-48 w-48 flex items-center justify-center hidden md:flex"
                >
                  <span className="text-brand-muted text-xs">Photo {i}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* === 4. Who We Serve === */}
      <section id="who-we-serve" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionBadge label="WHO WE SERVE" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-navy leading-tight mb-6"
            >
              Industries we{' '}
              <span className="font-serif italic">serve</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-brand-muted max-w-2xl leading-relaxed">
              Different industries, same pattern — smart teams held back by software that can't keep up.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {challenges.map((card) => (
              <motion.div
                key={card.id}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-tint flex items-center justify-center mb-5 text-brand-primary">
                  <HugeiconsIcon icon={card.icon} size={24} />
                </div>
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted mb-2">
                  {card.label}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-brand-navy mb-3 leading-snug">
                  {card.prob}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
                <a
                  href="#"
                  className="text-brand-primary font-medium text-sm inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                  Learn more <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <a
              href="#"
              className="bg-brand-primary text-white rounded-full px-6 py-3 font-medium hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
            >
              See All Industries <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </a>
          </motion.div>
        </div>
      </section>


      {/* === 5. Capabilities === */}
      <section id="capabilities" className="py-24 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top split: left text, right 3 stacked cards */}
          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <SectionBadge label="CAPABILITIES" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-navy leading-tight mb-6"
              >
                Core features that set us apart from the{' '}
                <span className="font-serif italic">competition</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-brand-muted leading-relaxed">
                We're a full-service digital product agency. From research to production — we own the entire stack.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col"
            >
              {capabilities.slice(0, 3).map((cap, i) => (
                <motion.div
                  key={cap.title}
                  variants={fadeUp}
                  className={`py-6 ${i < 2 ? 'border-b border-brand-gray' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-tint flex items-center justify-center shrink-0 text-brand-primary">
                      <HugeiconsIcon icon={cap.icon} size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-brand-navy mb-1">{cap.title}</h3>
                      <p className="text-sm text-brand-muted leading-relaxed mb-2">{cap.desc}</p>
                      <a
                        href="#"
                        className="text-brand-primary font-medium text-sm inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                      >
                        Learn more <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom: remaining capabilities as smaller cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {capabilities.slice(3).map((cap) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-tint flex items-center justify-center mb-4 text-brand-primary">
                  <HugeiconsIcon icon={cap.icon} size={20} />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-brand-navy mb-1">{cap.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* === 6. How We Work (Process) === */}
      <section id="process" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionBadge label="OUR PROCESS" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-navy leading-tight"
            >
              How We{' '}
              <span className="font-serif italic">Work</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Left: Step tabs */}
            <div className="md:col-span-5">
              <div className="flex flex-col gap-2">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeStep === i
                        ? 'bg-brand-tint border-l-2 border-brand-primary'
                        : 'border-l-2 border-transparent hover:bg-brand-tint/50'
                    }`}
                    onClick={() => setActiveStep(i)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      activeStep === i ? 'bg-brand-primary text-white' : 'bg-brand-tint text-brand-muted'
                    }`}>
                      <HugeiconsIcon icon={step.icon} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-brand-muted tracking-widest">{step.num}</span>
                        <h3 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${
                          activeStep === i ? 'text-brand-navy' : 'text-brand-muted'
                        }`}>{step.title}</h3>
                      </div>
                    </div>
                    <span className={`text-xs font-medium tracking-wider transition-colors duration-300 ${
                      activeStep === i ? 'text-brand-primary' : 'text-brand-muted'
                    }`}>{step.duration}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 bg-brand-gray rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-primary rounded-full"
                  animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>

            {/* Right: Step detail */}
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
                  <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-brand-gray">
                    <div className="w-14 h-14 rounded-xl bg-brand-tint flex items-center justify-center text-brand-primary mb-6">
                      <HugeiconsIcon icon={processSteps[activeStep].icon} size={28} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-navy mb-4">
                      {processSteps[activeStep].title}
                    </h3>
                    <p className="text-lg text-brand-muted leading-relaxed mb-6 max-w-lg">
                      {processSteps[activeStep].desc}
                    </p>
                    <div className="text-sm font-semibold text-brand-primary tracking-wider uppercase">
                      Typical Duration: {processSteps[activeStep].duration}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>


      {/* === 7. Case Study === */}
      <section id="case-study" className="py-24 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-12"
          >
            <SectionBadge label="CASE STUDY" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Placeholder image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-brand-tint rounded-2xl aspect-[4/3] flex items-center justify-center"
            >
              <span className="text-brand-muted text-sm">Case study image placeholder</span>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-navy leading-tight mb-8"
              >
                A state court system that hadn't updated since 2003.
              </motion.h2>

              <motion.div variants={fadeUp} className="flex gap-8 mb-8">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-brand-primary">40%</div>
                  <div className="text-sm text-brand-muted mt-1">Faster Processing</div>
                </div>
                <div className="w-px bg-brand-gray" />
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-brand-primary">Zero</div>
                  <div className="text-sm text-brand-muted mt-1">Downtime in Transition</div>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-lg text-brand-muted mb-8 leading-relaxed">
                We rebuilt their case management platform from the ground up — replacing a brittle legacy system with a modern, secure application — while keeping 2,000+ court staff operational throughout.
              </motion.p>

              <motion.a
                variants={fadeUp}
                href="#"
                className="bg-brand-primary text-white rounded-full px-6 py-3 font-medium hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
              >
                Read the Full Story <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 8. Pricing === */}
      <section id="pricing" className="py-24 md:py-32 bg-gradient-to-br from-brand-navy to-brand-primary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4 justify-center">
              <span className="text-white/60">&#10022;</span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">THE INVESTMENT</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-6"
            >
              Simple, transparent{' '}
              <span className="font-serif italic">pricing</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              We work with established mid-market companies facing concrete operational challenges. Every engagement starts with a paid discovery phase — so there are no unknowns when we break ground.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg flex flex-col"
            >
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted mb-3">
                Phase 01 — Discovery
              </div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-brand-navy mb-3">
                $20K<span className="text-2xl text-brand-muted ml-1">– $25K</span>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed mb-6 flex-1">
                4–6 weeks. We map your operations, interview stakeholders, and deliver a technical blueprint with ROI guarantees — before a single line of production code is written.
              </p>
              <a
                href="#"
                className="bg-brand-primary text-white px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-brand-navy transition-colors"
              >
                Start with Discovery <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg flex flex-col"
            >
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted mb-3">
                Phase 02 — Build & Deploy
              </div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-brand-navy mb-3">
                $100K<span className="text-2xl text-brand-muted ml-1">– $500K</span>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed mb-6 flex-1">
                3–12 months. Full-scale design, engineering, deployment, and training — with milestones tied to measurable business outcomes.
              </p>
              <a
                href="#"
                className="bg-brand-primary text-white px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-brand-navy transition-colors"
              >
                Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 9. Testimonials === */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <SectionBadge label="TESTIMONIALS" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-navy leading-tight mb-6"
              >
                What our{' '}
                <span className="font-serif italic">clients</span>{' '}
                are saying
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-brand-muted leading-relaxed">
                We let our results speak for themselves. Here's what our partners have to say about working with Azul Arc.
              </motion.p>
            </motion.div>

            {/* Right: 2 testimonial cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              {testimonials.slice(0, 2).map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl shadow-sm p-8 border border-brand-gray"
                >
                  <div className="text-brand-primary mb-4">
                    <HugeiconsIcon icon={QuoteDownIcon} size={32} />
                  </div>
                  <p className="text-brand-dark leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                  <div>
                    <div className="font-semibold text-sm text-brand-navy">{t.name}</div>
                    <div className="text-xs text-brand-muted mt-0.5">{t.company}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 10. Final CTA === */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-brand-navy to-brand-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-6"
            >
              Achieve operational excellence with{' '}
              <span className="font-serif italic">Azul Arc</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Discovery engagements start at $20K. No commitment beyond that. Let's find out what's slowing you down.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#"
              className="bg-white text-brand-navy rounded-full px-8 py-4 font-medium hover:bg-brand-tint transition-colors inline-flex items-center gap-2 text-lg"
            >
              Schedule Your Discovery Session <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>


      {/* === 11. Footer === */}
      <footer className="bg-white border-t border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="inline-block mb-4">
                <img src="/azul-arc-logo.png" alt="Azul Arc" className="h-10 w-auto" />
              </a>
              <p className="text-sm text-brand-muted leading-relaxed max-w-[200px] mb-4">
                We build the software that runs your business.
              </p>
              <a href="mailto:hello@azularc.com" className="text-sm text-brand-muted hover:text-brand-dark transition-colors">
                hello@azularc.com
              </a>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted mb-4">
                Services
              </div>
              <ul className="space-y-2.5">
                {['Who We Serve', 'Capabilities', 'How We Work', 'Case Studies'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-brand-muted hover:text-brand-dark transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted mb-4">
                Company
              </div>
              <ul className="space-y-2.5">
                {['About', 'Insights', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-brand-muted hover:text-brand-dark transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted mb-4">
                Connect
              </div>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-sm text-brand-muted hover:text-brand-dark transition-colors flex items-center gap-2">
                    <HugeiconsIcon icon={Linkedin01Icon} size={16} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-brand-muted hover:text-brand-dark transition-colors flex items-center gap-2">
                    <HugeiconsIcon icon={NewTwitterIcon} size={16} /> Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-brand-muted hover:text-brand-dark transition-colors flex items-center gap-2">
                    <HugeiconsIcon icon={Mail01Icon} size={16} /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brand-gray pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-brand-muted">
              &copy; {new Date().getFullYear()} Azul Arc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-brand-muted hover:text-brand-dark transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-brand-muted hover:text-brand-dark transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
