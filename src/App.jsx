import React, { useRef, useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Figma,
  Brain,
  Cube,
  Code2,
  Linkedin,
  Instagram,
  Globe,
  Mail,
  Phone,
} from 'lucide-react'

// Lazy-load Spline to avoid hard crashes if WebGL or module fails
const LazySpline = React.lazy(() => import('@splinetool/react-spline').then(m => ({ default: m.default })))

// Simple error boundary so the page still renders even if a section crashes
class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('Section crashed:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="relative min-h-[60vh] grid place-items-center bg-[#1B1F3B] text-center">
          <div className="mx-auto max-w-xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              Rendering fallback
            </div>
            <h2 className="mt-4 text-white text-2xl font-semibold">Something went wrong loading this section.</h2>
            <p className="mt-2 text-white/70 text-sm">You can still browse the rest of the page.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

const Nav = () => {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Portfolio' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <div className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 w-[92%] max-w-6xl rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between text-white">
          <a href="#home" className="font-semibold tracking-tight">
            Fajri Rahmanto
          </a>
          <nav className="hidden gap-6 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/80 transition hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="https://www.fiverr.com/" target="_blank" rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#7B61FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(123,97,255,0.35)] transition hover:brightness-110 md:inline-flex"
          >
            Hire Me <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

const Hero = () => {
  const [canRenderSpline, setCanRenderSpline] = useState(false)

  useEffect(() => {
    // Only attempt rendering Spline in the browser
    setCanRenderSpline(typeof window !== 'undefined')
  }, [])

  return (
    <section id="home" className="relative min-h-[90vh] w-full overflow-hidden bg-[#1B1F3B]">
      <SectionErrorBoundary>
        <div className="absolute inset-0">
          {canRenderSpline ? (
            <Suspense fallback={<div className="w-full h-full bg-[#1B1F3B]" />}> 
              <LazySpline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-[#1B1F3B]" />
          )}
        </div>
      </SectionErrorBoundary>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1B1F3B]/40 via-[#1B1F3B]/70 to-[#1B1F3B]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-36 text-center md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-[#00E6FF]" />
          Creative Digital Freelancer
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="mt-6 text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          style={{ textShadow: '0 10px 40px rgba(0,230,255,0.25)' }}
        >
          Hi, I’m <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6FF] bg-clip-text text-transparent">Fajri Rahmanto</span> 👋
          <br className="hidden sm:block" />
          Creative Tech & Design Freelancer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-5 max-w-2xl text-balance text-sm text-white/80 sm:text-lg"
        >
          I build smart systems, modern designs, and digital experiences for your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://www.fiverr.com/" target="_blank" rel="noreferrer"
            className="pointer-events-auto group inline-flex items-center gap-2 rounded-full bg-[#7B61FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(123,97,255,0.35)] transition hover:brightness-110"
          >
            Hire Me on Fiverr
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#projects"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            View My Projects
          </a>
        </motion.div>

        <div className="pointer-events-none mt-16 h-24 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md" />
      </div>
    </section>
  )
}

const Skill = ({ icon: Icon, label }) => (
  <div className="group relative">
    <div className="relative grid h-28 w-28 place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10">
      <Icon className="h-8 w-8 text-white drop-shadow-[0_4px_20px_rgba(0,230,255,0.5)]" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
    <div className="mt-2 text-center text-xs text-white/70">{label}</div>
  </div>
)

const About = () => {
  return (
    <section id="about" className="relative w-full bg-[#141735] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,230,255,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(123,97,255,0.15),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold"
        >
          About Me
        </motion.h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <p className="text-white/80">
              I’m a creative technologist who blends design and engineering to craft memorable digital products. My core strengths include building Java-based desktop apps, 3D web experiences, and content powered by AI.
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <Skill icon={Code2} label="Java / JavaFX" />
              <Skill icon={Figma} label="Figma / UI" />
              <Skill icon={Cube} label="Blender / 3D" />
              <Skill icon={Brain} label="AI Tools" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <h3 className="text-lg font-semibold">Experience Highlights</h3>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {[
                { year: '2022', text: 'Launched CashMATE: A smart finance desktop app.' },
                { year: '2023', text: 'Produced AI Art Animation series with >100k views.' },
                { year: '2024', text: 'Built multiple 3D web demos and brand showcases.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="min-w-[240px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4"
                >
                  <div className="text-[#00E6FF]">{item.year}</div>
                  <div className="mt-1 text-sm text-white/80">{item.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ title, tag }) => {
  const ref = useRef(null)
  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / -25
    const rotateY = (x - centerX) / 25
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }
  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group relative h-56 w-full cursor-pointer rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 text-white transition-transform duration-200 will-change-transform"
    >
      <div className="absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100" style={{ boxShadow: '0 0 60px rgba(0,230,255,0.25), inset 0 0 30px rgba(123,97,255,0.25)' }} />
      <div className="flex h-full flex-col justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/80 backdrop-blur-md">{tag}</div>
        <div className="text-xl font-semibold">{title}</div>
      </div>
    </div>
  )
}

const Portfolio = () => {
  return (
    <section id="projects" className="relative w-full bg-[#0f1226] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_20%,rgba(0,230,255,0.12),transparent),radial-gradient(600px_200px_at_80%_10%,rgba(123,97,255,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-white"
        >
          Featured Projects
        </motion.h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard title="CashMATE App" tag="JavaFX • Finance" />
          <ProjectCard title="AI Art Animation" tag="AI • Motion" />
          <ProjectCard title="Tayo-Style 3D Animation" tag="3D • Character" />
          <ProjectCard title="Portfolio 3D Website" tag="Three.js • Design" />
          <ProjectCard title="Brand Motion Pack" tag="Motion • Social" />
          <ProjectCard title="Interactive WebGL" tag="Web • Shader" />
        </div>
      </div>
    </section>
  )
}

const ServiceCard = ({ title, desc }) => (
  <motion.div
    whileInView={{ y: 0, opacity: 1 }}
    initial={{ y: 30, opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-md"
  >
    <div className="text-lg font-semibold">{title}</div>
    <div className="mt-2 text-sm text-white/80">{desc}</div>
  </motion.div>
)

const Services = () => (
  <section id="services" className="relative w-full bg-[#141735] py-24">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,230,255,0.1),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(123,97,255,0.12),transparent_40%)]" />
    <div className="relative mx-auto max-w-6xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold text-white"
      >
        Services
      </motion.h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ServiceCard title="UI/UX Design" desc="Clean, modern interfaces and prototypes in Figma." />
        <ServiceCard title="Java App Development" desc="Robust desktop apps with Java & JavaFX." />
        <ServiceCard title="3D Web Design" desc="Interactive WebGL experiences and 3D visuals." />
        <ServiceCard title="AI Video Creation" desc="Stylized animations and content using AI tools." />
      </div>
    </div>
  </section>
)

const Contact = () => {
  return (
    <section id="contact" className="relative w-full bg-[#0f1226] py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,230,255,0.25),transparent_60%)] p-[180px] opacity-60" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold"
        >
          Let’s Collaborate!
        </motion.h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <form className="grid gap-4">
              <div>
                <label className="text-xs text-white/70">Name</label>
                <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-0 focus:border-[#00E6FF]" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs text-white/70">Email</label>
                <input type="email" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#00E6FF]" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-xs text-white/70">Message</label>
                <textarea rows="4" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#00E6FF]" placeholder="Tell me about your project" />
              </div>
              <button type="button" className="inline-flex items-center justify-center rounded-xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(123,97,255,0.35)] transition hover:brightness-110">
                Send Message
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <div>
              <div className="text-lg font-semibold">Get in touch</div>
              <p className="mt-2 text-sm text-white/80">Open to freelance projects, collaborations, and creative experiments.</p>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#00E6FF]" /> hello@fajri.dev</div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#00E6FF]" /> +62 8xx xxxx xxxx</div>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <a href="https://www.fiverr.com/" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"><Globe className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"><Linkedin className="h-5 w-5" /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="w-full bg-[#0b0e20] py-6 text-center text-xs text-white/60">
    © {new Date().getFullYear()} Fajri Rahmanto — Crafted with love, code, and a bit of glow.
  </footer>
)

function App() {
  return (
    <div className="min-h-screen w-full scroll-smooth bg-[#1B1F3B]">
      <Nav />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
