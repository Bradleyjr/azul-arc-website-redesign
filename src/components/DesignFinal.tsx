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
  ArrowLeft01Icon,
  CheckmarkCircle01Icon,
  ArrowDown01Icon,
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
import HeroShader from './HeroShader';


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
    duration: "2-3 weeks",
  },
  {
    num: "02",
    title: "Blueprint",
    desc: "A detailed technical plan with architecture decisions, timeline, and guaranteed ROI projections.",
    duration: "2-3 weeks",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Agile sprints with milestone demos. You see working software every two weeks — not slide decks.",
    duration: "3-9 months",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Phased rollouts, data migration, and hands-on training so adoption happens on day one.",
    duration: "2-4 weeks",
  },
  {
    num: "05",
    title: "Evolve",
    desc: "Ongoing maintenance, performance monitoring, and iterative improvements as your needs grow.",
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
  const startDay = 0;
  const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM'];

  const blanks = Array.from({ length: startDay }, (_, i) => i);
  const days = Array.from({ length: daysInMarch }, (_, i) => i + 1);

  const isWeekend = (day: number) => {
    const dayOfWeek = (startDay + day - 1) % 7;
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-gray shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-tint transition-colors">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
        </button>
        <span className="text-lg font-semibold text-brand-navy">March 2026</span>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-tint transition-colors">
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayHeaders.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-brand-muted py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((b) => (
          <div key={`blank-${b}`} />
        ))}
        {days.map((day) => {
          const weekend = isWeekend(day);
          const selected = selectedDate === day;
          const past = day < 2;
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef as RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // About section — sticky scroll with flying photos
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutContainerRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });
  const photo1Y = useTransform(aboutProgress, [0, 1], [500, -700]);
  const photo2Y = useTransform(aboutProgress, [0, 1], [700, -500]);
  const photo3Y = useTransform(aboutProgress, [0, 1], [400, -800]);
  const photo4Y = useTransform(aboutProgress, [0, 1], [600, -600]);

  // Horizontal scroll for capabilities
  const capsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: capsProgress } = useScroll({
    target: capsContainerRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });
  const capsX = useTransform(capsProgress, [0, 1], ['0%', '-65%']);

  return (
    <div className="bg-white text-brand-dark font-sans min-h-screen relative selection:bg-brand-primary selection:text-white">
      {/* Keyframes */}
      <style>{`
        @keyframes gradientPulse {
          0%, 100% { background-position: 50% 50%; background-size: 200% 200%; }
          25% { background-position: 0% 50%; background-size: 250% 250%; }
          50% { background-position: 100% 50%; background-size: 200% 200%; }
          75% { background-position: 50% 0%; background-size: 250% 250%; }
        }
        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.hasDropdown && <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="text-brand-muted/60 group-hover:text-brand-dark transition-colors" />}
                </a>

                {link.hasDropdown && link.dropdownKey && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white rounded-2xl border border-brand-gray shadow-2xl shadow-zinc-300/40 p-4">
                      <div className={`grid gap-3 ${link.dropdownKey === 'industries' ? 'grid-cols-3 w-[680px]' : 'grid-cols-4 w-[860px]'}`}>
                        {dropdownItems[link.dropdownKey]?.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="group/card flex flex-col rounded-xl overflow-hidden border border-brand-gray hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-brand-tint">
                              <img
                                src={item.image}
                                alt={item.label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="p-3 flex flex-col gap-1">
                              <span className="text-sm font-semibold text-brand-navy group-hover/card:text-brand-primary transition-colors">{item.label}</span>
                              <span className="text-xs text-brand-muted leading-relaxed">{item.desc}</span>
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
                  <div key={link.label}>
                    {link.hasDropdown && link.dropdownKey ? (
                      <>
                        <button
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.dropdownKey ? null : link.dropdownKey!)}
                          className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-brand-muted hover:text-brand-dark transition-colors"
                        >
                          {link.label}
                          <HugeiconsIcon icon={ArrowDown01Icon} size={16} className={`text-brand-muted transition-transform ${mobileDropdownOpen === link.dropdownKey ? 'rotate-180' : ''}`} />
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
                                <a key={item.label} href={item.href} className="block px-3 py-2.5 text-sm text-brand-muted hover:text-brand-dark transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                  {item.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={link.href}
                        className="block px-3 py-3 text-base font-medium text-brand-muted hover:text-brand-dark transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
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


      {/* === 2. Hero — GLSL Shader === */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* WebGL shader — desktop only */}
        <div className="hidden md:block absolute inset-0">
          <HeroShader />
        </div>

        {/* Mobile fallback — CSS gradient */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #EBF4FF 0%, #ffffff 40%, #07406B 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientPulse 12s ease-in-out infinite',
          }}
        />

        {/* Hero content */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="max-w-6xl mx-auto px-6 pt-32 pb-32 text-center w-full relative z-10"
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
          className="absolute bottom-12 left-0 right-0 flex justify-center gap-12 z-10"
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



      {/* === 3. About — Sticky scroll with flying photos === */}
      <section id="about" className="bg-[#F8FAFC]">
        {/* Desktop: sticky scroll experience */}
        <div className="hidden md:block" ref={aboutContainerRef} style={{ height: '250vh' }}>
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            {/* Element 1 — Layered architecture fragment, far left */}
            <motion.div style={{ y: photo1Y }} className="absolute left-[4%] z-10">
              <div className="relative w-56 h-72 -rotate-6">
                {/* Outer frame */}
                <div className="absolute inset-0 rounded-2xl border border-brand-primary/20" />
                {/* Inner offset frame */}
                <div className="absolute inset-3 rounded-xl border border-brand-sky/15" />
                {/* Content block — code-like lines */}
                <div className="absolute top-8 left-6 right-6 space-y-2.5">
                  <div className="h-1 w-3/4 rounded-full bg-brand-primary/15" />
                  <div className="h-1 w-1/2 rounded-full bg-brand-sky/12" />
                  <div className="h-1 w-5/6 rounded-full bg-brand-primary/10" />
                  <div className="h-1 w-2/3 rounded-full bg-brand-sky/8" />
                  <div className="h-px w-full bg-brand-gray/30 mt-4" />
                  <div className="h-1 w-1/3 rounded-full bg-brand-primary/12" />
                  <div className="h-1 w-3/5 rounded-full bg-brand-sky/10" />
                </div>
                {/* Corner accent */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-primary/25 rounded-br-lg" />
                {/* Status dot */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-primary/40" />
              </div>
            </motion.div>

            {/* Element 2 — Isometric data block, far right */}
            <motion.div style={{ y: photo2Y }} className="absolute right-[6%] z-10">
              <div className="relative w-52 h-64 rotate-3">
                {/* Card body */}
                <div className="absolute inset-0 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-brand-primary/10 overflow-hidden">
                  {/* Header bar */}
                  <div className="h-8 border-b border-brand-primary/10 flex items-center px-3 gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-sky/25" />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-muted/20" />
                  </div>
                  {/* Bar chart mock */}
                  <div className="absolute bottom-6 left-4 right-4 flex items-end gap-2 h-24">
                    <div className="flex-1 bg-brand-primary/12 rounded-t" style={{ height: '45%' }} />
                    <div className="flex-1 bg-brand-primary/18 rounded-t" style={{ height: '72%' }} />
                    <div className="flex-1 bg-brand-sky/15 rounded-t" style={{ height: '58%' }} />
                    <div className="flex-1 bg-brand-primary/20 rounded-t" style={{ height: '90%' }} />
                    <div className="flex-1 bg-brand-sky/12 rounded-t" style={{ height: '65%' }} />
                    <div className="flex-1 bg-brand-primary/15 rounded-t" style={{ height: '40%' }} />
                  </div>
                  {/* Axis line */}
                  <div className="absolute bottom-5 left-3 right-3 h-px bg-brand-primary/10" />
                </div>
              </div>
            </motion.div>

            {/* Element 3 — Network node cluster, left-center */}
            <motion.div style={{ y: photo3Y }} className="absolute left-[22%] z-10">
              <div className="relative w-40 h-40 rotate-12">
                <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connection lines */}
                  <line x1="40" y1="30" x2="120" y2="60" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="120" y1="60" x2="80" y2="130" stroke="#2AA7DF" strokeOpacity="0.12" strokeWidth="1" />
                  <line x1="80" y1="130" x2="40" y2="30" stroke="#1863DC" strokeOpacity="0.1" strokeWidth="1" />
                  <line x1="30" y1="90" x2="120" y2="60" stroke="#2AA7DF" strokeOpacity="0.08" strokeWidth="1" />
                  <line x1="30" y1="90" x2="80" y2="130" stroke="#1863DC" strokeOpacity="0.1" strokeWidth="1" />
                  <line x1="140" y1="120" x2="120" y2="60" stroke="#1863DC" strokeOpacity="0.08" strokeWidth="1" />
                  <line x1="140" y1="120" x2="80" y2="130" stroke="#2AA7DF" strokeOpacity="0.1" strokeWidth="1" />
                  {/* Nodes */}
                  <circle cx="40" cy="30" r="4" fill="#1863DC" fillOpacity="0.2" />
                  <circle cx="40" cy="30" r="1.5" fill="#1863DC" fillOpacity="0.5" />
                  <circle cx="120" cy="60" r="5" fill="#1863DC" fillOpacity="0.15" />
                  <circle cx="120" cy="60" r="2" fill="#1863DC" fillOpacity="0.4" />
                  <circle cx="80" cy="130" r="4" fill="#2AA7DF" fillOpacity="0.2" />
                  <circle cx="80" cy="130" r="1.5" fill="#2AA7DF" fillOpacity="0.5" />
                  <circle cx="30" cy="90" r="3" fill="#2AA7DF" fillOpacity="0.15" />
                  <circle cx="30" cy="90" r="1" fill="#2AA7DF" fillOpacity="0.4" />
                  <circle cx="140" cy="120" r="3.5" fill="#1863DC" fillOpacity="0.12" />
                  <circle cx="140" cy="120" r="1.2" fill="#1863DC" fillOpacity="0.35" />
                </svg>
              </div>
            </motion.div>

            {/* Element 4 — Blueprint grid fragment, right-center, passes in FRONT */}
            <motion.div style={{ y: photo4Y }} className="absolute right-[14%] z-30 opacity-30">
              <div className="relative w-44 h-44 -rotate-3">
                <svg viewBox="0 0 176 176" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid lines */}
                  <line x1="0" y1="44" x2="176" y2="44" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="0.5" />
                  <line x1="0" y1="88" x2="176" y2="88" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="0.5" />
                  <line x1="0" y1="132" x2="176" y2="132" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="0.5" />
                  <line x1="44" y1="0" x2="44" y2="176" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="0.5" />
                  <line x1="88" y1="0" x2="88" y2="176" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="0.5" />
                  <line x1="132" y1="0" x2="132" y2="176" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="0.5" />
                  {/* Highlight rectangle */}
                  <rect x="44" y="44" width="88" height="44" stroke="#1863DC" strokeOpacity="0.3" strokeWidth="1" rx="2" />
                  {/* Measurement marks */}
                  <circle cx="44" cy="44" r="2" fill="#1863DC" fillOpacity="0.25" />
                  <circle cx="132" cy="44" r="2" fill="#1863DC" fillOpacity="0.25" />
                  <circle cx="132" cy="88" r="2" fill="#2AA7DF" fillOpacity="0.25" />
                  <circle cx="44" cy="88" r="2" fill="#2AA7DF" fillOpacity="0.25" />
                  {/* Diagonal dimension line */}
                  <line x1="44" y1="88" x2="132" y2="44" stroke="#2AA7DF" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="4 3" />
                </svg>
              </div>
            </motion.div>

            {/* Centered text — on top */}
            <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-brand-primary">&#10022;</span>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-primary">ABOUT US</span>
              </div>
              <p className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-brand-navy leading-[1.15] tracking-tight">
                We are passionate about empowering mid-market companies to take control of their operations and achieve their growth goals.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: simple layout */}
        <div className="md:hidden py-24 px-6 text-center">
          <SectionBadge label="ABOUT US" />
          <p className="text-3xl font-semibold text-brand-navy leading-tight mb-8">
            We are passionate about empowering mid-market companies to take control of their operations and achieve their growth goals.
          </p>
          <div className="flex justify-center gap-6 flex-wrap mt-8">
            {/* Mini network node cluster */}
            <div className="w-24 h-24" style={{ animation: 'gentleFloat 6s ease-in-out infinite' }}>
              <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                <line x1="20" y1="20" x2="76" y2="40" stroke="#1863DC" strokeOpacity="0.15" strokeWidth="1" />
                <line x1="76" y1="40" x2="48" y2="76" stroke="#2AA7DF" strokeOpacity="0.12" strokeWidth="1" />
                <line x1="48" y1="76" x2="20" y2="20" stroke="#1863DC" strokeOpacity="0.1" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="#1863DC" fillOpacity="0.2" />
                <circle cx="20" cy="20" r="1.2" fill="#1863DC" fillOpacity="0.5" />
                <circle cx="76" cy="40" r="4" fill="#1863DC" fillOpacity="0.15" />
                <circle cx="76" cy="40" r="1.5" fill="#1863DC" fillOpacity="0.4" />
                <circle cx="48" cy="76" r="3" fill="#2AA7DF" fillOpacity="0.2" />
                <circle cx="48" cy="76" r="1.2" fill="#2AA7DF" fillOpacity="0.5" />
              </svg>
            </div>
            {/* Mini architecture fragment */}
            <div className="w-28 h-20 rounded-lg border border-brand-primary/10 bg-white/[0.04] overflow-hidden" style={{ animation: 'gentleFloat 8s ease-in-out infinite 1s' }}>
              <div className="h-5 border-b border-brand-primary/8 flex items-center px-2 gap-1">
                <div className="w-1 h-1 rounded-full bg-brand-primary/25" />
                <div className="w-1 h-1 rounded-full bg-brand-sky/20" />
              </div>
              <div className="p-2 space-y-1.5">
                <div className="h-px w-16 bg-brand-primary/10" />
                <div className="h-px w-12 bg-brand-sky/8" />
                <div className="h-px w-14 bg-brand-primary/6" />
              </div>
            </div>
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

      {/* === 5. Capabilities — Fixed horizontal scroll === */}
      <section id="capabilities" className="bg-[#F8FAFC]">
        {/* Desktop: horizontal scroll */}
        <div className="hidden md:block" ref={capsContainerRef} style={{ height: '300vh' }}>
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            {/* Header — inside sticky so no gap */}
            <div className="max-w-7xl mx-auto px-6 w-full mb-10">
              <SectionBadge label="CAPABILITIES" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight mb-3">
                Full-service. Full-stack.
              </h2>
              <p className="text-lg text-brand-muted max-w-xl">
                From research to production — we own the entire stack.
              </p>
            </div>

            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

            {/* Cards track */}
            <motion.div
              style={{ x: capsX }}
              className="flex gap-8 pl-6"
            >
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="w-[480px] shrink-0 bg-white rounded-3xl shadow-sm border border-brand-gray p-10 hover:shadow-lg hover:border-brand-primary/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-tint flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <HugeiconsIcon icon={cap.icon} size={28} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-brand-navy mb-4">{cap.title}</h3>
                  <p className="text-brand-muted leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden px-6 py-24 space-y-4">
          <SectionBadge label="CAPABILITIES" />
          <h2 className="text-3xl font-bold tracking-tight text-brand-navy leading-tight mb-3">
            Full-service. Full-stack.
          </h2>
          <p className="text-base text-brand-muted mb-8">
            From research to production — we own the entire stack.
          </p>
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

      {/* === 6. Process — Interactive split layout === */}
      <section id="process" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionBadge label="OUR PROCESS" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight">
              How we work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-0 min-h-[550px]">
            {/* Left: Step navigator */}
            <div className="flex flex-col">
              {processSteps.map((step, i) => (
                <button
                  key={step.num}
                  onClick={() => setActiveProcessStep(i)}
                  className={`w-full text-left px-6 md:px-8 py-5 md:py-6 border-l-4 transition-all duration-300 cursor-pointer
                    ${activeProcessStep === i
                      ? 'border-brand-primary bg-brand-tint/50'
                      : 'border-transparent hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-start gap-5">
                    <span className={`text-4xl md:text-5xl font-extrabold tracking-tighter transition-colors duration-300 leading-none
                      ${activeProcessStep === i ? 'text-brand-primary' : 'text-brand-gray'}`}>
                      {step.num}
                    </span>
                    <div className="pt-1">
                      <h3 className={`text-lg md:text-xl font-bold tracking-tight transition-colors
                        ${activeProcessStep === i ? 'text-brand-navy' : 'text-brand-muted'}`}>
                        {step.title}
                      </h3>
                      {activeProcessStep === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="text-brand-muted mt-2 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                          <span className="inline-block mt-3 text-xs font-semibold text-brand-primary tracking-wider uppercase">
                            {step.duration}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Large image placeholder */}
            <div className="hidden md:block relative bg-brand-tint rounded-3xl overflow-hidden min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcessStep}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <div className="w-full h-full bg-white/60 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                      <span className="text-3xl font-extrabold">{processSteps[activeProcessStep].num}</span>
                    </div>
                    <span className="text-brand-navy font-bold text-xl mb-2">{processSteps[activeProcessStep].title}</span>
                    <span className="text-brand-muted text-sm">Visual placeholder</span>
                  </div>
                </motion.div>
              </AnimatePresence>
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


      {/* === 9. Testimonials — Dual-row marquee === */}
      <section className="bg-brand-navy text-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge label="TESTIMONIALS" light />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              What our clients say
            </h2>
          </motion.div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="mb-6 overflow-hidden mask-edges">
          <div className="flex animate-marquee" style={{ width: 'max-content' }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`row1-${i}`}
                className="shrink-0 w-[420px] mx-3 p-8 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm"
              >
                <p className="text-white/80 leading-relaxed mb-6 text-[15px]">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs mt-0.5">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden mask-edges">
          <div className="flex animate-marquee-reverse" style={{ width: 'max-content' }}>
            {[...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)].map((t, i) => (
              <div
                key={`row2-${i}`}
                className="shrink-0 w-[380px] mx-3 p-8 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm"
              >
                <p className="text-white/80 leading-relaxed mb-6 text-[15px]">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs mt-0.5">{t.company}</div>
                </div>
              </div>
            ))}
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
                What We Do
              </div>
              <ul className="space-y-2.5">
                {['Digital Product Strategy', 'Web Design & Development', '3D Visualisation', 'Case Management Systems'].map((link) => (
                  <li key={link}>
                    <a href="#what-we-do" className="text-sm text-brand-muted hover:text-brand-dark transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-muted mb-4">
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
                    <a href={link.href} className="text-sm text-brand-muted hover:text-brand-dark transition-colors">{link.label}</a>
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

          <div className="border-t border-brand-gray pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-brand-muted">
              &copy; {new Date().getFullYear()} Azul Arc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-xs text-brand-muted hover:text-brand-dark transition-colors">Privacy Policy / Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
