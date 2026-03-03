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
  Calendar03Icon,
} from '@hugeicons/core-free-icons';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  animate,
} from 'motion/react';
import { useState, useRef, useEffect, useCallback, type RefObject } from 'react';
import HeroShader from './HeroShader';
import GodRaysShader from './GodRaysShader';


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
    shortLabel: "Courts",
    prob: "Legacy systems slowing down your agency?",
    cta: "See How We Modernize Public Systems",
    desc: "State agencies run on software built decades ago. We replace fragile legacy systems with secure, modern platforms — without disrupting daily operations. Our CaseHub project cut case processing time by 40% for a state court system serving 2M+ residents.",
    icon: ComputerTerminal01Icon,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=900&fit=crop&q=80",
  },
  {
    id: 1,
    label: "Manufacturing & Distribution",
    shortLabel: "Manufacturing",
    prob: "Your sales team can't see the full picture?",
    cta: "See How We Build Visibility",
    desc: "When product catalogs live in spreadsheets and pricing changes take weeks, revenue leaks. We build digital product platforms that give your sales team real-time inventory, dynamic pricing, and customer analytics — so they close faster.",
    icon: GridViewIcon,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=900&fit=crop&q=80",
  },
  {
    id: 2,
    label: "Growth-Stage Companies",
    shortLabel: "Growth",
    prob: "Manual processes killing your margins?",
    cta: "See How We Automate Operations",
    desc: "You've grown past what spreadsheets and workarounds can handle, but you're not ready for a 50-person IT department. We automate the operational bottlenecks — approvals, reporting, data entry — that are eating your margins and capping your growth.",
    icon: ChartBarLineIcon,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=900&fit=crop&q=80",
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

// --- Case Studies Data ---
const caseStudies = [
  {
    title: 'CaseHub',
    client: 'State Judicial Branch',
    logo: 'CH',
    desc: 'End-to-end digital case management replacing legacy court systems with modern workflow automation.',
    stat: '40% Faster Processing',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=340&fit=crop&q=80',
  },
  {
    title: 'Azul Arc',
    client: 'Internal Platform',
    logo: 'AA',
    desc: 'Internal delivery platform that tripled team velocity across design, dev, and QA.',
    stat: '3x Faster Delivery',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=340&fit=crop&q=80',
  },
  {
    title: 'RenderLab',
    client: 'Industrial Manufacturer',
    logo: 'RL',
    desc: '3D product configurator that cut quote turnaround by 85% for a national manufacturer.',
    stat: '85% Quote Time Reduced',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=340&fit=crop&q=80',
  },
  {
    title: 'FlowOps',
    client: 'Growth-Stage Logistics Co.',
    logo: 'FO',
    desc: 'Automated logistics workflows that slashed operational costs in half within 6 months.',
    stat: '50% Cost Reduction',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=340&fit=crop&q=80',
  },
  {
    title: 'DistroSync',
    client: 'National Distribution Co.',
    logo: 'DS',
    desc: 'Real-time distribution tracking platform serving 200+ warehouses with 99.9% uptime.',
    stat: '99.9% Uptime SLA',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop&q=80',
  },
  {
    title: 'CourtLink',
    client: 'Regional Court System',
    logo: 'CL',
    desc: 'Zero-downtime migration of 2M+ court records from a 20-year-old legacy system.',
    stat: 'Zero Downtime Migration',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=340&fit=crop&q=80',
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
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState<false | 'particles' | 'done'>(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; angle: number; speed: number; size: number; color: string; delay: number }>>([]);

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

  const handleConfirm = () => {
    setBookingConfirmed(true);
    // Step 1: Hide calendar (triggers exit animation ~300ms + drawer close ~600ms)
    setShowConfirmation('particles');
    // Step 2: After drawer settles, fire particles immediately
    setTimeout(() => {
      const colors = ['#1863DC', '#2AA7DF', '#07406B', '#EBF4FF', '#ffffff'];
      setParticles(Array.from({ length: 48 }, (_, i) => ({
        id: i, x: 0, y: 0,
        angle: (Math.PI * 2 * i) / 48 + (Math.random() - 0.5) * 0.6,
        speed: 100 + Math.random() * 200,
        size: 3 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.35,
      })));
    }, 450);
    // Step 3: After particles peak, show confirmation (overlap slightly)
    setTimeout(() => setShowConfirmation('done'), 1450);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-brand-gray shadow-sm overflow-hidden relative"
    >
      {/* Burst particles — positioned over the whole card */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none z-50"
            style={{ width: p.size, height: p.size, background: p.color, left: '50%', top: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1.2 }}
            animate={{ x: Math.cos(p.angle) * p.speed, y: Math.sin(p.angle) * p.speed, opacity: 0, scale: 0 }}
            transition={{ duration: 1.8, delay: p.delay, ease: [0.15, 0.6, 0.4, 1] }}
            onAnimationComplete={() => setParticles((prev) => prev.filter((pp) => pp.id !== p.id))}
          />
        ))}
      </AnimatePresence>

      {/* Calendar drawer — collapses on confirm */}
      <motion.div
        animate={{
          height: showConfirmation === false ? 'auto' : 0,
          opacity: showConfirmation === false ? 1 : 0,
        }}
        initial={{ height: 'auto', opacity: 1 }}
        transition={{
          height: { type: 'spring', stiffness: 200, damping: 28 },
          opacity: { duration: 0.25 },
        }}
        className="overflow-hidden"
      >
        <div className="p-6">
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
              <div key={d} className="text-center text-xs font-semibold text-brand-muted py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {blanks.map((b) => <div key={`blank-${b}`} />)}
            {days.map((day) => {
              const weekend = isWeekend(day);
              const selected = selectedDate === day;
              const past = day < 2;
              return (
                <button
                  key={day}
                  disabled={weekend || past}
                  onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
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

          {/* Time slots drawer */}
          <motion.div
            animate={{
              height: selectedDate ? 'auto' : 0,
              opacity: selectedDate ? 1 : 0,
            }}
            initial={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', stiffness: 200, damping: 28 },
              opacity: { duration: 0.3, delay: selectedDate ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-brand-gray">
              <div className="text-sm font-medium text-brand-navy mb-3">
                Available times for March {selectedDate}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200
                      ${selectedTime === time ? 'bg-brand-primary text-white' : 'bg-brand-tint text-brand-navy hover:bg-brand-primary/10'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <motion.button
                disabled={!selectedDate || !selectedTime || bookingConfirmed}
                onClick={handleConfirm}
                animate={{
                  opacity: bookingConfirmed ? 1 : selectedTime ? 1 : 0.5,
                  y: selectedTime ? 0 : 4,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`w-full mt-5 py-3 rounded-full text-sm font-semibold transition-colors duration-300
                  ${bookingConfirmed
                    ? 'bg-emerald-500 text-white cursor-default'
                    : selectedDate && selectedTime
                      ? 'bg-brand-primary text-white hover:bg-brand-navy cursor-pointer'
                      : 'bg-brand-gray text-brand-muted cursor-not-allowed'
                  }
                `}
              >
                {bookingConfirmed ? 'Booked!' : 'Confirm Booking'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Confirmation drawer — expands after calendar collapses */}
      <motion.div
        animate={{
          height: showConfirmation !== false ? 'auto' : 0,
          opacity: showConfirmation !== false ? 1 : 0,
        }}
        initial={{ height: 0, opacity: 0 }}
        transition={{
          height: { type: 'spring', stiffness: 200, damping: 28 },
          opacity: { duration: 0.3, delay: showConfirmation !== false ? 0.15 : 0 },
        }}
        className="overflow-hidden"
      >
        <div className="p-8 flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center text-center w-full"
            animate={{ opacity: showConfirmation === 'done' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated checkmark circle */}
            <motion.div
              className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6"
              animate={{ scale: showConfirmation === 'done' ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            >
              <motion.svg
                className="w-10 h-10 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: showConfirmation === 'done' ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.svg>
            </motion.div>

            <motion.h3
              className="text-2xl font-bold text-brand-navy mb-2"
              animate={{ opacity: showConfirmation === 'done' ? 1 : 0, y: showConfirmation === 'done' ? 0 : 15 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              You're all set!
            </motion.h3>

            <motion.p
              className="text-brand-muted text-sm mb-6"
              animate={{ opacity: showConfirmation === 'done' ? 1 : 0, y: showConfirmation === 'done' ? 0 : 15 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Your discovery call has been booked.
            </motion.p>

            {/* Booking details card */}
            <motion.div
              className="w-full rounded-xl bg-brand-tint border border-brand-gray p-5 mb-6 text-left"
              animate={{ opacity: showConfirmation === 'done' ? 1 : 0, y: showConfirmation === 'done' ? 0 : 15 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <HugeiconsIcon icon={Calendar03Icon} size={20} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-navy">March {selectedDate}, 2026</div>
                  <div className="text-xs text-brand-muted">{selectedTime} · 30 minutes</div>
                </div>
              </div>
              <div className="h-px bg-brand-gray my-3" />
              <p className="text-xs text-brand-muted">
                Check your inbox for a confirmation email with a calendar invite and meeting link.
              </p>
            </motion.div>

            <motion.button
              className="text-sm font-medium text-brand-primary hover:text-brand-navy transition-colors cursor-pointer"
              animate={{ opacity: showConfirmation === 'done' ? 1 : 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => { setBookingConfirmed(false); setShowConfirmation(false as const); setSelectedDate(null); setSelectedTime(null); }}
            >
              Book another call
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Magnetic Aurora CTA Button ---
function DiscoveryCTAButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const canHover = useRef(false);
  const [particles, setParticles] = useState<Array<{
    id: number; x: number; y: number; size: number; color: string;
    duration: number; delay: number; angle: number; distance: number;
  }>>([]);
  const particleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const particleId = useRef(0);

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  // Magnetic pull — stronger range
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { damping: 18, stiffness: 200, mass: 0.8 });
  const springY = useSpring(rawY, { damping: 18, stiffness: 200, mass: 0.8 });
  const translateX = useTransform(springX, [-150, 150], [-18, 18]);
  const translateY = useTransform(springY, [-100, 100], [-12, 12]);

  // Aurora gradient — cursor tracking
  const cursorU = useMotionValue(0.5);
  const cursorV = useMotionValue(0.5);
  const auroraX = useSpring(cursorU, { damping: 25, stiffness: 180 });
  const auroraY = useSpring(cursorV, { damping: 25, stiffness: 180 });

  // Glow opacity
  const glowTarget = useMotionValue(0);
  useEffect(() => { glowTarget.set(isHovered ? 1 : 0); }, [isHovered, glowTarget]);
  const glowOpacity = useSpring(glowTarget, { damping: 15, stiffness: 150 });

  // Vivid aurora that follows cursor
  const auroraBackground = useTransform(
    [auroraX, auroraY],
    ([u, v]: number[]) =>
      `radial-gradient(ellipse 90% 120% at ${u * 100}% ${v * 100}%, rgba(42,167,223,0.6) 0%, rgba(24,99,220,0.35) 35%, rgba(7,64,107,0.15) 60%, transparent 80%)`
  );

  // Continuous particle emission while hovered
  useEffect(() => {
    if (isHovered && canHover.current) {
      const emit = () => {
        const btn = buttonRef.current?.getBoundingClientRect();
        if (!btn) return;
        const colors = ['#2AA7DF', '#1863DC', '#EBF4FF', '#ffffff', '#60B8F0'];
        // Emit 3 particles per tick from random edge positions
        const newParticles = Array.from({ length: 3 }, () => {
          const angle = Math.random() * Math.PI * 2;
          const hw = btn.width / 2;
          const hh = btn.height / 2;
          // Start from the pill edge
          const edgeX = Math.cos(angle) * hw;
          const edgeY = Math.sin(angle) * hh * 0.6;
          return {
            id: particleId.current++,
            x: edgeX,
            y: edgeY,
            size: 2 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: 0.8 + Math.random() * 1.2,
            delay: Math.random() * 0.1,
            angle,
            distance: 30 + Math.random() * 80,
          };
        });
        setParticles((prev) => [...prev.slice(-60), ...newParticles]); // cap at ~60
      };
      emit(); // immediate first burst
      particleTimer.current = setInterval(emit, 120);
      return () => {
        if (particleTimer.current) clearInterval(particleTimer.current);
      };
    } else {
      if (particleTimer.current) clearInterval(particleTimer.current);
      // Let existing particles finish animating
    }
  }, [isHovered]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover.current) return;
    const btn = buttonRef.current?.getBoundingClientRect();
    if (!btn) return;
    rawX.set(e.clientX - (btn.left + btn.width / 2));
    rawY.set(e.clientY - (btn.top + btn.height / 2));
    cursorU.set(Math.max(0, Math.min(1, (e.clientX - btn.left) / btn.width)));
    cursorV.set(Math.max(0, Math.min(1, (e.clientY - btn.top) / btn.height)));
  }, [rawX, rawY, cursorU, cursorV]);

  const handleMouseEnter = useCallback(() => {
    if (!canHover.current) return;
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
    cursorU.set(0.5);
    cursorV.set(0.5);
  }, [rawX, rawY, cursorU, cursorV]);


  return (
    <div
      className="relative inline-flex justify-center"
      style={{ padding: 80, margin: -80 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow — lives behind the button, same magnetic transform */}

      {/* Floating particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              left: '50%',
              top: '50%',
              zIndex: 0,
            }}
            initial={{ x: p.x, y: p.y, opacity: 0.9, scale: 1 }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.distance,
              y: p.y + Math.sin(p.angle) * p.distance,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.15, 0.6, 0.4, 1],
            }}
            onAnimationComplete={() =>
              setParticles((prev) => prev.filter((pp) => pp.id !== p.id))
            }
          />
        ))}
      </AnimatePresence>

      {/* The button */}
      <motion.a
        ref={buttonRef}
        href="#book"
        style={{ x: translateX, y: translateY }}
        animate={{
          scale: isHovered ? 1.08 : 1,
          boxShadow: isHovered
            ? '0 0 40px 8px rgba(42,167,223,0.5), 0 0 80px 20px rgba(24,99,220,0.3), 0 0 120px 40px rgba(42,167,223,0.15)'
            : '0 0 0px 0px rgba(42,167,223,0), 0 0 0px 0px rgba(24,99,220,0), 0 0 0px 0px rgba(42,167,223,0)',
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden bg-brand-primary text-white rounded-full px-12 py-5 font-semibold text-lg inline-flex items-center gap-3 cursor-pointer z-10"
      >
        {/* Animated border ring inside */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? 'inset 0 0 20px 2px rgba(42,167,223,0.4), inset 0 0 40px 4px rgba(255,255,255,0.1)'
              : 'inset 0 0 0px 0px rgba(42,167,223,0), inset 0 0 0px 0px rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.35 }}
        />

        {/* Aurora gradient layer */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: auroraBackground,
            opacity: glowOpacity,
          }}
        />


        {/* Text with slight letter-spacing animation */}
        <motion.span
          className="relative z-10"
          animate={{ letterSpacing: isHovered ? '0.04em' : '0em' }}
          transition={{ duration: 0.3 }}
        >
          Book a Discovery Call
        </motion.span>

        {/* Arrow with bold nudge */}
        <motion.span
          className="relative z-10"
          animate={isHovered ? { x: 6, scale: 1.2 } : { x: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 16, stiffness: 300 }}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={22} />
        </motion.span>
      </motion.a>
    </div>
  );
}

// --- Radial Polaroid Component ---
function RadialCard({ study, index, total, scrollProgress }: {
  study: typeof caseStudies[number];
  index: number;
  total: number;
  scrollProgress: import('motion/react').MotionValue<number>;
}) {
  const radius = 2200;
  const angleStep = 14; // degrees between cards — wider spacing
  const centerIndex = (total - 1) / 2;

  const baseAngle = useTransform(scrollProgress, [0, 1], [35, -35]);

  const cardAngle = useTransform(baseAngle, (base) => {
    return base + (index - centerIndex) * angleStep;
  });

  const x = useTransform(cardAngle, (deg) => {
    const rad = (deg * Math.PI) / 180;
    return radius * Math.sin(rad);
  });

  const y = useTransform(cardAngle, (deg) => {
    const rad = (deg * Math.PI) / 180;
    return radius - radius * Math.cos(rad);
  });

  const rotate = useTransform(cardAngle, (deg) => deg);

  return (
    <motion.div
      className="absolute group cursor-pointer"
      style={{
        x, y, rotate,
        width: 380,
        left: '50%',
        marginLeft: -190,
        top: 0,
      }}
    >
      {/* Liquid glass card */}
      <div className="relative rounded-3xl border border-white/20 bg-white/[0.12] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden transition-all duration-500 group-hover:bg-white/[0.18] group-hover:border-white/30 group-hover:shadow-[0_16px_56px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]">
        {/* Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {/* Left edge highlight */}
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/20 via-transparent to-transparent" />

        {/* Hero image */}
        <div className="m-3 mb-0 rounded-xl overflow-hidden aspect-[16/9] ring-1 ring-white/10">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 pt-4">
          <h3 className="text-lg font-bold text-white mb-2">{study.title}</h3>

          {/* Client with logo */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-white/50">{study.logo}</span>
            </div>
            <p className="text-xs text-white/50">{study.client}</p>
          </div>

          <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mb-4">{study.desc}</p>

          {/* Stat highlight */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            <span className="text-xs font-semibold text-[#2AA7DF]">{study.stat}</span>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white"
          >
            View Case Study
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Bottom inner glow */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </motion.div>
  );
}

// --- Main Component ---
export default function DesignFinal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);

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
  const photo1Y = useTransform(aboutProgress, [0, 1], [600, -500]);
  const photo2Y = useTransform(aboutProgress, [0, 1], [800, -400]);
  const photo3Y = useTransform(aboutProgress, [0, 1], [450, -700]);
  const photo4Y = useTransform(aboutProgress, [0, 1], [700, -550]);
  const photo5Y = useTransform(aboutProgress, [0, 1], [550, -650]);
  const photo6Y = useTransform(aboutProgress, [0, 1], [750, -450]);

  // Horizontal scroll for capabilities
  const capsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: capsProgress } = useScroll({
    target: capsContainerRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });
  const capsX = useTransform(capsProgress, [0.05, 0.95], ['0%', '-65%']);

  // Arc scroll for case studies
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: caseProgress } = useScroll({
    target: caseStudyRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });

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
                  {link.hasDropdown && <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-brand-muted/60 group-hover:text-brand-dark transition-colors" />}
                </a>

                {link.hasDropdown && link.dropdownKey && (
                  <div className="absolute top-full left-0 pt-3 opacity-0 invisible scale-95 origin-top-left group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 ease-out">
                    <div className="bg-white rounded-2xl border border-brand-gray shadow-2xl shadow-zinc-300/40 p-4 max-w-[calc(100vw-2rem)]">
                      <div className={`grid gap-3 ${link.dropdownKey === 'industries' ? 'grid-cols-3 w-[680px] max-w-full' : 'grid-cols-4 w-[860px] max-w-full'}`}>
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
                          <HugeiconsIcon icon={ArrowDown01Icon} size={18} className={`text-brand-muted transition-transform ${mobileDropdownOpen === link.dropdownKey ? 'rotate-180' : ''}`} />
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
            {/* Photo 1 — far left, tilted */}
            <motion.div style={{ y: photo1Y }} className="absolute left-[3%] z-10">
              <div className="w-52 h-64 -rotate-6 rounded-2xl overflow-hidden shadow-xl shadow-brand-navy/10 border border-white/80 relative">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=500&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#F8FAFC]/55" />
              </div>
            </motion.div>

            {/* Photo 2 — far right */}
            <motion.div style={{ y: photo2Y }} className="absolute right-[4%] z-10">
              <div className="w-48 h-60 rotate-3 rounded-2xl overflow-hidden shadow-xl shadow-brand-navy/10 border border-white/80 relative">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#F8FAFC]/55" />
              </div>
            </motion.div>

            {/* Photo 3 — left-center, smaller */}
            <motion.div style={{ y: photo3Y }} className="absolute left-[20%] z-10">
              <div className="w-40 h-52 rotate-6 rounded-2xl overflow-hidden shadow-lg shadow-brand-navy/10 border border-white/80 relative">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#F8FAFC]/55" />
              </div>
            </motion.div>

            {/* Photo 4 — right-center */}
            <motion.div style={{ y: photo4Y }} className="absolute right-[16%] z-10">
              <div className="w-44 h-56 -rotate-3 rounded-2xl overflow-hidden shadow-lg shadow-brand-navy/10 border border-white/80 relative">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#F8FAFC]/55" />
              </div>
            </motion.div>

            {/* Photo 5 — inner left, passes in front */}
            <motion.div style={{ y: photo5Y }} className="absolute left-[12%] z-30">
              <div className="w-36 h-48 rotate-2 rounded-2xl overflow-hidden shadow-lg shadow-brand-navy/10 border border-white/80 relative">
                <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=500&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#F8FAFC]/55" />
              </div>
            </motion.div>

            {/* Photo 6 — inner right, passes in front */}
            <motion.div style={{ y: photo6Y }} className="absolute right-[8%] z-30">
              <div className="w-38 h-50 -rotate-5 rounded-2xl overflow-hidden shadow-lg shadow-brand-navy/10 border border-white/80 relative">
                <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=500&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#F8FAFC]/55" />
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
          <div className="flex justify-center gap-4 mt-8">
            <div className="w-28 h-36 -rotate-3 rounded-xl overflow-hidden shadow-lg border border-white/80 relative" style={{ animation: 'gentleFloat 6s ease-in-out infinite' }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=260&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#F8FAFC]/55" />
            </div>
            <div className="w-24 h-32 rotate-3 rounded-xl overflow-hidden shadow-lg border border-white/80 mt-4 relative" style={{ animation: 'gentleFloat 8s ease-in-out infinite 1s' }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=260&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#F8FAFC]/55" />
            </div>
            <div className="w-28 h-36 -rotate-2 rounded-xl overflow-hidden shadow-lg border border-white/80 relative" style={{ animation: 'gentleFloat 7s ease-in-out infinite 0.5s' }}>
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=260&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#F8FAFC]/55" />
            </div>
          </div>
        </div>
      </section>


      {/* === 4. Industries — Accordion image panels === */}
      <section id="who-we-serve" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <SectionBadge label="WHO WE SERVE" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-navy leading-tight">
                Different industries,{' '}
                <br className="hidden md:block" />
                same pattern.
              </h2>
              <p className="text-lg text-brand-muted mt-4 max-w-xl">
                Smart teams held back by software that can't keep up.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setActiveTab((prev) => (prev - 1 + challenges.length) % challenges.length)}
                className="w-10 h-10 rounded-full border border-brand-gray flex items-center justify-center text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-colors"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
              </button>
              <button
                onClick={() => setActiveTab((prev) => (prev + 1) % challenges.length)}
                className="w-10 h-10 rounded-full border border-brand-gray flex items-center justify-center text-brand-muted hover:text-brand-dark hover:border-brand-dark transition-colors"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
              </button>
            </div>
          </motion.div>

          {/* Desktop: Accordion panels */}
          <div className="hidden md:flex gap-3 h-[520px]">
            {challenges.map((c, i) => {
              const isActive = activeTab === i;
              return (
                <motion.div
                  key={c.id}
                  layout
                  className="relative rounded-2xl overflow-hidden cursor-pointer"
                  animate={{ flex: isActive ? 4 : 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 1 }}
                  onMouseEnter={() => setActiveTab(i)}
                  onClick={() => setActiveTab(i)}
                >
                  <motion.img
                    src={c.image}
                    alt={c.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ scale: isActive ? 1 : 1.08 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: isActive
                        ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)',
                    }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  />

                  {/* Collapsed state — vertical label */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-2"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center mb-3">
                      <HugeiconsIcon icon={c.icon} size={20} color="white" />
                    </div>
                    <span className="text-white font-semibold text-xs whitespace-nowrap">
                      {c.shortLabel}
                    </span>
                  </motion.div>

                  {/* Expanded state — staggered content */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-8"
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -60 }}
                    transition={{
                      opacity: { duration: isActive ? 0.6 : 0.2, ease: [0.4, 0, 0.2, 1], delay: isActive ? 0.25 : 0 },
                      x: { type: 'spring', stiffness: 120, damping: 22, mass: 1, delay: isActive ? 0.2 : 0 },
                    }}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center mb-4">
                      <HugeiconsIcon icon={c.icon} size={24} color="white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-snug">
                      {c.prob}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed max-w-lg mb-4">
                      {c.desc}
                    </p>
                    <a
                      href="#book"
                      className="text-white font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                    >
                      {c.cta} <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                    </a>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: Stacked cards */}
          <div className="md:hidden space-y-4">
            {challenges.map((c) => (
              <div key={c.id} className="relative rounded-2xl overflow-hidden h-72">
                <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
                    <HugeiconsIcon icon={c.icon} size={20} color="white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{c.prob}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">{c.desc}</p>
                  <a href="#book" className="text-white font-semibold text-sm inline-flex items-center gap-2">
                    {c.cta} <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
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
              className="flex gap-8 pl-6 will-change-transform"
            >
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="w-[480px] shrink-0 bg-white rounded-3xl shadow-sm border border-brand-gray p-10 hover:shadow-lg hover:border-brand-primary/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-tint flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <HugeiconsIcon icon={cap.icon} size={28} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-brand-navy mb-4">{cap.title}</h3>
                  <p className="text-brand-muted leading-relaxed">{cap.desc}</p>
                </div>
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

          <div className="grid md:grid-cols-2 gap-0 bg-brand-tint/30 rounded-3xl overflow-hidden">
            {/* Left: Step navigator */}
            <div className="flex flex-col">
              {processSteps.map((step, i) => {
                const isActive = activeProcessStep === i;
                const isLast = i === processSteps.length - 1;
                return (
                  <button
                    key={step.num}
                    onClick={() => setActiveProcessStep(i)}
                    className={`w-full text-left cursor-pointer${isLast ? ' flex-1' : ''}`}
                  >
                    <motion.div
                      animate={{
                        paddingTop: isActive ? 24 : 16,
                        paddingBottom: isActive ? 24 : 16,
                        backgroundColor: isActive ? 'rgba(235, 244, 255, 0.6)' : 'rgba(235, 244, 255, 0)',
                        borderColor: isActive ? '#1863DC' : 'rgba(24, 99, 220, 0)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="px-6 md:px-8 border-l-4"
                    >
                      <div className="flex items-start gap-5">
                        <motion.span
                          animate={{ color: isActive ? '#1863DC' : '#E2E8F0' }}
                          transition={{ duration: 0.3 }}
                          className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-none"
                        >
                          {step.num}
                        </motion.span>
                        <div className="pt-1">
                          <motion.h3
                            animate={{ color: isActive ? '#07406B' : '#8C9BB5' }}
                            transition={{ duration: 0.3 }}
                            className="text-lg md:text-xl font-bold tracking-tight"
                          >
                            {step.title}
                          </motion.h3>
                          <motion.div
                            animate={{
                              height: isActive ? 'auto' : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            initial={false}
                            transition={{
                              height: { type: 'spring', stiffness: 250, damping: 30 },
                              opacity: { duration: 0.3, delay: isActive ? 0.1 : 0 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-brand-muted mt-2 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                            <span className="inline-block mt-3 text-xs font-semibold text-brand-primary tracking-wider uppercase">
                              {step.duration}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </button>
                );
              })}
            </div>

            {/* Right: Large image placeholder */}
            <div className="hidden md:block relative bg-brand-tint overflow-hidden">
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

      {/* === 7. Case Studies — Radial scroll === */}
      <section id="case-study" className="bg-brand-navy text-white">
        {/* Desktop: scroll-driven radial */}
        <div className="hidden md:block" ref={caseStudyRef} style={{ height: '300vh' }}>
          <div className="sticky top-0 h-screen flex flex-col overflow-hidden relative">
            {/* WebGL god rays background — inside sticky so it stays fixed */}
            <div className="absolute inset-0 z-0">
              <GodRaysShader />
            </div>
            <div className="max-w-7xl mx-auto px-6 w-full pt-24 mb-16 relative z-20">
              <SectionBadge label="OUR WORK" light />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Projects that moved the needle.
              </h2>
            </div>

            {/* Radial card arrangement */}
            <div className="relative flex-1 z-10">
              <div className="absolute inset-0 flex items-start justify-center pt-12">
                {caseStudies.map((study, i) => (
                  <RadialCard
                    key={study.title}
                    study={study}
                    index={i}
                    total={caseStudies.length}
                    scrollProgress={caseProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Polaroid grid */}
        <div className="md:hidden px-6 py-24">
          <SectionBadge label="OUR WORK" light />
          <h2 className="text-3xl font-bold tracking-tight leading-tight mb-10">
            Projects that moved the needle.
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="relative rounded-2xl border border-white/20 bg-white/[0.12] backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="m-2.5 mb-0 rounded-lg overflow-hidden aspect-[16/9] ring-1 ring-white/10">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 pt-3">
                  <h3 className="text-sm font-bold text-white mb-1.5">{study.title}</h3>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-bold text-white/50">{study.logo}</span>
                    </div>
                    <p className="text-[11px] text-white/50">{study.client}</p>
                  </div>
                  <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2 mb-3">{study.desc}</p>
                  <div className="flex items-center justify-between">
                    <a href="#" className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60">
                      View Case Study
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <span className="text-[11px] font-semibold text-[#2AA7DF]">{study.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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


      {/* === 9. Testimonials — Interactive Spotlight === */}
      <section className="bg-brand-navy text-white py-24 md:py-32 relative overflow-hidden">
        {/* Subtle ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[80%] rounded-full bg-brand-primary/[0.12] blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-brand-sky/[0.10] blur-[100px]" />
          <div className="absolute top-[20%] right-[20%] w-[30%] h-[40%] rounded-full bg-white/[0.06] blur-[80px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionBadge label="TESTIMONIALS" light />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              What our clients say
            </h2>
          </motion.div>

          {/* Desktop: spotlight grid */}
          <div
            className="hidden md:grid grid-cols-3 gap-4"
            onMouseLeave={() => setHoveredTestimonial(null)}
          >
            {testimonials.map((t, i) => {
              const isHovered = hoveredTestimonial === i;
              const someoneHovered = hoveredTestimonial !== null;
              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredTestimonial(i)}
                  animate={{
                    scale: isHovered ? 1.03 : someoneHovered ? 0.98 : 1,
                    y: isHovered ? -6 : 0,
                    opacity: isHovered ? 1 : someoneHovered ? 0.3 : 0.85,
                    filter: isHovered ? 'blur(0px)' : someoneHovered ? 'blur(3px)' : 'blur(0px)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 22,
                    mass: 0.8,
                    opacity: { duration: 0.4, ease: 'easeInOut' },
                    filter: { duration: 0.4, ease: 'easeInOut' },
                  }}
                  className="relative rounded-2xl border border-white/[0.08] bg-white/[0.05] p-7 cursor-default"
                >
                  {/* Glow border + shadow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: isHovered
                        ? '0 8px 40px rgba(42,167,223,0.12), 0 0 60px rgba(42,167,223,0.06), inset 0 1px 0 rgba(255,255,255,0.12)'
                        : '0 0 0px rgba(42,167,223,0), inset 0 1px 0 rgba(255,255,255,0)',
                      borderColor: isHovered ? 'rgba(42,167,223,0.25)' : 'rgba(255,255,255,0.08)',
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ border: '1px solid transparent', borderRadius: 'inherit' }}
                  />

                  {/* Large quote mark */}
                  <svg className="w-8 h-8 text-brand-sky/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 7.05C7.34 7.55 4.78 10.4 4.78 14.17c0 2.55 1.63 4.33 3.72 4.33 1.97 0 3.5-1.55 3.5-3.5 0-1.87-1.38-3.35-3.17-3.5.12-2.03 1.68-3.73 3.67-4.17L11 7.05zM20 7.05c-3.66.5-6.22 3.35-6.22 7.12 0 2.55 1.63 4.33 3.72 4.33 1.97 0 3.5-1.55 3.5-3.5 0-1.87-1.38-3.35-3.17-3.5.12-2.03 1.68-3.73 3.67-4.17L20 7.05z" />
                  </svg>

                  <p className="text-white/80 leading-relaxed mb-6 text-[15px]">{t.quote}</p>

                  <div className="flex items-center gap-3">
                    {/* Initials avatar */}
                    <div className="w-10 h-10 rounded-full bg-brand-sky/15 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-brand-sky">{t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-white/40 text-xs mt-0.5">{t.company}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden space-y-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6"
              >
                <p className="text-white/80 leading-relaxed mb-4 text-sm">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-sky/15 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-brand-sky">{t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.company}</div>
                  </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex"
          >
            <DiscoveryCTAButton />
          </motion.div>
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
