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
  ArrowLeft01Icon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
} from 'motion/react';
import { useState, useRef, useEffect, type RefObject } from 'react';

// --- Nav Data ---
const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Industries', href: '#who-we-serve' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Case Study', href: '#case-study' },
];

// --- Challenge Data ---
const challenges = [
  {
    id: 0,
    label: "Government & Courts",
    prob: "Legacy systems slowing down your agency?",
    cta: "See How We Modernize Public Systems",
    desc: "State agencies run on software built decades ago. We replace fragile legacy systems with secure, modern platforms — without disrupting daily operations. Our CaseHub project cut case processing time by 40% for a state court system serving 2M+ residents.",
    icon: ComputerTerminal01Icon,
  },
  {
    id: 1,
    label: "Manufacturing & Distribution",
    prob: "Your sales team can't see the full picture?",
    cta: "See How We Build Visibility",
    desc: "When product catalogs live in spreadsheets and pricing changes take weeks, revenue leaks. We build digital product platforms that give your sales team real-time inventory, dynamic pricing, and customer analytics — so they close faster.",
    icon: GridViewIcon,
  },
  {
    id: 2,
    label: "Growth-Stage Companies",
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
    duration: "2-3 weeks",
  },
  {
    num: "02",
    title: "Blueprint",
    desc: "A detailed technical plan with architecture decisions, timeline, and guaranteed ROI projections.",
    icon: SourceCodeIcon,
    duration: "2-3 weeks",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Agile sprints with milestone demos. You see working software every two weeks — not slide decks.",
    icon: CodeIcon,
    duration: "3-9 months",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Phased rollouts, data migration, and hands-on training so adoption happens on day one.",
    icon: RocketIcon,
    duration: "2-4 weeks",
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
function SectionBadge({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className={light ? 'text-brand-sky' : 'text-brand-primary'}>&#10022;</span>
      <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? 'text-brand-sky' : 'text-brand-primary'}`}>
        {label}
      </span>
    </div>
  );
}

// --- Count Up Component ---
function CountUp({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref as RefObject<Element>, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, target, { duration: 2, ease: 'easeOut' });
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });
    return unsubscribe;
  }, [motionValue, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

// --- Calendar Widget ---
function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMarch = 31;
  const startDay = 0; // March 2026 starts on Sunday
  const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM'];

  const blanks = Array.from({ length: startDay }, (_, i) => i);
  const days = Array.from({ length: daysInMarch }, (_, i) => i + 1);

  // Weekend days (Saturday=6, Sunday=0)
  const isWeekend = (day: number) => {
    const dayOfWeek = (startDay + day - 1) % 7;
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-gray shadow-sm p-6">
      {/* Month header */}
      <div className="flex items-center justify-between mb-6">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-tint transition-colors">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
        </button>
        <span className="text-lg font-semibold text-brand-navy">March 2026</span>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-tint transition-colors">
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayHeaders.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-brand-muted py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((b) => (
          <div key={`blank-${b}`} />
        ))}
        {days.map((day) => {
          const weekend = isWeekend(day);
          const selected = selectedDate === day;
          const past = day < 2; // March 2 is today
          return (
            <button
              key={day}
              disabled={weekend || past}
              onClick={() => {
                setSelectedDate(day);
                setSelectedTime(null);
              }}
              className={`w-full aspect-square rounded-lg text-sm font-medium transition-all duration-200
                ${selected ? 'bg-brand-primary text-white shadow-md' : ''}
                ${!selected && !weekend && !past ? 'text-brand-dark hover:bg-brand-tint cursor-pointer' : ''}
                ${weekend || past ? 'text-brand-muted/40 cursor-not-allowed' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-brand-gray"
        >
          <div className="text-sm font-medium text-brand-navy mb-3">
            Available times for March {selectedDate}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedTime === time
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-tint text-brand-navy hover:bg-brand-primary/10'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Confirm button */}
      <button
        disabled={!selectedDate || !selectedTime}
        className={`w-full mt-6 py-3 rounded-full text-sm font-semibold transition-all duration-200
          ${selectedDate && selectedTime
            ? 'bg-brand-primary text-white hover:bg-brand-navy cursor-pointer'
            : 'bg-brand-gray text-brand-muted cursor-not-allowed'
          }
        `}
      >
        Confirm Booking
      </button>
    </div>
  );
}

// --- Main Component ---
export default function DesignFinal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef as RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Horizontal scroll for capabilities
  const capsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: capsProgress } = useScroll({
    target: capsContainerRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });
  const capsX = useTransform(capsProgress, [0, 1], ['0%', '-87.5%']);

  // Process timeline scroll
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef as RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });
  const lineScaleY = useTransform(processProgress, [0, 0.8], [0, 1]);

  // Testimonial auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-brand-dark font-sans min-h-screen relative overflow-hidden selection:bg-brand-primary selection:text-white">
      {/* Animated gradient keyframes */}
      <style>{`
        @keyframes gradientPulse {
          0%, 100% {
            background-position: 50% 50%;
            background-size: 200% 200%;
          }
          25% {
            background-position: 0% 50%;
            background-size: 250% 250%;
          }
          50% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
          75% {
            background-position: 50% 0%;
            background-size: 250% 250%;
          }
        }
        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      {/* === 1. Navigation === */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-gray">
        <div className="px-6 lg:px-8 py-3 flex justify-between items-center max-w-7xl mx-auto">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <img src="/azul-arc-logo.png" alt="Azul Arc" className="h-10 w-auto" />
          </motion.a>

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

          <div className="flex items-center gap-3">
            <motion.a
              href="#book"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-medium items-center gap-2 hover:bg-brand-navy transition-colors"
            >
              Book a Call <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
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
                  <a
                    href="#book"
                    className="w-full bg-brand-primary text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-navy transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book a Call <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* === 2. Hero — MASSIVE typography === */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #EBF4FF 0%, #ffffff 60%, #ffffff 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientPulse 12s ease-in-out infinite',
        }}
      >
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="max-w-6xl mx-auto px-6 pt-32 pb-32 text-center w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-extrabold text-brand-navy leading-[0.95] tracking-[-0.04em] mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            We build the software{' '}
            <br className="hidden sm:block" />
            that{' '}
            <span className="relative inline-block text-brand-primary">
              runs
              <span
                className="absolute left-0 bottom-[0.05em] w-full h-[0.08em] bg-brand-primary/30 rounded-full origin-left"
                style={{ animation: 'underlineGrow 1s ease-out 0.8s both' }}
              />
            </span>{' '}
            your business.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto mb-10"
          >
            Custom platforms for mid-market companies ready to replace legacy systems and scale without the bloat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="#book"
              className="bg-brand-primary text-white rounded-full px-8 py-4 font-semibold text-lg hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
            >
              Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Stats at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center gap-12"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-navy">80%</div>
            <div className="text-xs text-brand-muted mt-1 tracking-wide uppercase">Faster Processing</div>
          </div>
          <div className="w-px h-10 bg-brand-gray" />
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-navy">99%</div>
            <div className="text-xs text-brand-muted mt-1 tracking-wide uppercase">Client Satisfaction</div>
          </div>
        </motion.div>
      </section>


      {/* === 3. About — Photo cascade === */}
      <section id="about" className="bg-[#F8FAFC] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge label="ABOUT US" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-brand-navy max-w-4xl mx-auto leading-relaxed mb-16"
          >
            We are passionate about empowering mid-market companies to take control of their operations and achieve their growth goals.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { w: 'w-64', h: 'h-48', rotate: '-rotate-2' },
              { w: 'w-56', h: 'h-64', rotate: 'rotate-1' },
              { w: 'w-72', h: 'h-52', rotate: '-rotate-[1.5deg]' },
              { w: 'w-60', h: 'h-56', rotate: 'rotate-2' },
            ].map((frame, i) => (
              <motion.div
                key={i}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`${frame.w} ${frame.h} ${frame.rotate} bg-brand-tint rounded-2xl flex items-center justify-center shadow-sm hidden md:flex`}
              >
                <span className="text-brand-muted text-xs">Photo {i + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* === 4. Industries — Tab system === */}
      <section id="who-we-serve" className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionBadge label="WHO WE SERVE" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight">
              Different industries,{' '}
              <br className="hidden md:block" />
              same pattern.
            </h2>
            <p className="text-lg text-brand-muted mt-4 max-w-xl">
              Smart teams held back by software that can't keep up.
            </p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-10">
            {challenges.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                  ${activeTab === i
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-tint text-brand-navy hover:bg-brand-primary/10'
                  }
                `}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-[#F8FAFC] rounded-2xl p-8 md:p-12"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-tint flex items-center justify-center text-brand-primary shrink-0">
                  <HugeiconsIcon icon={challenges[activeTab].icon} size={24} />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-navy mb-4 leading-snug">
                {challenges[activeTab].prob}
              </h3>
              <p className="text-lg text-brand-muted leading-relaxed mb-6 max-w-2xl">
                {challenges[activeTab].desc}
              </p>
              <a
                href="#book"
                className="text-brand-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
              >
                {challenges[activeTab].cta} <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>


      {/* === 5. Capabilities — Horizontal scroll === */}
      <section id="capabilities" className="bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge label="CAPABILITIES" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight mb-4">
              Full-service. Full-stack.
            </h2>
            <p className="text-lg text-brand-muted max-w-xl">
              From research to production — we own the entire stack.
            </p>
          </motion.div>
        </div>

        {/* Desktop: Horizontal scroll */}
        <div className="hidden md:block" ref={capsContainerRef} style={{ height: 'calc(100vh * 3)' }}>
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

            <motion.div
              style={{ x: capsX }}
              className="flex gap-6 pl-12 pr-48"
            >
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="w-[350px] shrink-0 bg-white rounded-2xl shadow-sm border border-brand-gray p-8 hover:shadow-md hover:border-brand-primary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-tint flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <HugeiconsIcon icon={cap.icon} size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-brand-navy mb-3">{cap.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden px-6 pb-24 space-y-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-brand-gray p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-tint flex items-center justify-center text-brand-primary mb-4">
                <HugeiconsIcon icon={cap.icon} size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-brand-navy mb-2">{cap.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* === 6. Process — Zigzag timeline === */}
      <section id="process" ref={processRef} className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <SectionBadge label="OUR PROCESS" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight">
              How we work
            </h2>
          </motion.div>

          {/* Timeline container */}
          <div className="relative">
            {/* Vertical line — desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-gray -translate-x-1/2">
              <motion.div
                style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
                className="w-full h-full bg-brand-primary"
              />
            </div>
            {/* Vertical line — mobile */}
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-brand-gray">
              <motion.div
                style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
                className="w-full h-full bg-brand-primary"
              />
            </div>

            <div className="space-y-16 md:space-y-24">
              {processSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={step.num} className="relative">
                    {/* Number badge */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-bold z-10 shadow-md">
                      {step.num}
                    </div>

                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${
                        isLeft ? 'md:mr-auto md:text-right md:pr-4' : 'md:ml-auto md:text-left md:pl-4'
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-sm border border-brand-gray p-6 md:p-8 text-left">
                        <div className="w-10 h-10 rounded-xl bg-brand-tint flex items-center justify-center text-brand-primary mb-4">
                          <HugeiconsIcon icon={step.icon} size={20} />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-brand-navy mb-2">{step.title}</h3>
                        <p className="text-brand-muted text-sm leading-relaxed mb-3">{step.desc}</p>
                        <span className="text-xs font-semibold text-brand-primary tracking-wider uppercase">
                          {step.duration}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* === 7. Case Study — Dark immersive === */}
      <section id="case-study" className="bg-brand-navy text-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <SectionBadge label="CASE STUDY" light />
          </motion.div>

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full bg-brand-primary/20 rounded-2xl aspect-[21/9] flex items-center justify-center mb-12"
          >
            <span className="text-white/40 text-sm">Case Study Photography</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-10"
          >
            A state court system that hadn't updated since 2003.
          </motion.h2>

          {/* Metrics with count-up */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-sky">
                <CountUp target={40} suffix="%" />
              </div>
              <div className="text-sm text-white/60 mt-2">Faster Processing</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-sky">2M+</div>
              <div className="text-sm text-white/60 mt-2">Residents Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-sky">Zero</div>
              <div className="text-sm text-white/60 mt-2">Downtime</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-brand-sky">
                <CountUp target={99.9} suffix="%" decimals={1} />
              </div>
              <div className="text-sm text-white/60 mt-2">Uptime SLA</div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 leading-relaxed max-w-2xl mb-8"
          >
            We rebuilt their case management platform from the ground up — replacing a brittle legacy system with a modern, secure application — while keeping 2,000+ court staff operational throughout.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="#"
            className="bg-white text-brand-navy rounded-full px-8 py-3.5 font-semibold hover:bg-brand-tint transition-colors inline-flex items-center gap-2"
          >
            Read the Full Story <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
          </motion.a>
        </div>
      </section>


      {/* === 8. Discovery Call Booking === */}
      <section id="book" className="bg-[#F8FAFC] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <SectionBadge label="LET'S TALK" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight mb-6">
                Let's talk about what's slowing you down.
              </h2>
              <p className="text-lg text-brand-muted leading-relaxed mb-8">
                30 minutes. No pitch. We'll map your biggest operational bottleneck and tell you if we can help.
              </p>
              <div className="space-y-4">
                {[
                  'No commitment',
                  'Talk to a strategist, not a salesperson',
                  'Walk away with actionable insight',
                ].map((signal) => (
                  <div key={signal} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} color="#1863DC" />
                    </div>
                    <span className="text-brand-dark font-medium">{signal}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <CalendarWidget />
            </motion.div>
          </div>
        </div>
      </section>


      {/* === 9. Testimonials — Dark quote spotlight === */}
      <section className="bg-brand-navy text-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {/* Decorative quote mark */}
          <div className="text-8xl md:text-9xl font-bold text-brand-primary/20 leading-none select-none mb-4">
            <HugeiconsIcon icon={QuoteDownIcon} size={100} />
          </div>

          {/* Quote */}
          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm text-white/50 mt-1">{testimonials[activeTestimonial].company}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? 'bg-brand-primary w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </button>
          </div>
        </div>
      </section>


      {/* === 10. Final CTA === */}
      <section className="py-32 md:py-40 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-brand-navy leading-[1.05] mb-6"
          >
            Ready to replace what's holding you back?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-brand-muted max-w-xl mx-auto mb-10"
          >
            Book a 30-minute discovery call. No pitch, just strategy.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="#book"
            className="bg-brand-primary text-white rounded-full px-10 py-4 font-semibold text-lg hover:bg-brand-navy transition-colors inline-flex items-center gap-2"
          >
            Book a Discovery Call <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
          </motion.a>
        </div>
      </section>


      {/* === 11. Footer === */}
      <footer className="bg-[#F8FAFC] border-t border-brand-gray">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12">
            {/* Logo + tagline */}
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

            {/* Services */}
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

            {/* Company */}
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

            {/* Connect */}
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

          {/* Newsletter */}
          <div className="border-t border-brand-gray pt-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-md">
              <span className="text-sm font-medium text-brand-navy shrink-0">Stay in the loop</span>
              <div className="flex w-full gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-2.5 rounded-full border border-brand-gray text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button className="bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-navy transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
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
