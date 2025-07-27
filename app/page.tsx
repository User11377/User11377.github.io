'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink,
  Code,
  Database,
  Brain,
  Cpu,
  Globe,
  Monitor,
  Smartphone,
  Server,
  ChevronDown,
  Star,
  Calendar,
  MapPin,
  Award
} from 'lucide-react'

const skills = [
  { name: 'JavaScript/TypeScript', level: 90, icon: Code },
  { name: 'React/Next.js', level: 85, icon: Monitor },
  { name: 'Python', level: 88, icon: Cpu },
  { name: 'Java', level: 82, icon: Code },
  { name: 'SQL/Databases', level: 80, icon: Database },
  { name: 'AI/ML', level: 75, icon: Brain },
  { name: 'PyQt6', level: 85, icon: Smartphone },
  { name: 'Web Development', level: 90, icon: Globe },
]

const projects = [
  {
    title: 'SmartScale',
    description: 'Intelligente Waage mit Webinterface für Rezeptmanagement',
    tech: ['React', 'Node.js', 'SQLite', 'Hardware Integration'],
    status: 'In Entwicklung',
    color: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Passwort Manager',
    description: 'Sicherer Passwortmanager mit Verschlüsselung',
    tech: ['Python', 'PyQt6', 'SQLite', 'Kryptographie'],
    status: 'Abgeschlossen',
    color: 'from-green-500 to-teal-600'
  },
  {
    title: 'Piano Learner',
    description: 'Interaktive Piano-Lern-App mit AI-Features',
    tech: ['React', 'TypeScript', 'Web Audio API', 'AI'],
    status: 'Beta',
    color: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Learn App',
    description: 'KI-gestützte Lernplattform mit Karteikarten',
    tech: ['Python', 'Ollama', 'HTML/CSS', 'JavaScript'],
    status: 'Abgeschlossen',
    color: 'from-orange-500 to-red-600'
  }
]

const experiences = [
  {
    title: 'Praktikant',
    company: 'KEBA AG',
    location: 'Linz, Österreich',
    period: '2024 - Aktuell',
    description: 'Automatisierungslösungen und Softwareentwicklung'
  },
  {
    title: 'Schüler',
    company: 'HTL Perg',
    location: 'Perg, Österreich',
    period: '2022 - 2026',
    description: 'Höhere Abteilung für Informatik, 3. Klasse'
  }
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollY = window.scrollY
      
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold gradient-text"
            >
              JM
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'Über mich', 'Skills', 'Projekte', 'Erfahrung', 'Kontakt'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['home', 'about', 'skills', 'projects', 'experience', 'contact'][index])}
                  className={`transition-colors duration-300 hover:text-primary-400 ${
                    activeSection === ['home', 'about', 'skills', 'projects', 'experience', 'contact'][index]
                      ? 'text-primary-400'
                      : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-purple-900/20"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <img
              src="/images/profilePicture_croped.jpg"
              alt="Johannes Mayer"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary-500 shadow-2xl animate-float"
            />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Johannes Mayer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Leidenschaftlicher <span className="text-primary-400">Full Stack Developer</span> und 
            <span className="text-primary-400"> KI-Enthusiast</span> an der HTL Perg
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Projekte ansehen
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Kontakt aufnehmen
            </button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/User11377" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="mailto:johannesmayer4230@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Mail size={24} />
            </a>
            <a href="tel:+4366499390801" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Phone size={24} />
            </a>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-primary-400" size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Über mich</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Hallo! Ich bin <span className="text-primary-400 font-semibold">Johannes Mayer</span>, 
                17 Jahre alt und Schüler der HTL Perg in der 3. Klasse der Höheren Abteilung für Informatik.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Meine Leidenschaft gilt der <span className="text-primary-400">modernen Softwareentwicklung</span> 
                und <span className="text-primary-400">Künstlichen Intelligenz</span>. Ich liebe es, komplexe 
                Probleme zu lösen und innovative Lösungen zu entwickeln.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Derzeit bin ich als <span className="text-primary-400">Praktikant bei KEBA AG</span> tätig, 
                wo ich wertvolle Erfahrungen in der professionellen Softwareentwicklung sammle.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4 flex items-center">
                  <Award className="mr-2" size={20} />
                  Aktueller Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-300">HTL Perg, 3. Klasse</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-300">Praktikant bei KEBA AG</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">Interessen</h3>
                <div className="flex flex-wrap gap-2">
                  {['KI & Machine Learning', 'Web Development', 'Mobile Apps', 'IoT', 'Automatisierung'].map((interest) => (
                    <span key={interest} className="bg-primary-900/30 text-primary-300 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Skills & Technologien</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <skill.icon className="text-primary-400 mr-3" size={24} />
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full"
                  ></motion.div>
                </div>
                
                <span className="text-sm text-gray-400">{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Meine Projekte</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="project-card glass-effect rounded-xl p-6 group"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${project.color} rounded-t-xl mb-6`}></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Abgeschlossen' 
                      ? 'bg-green-900/30 text-green-400' 
                      : project.status === 'Beta'
                      ? 'bg-orange-900/30 text-orange-400'
                      : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="bg-dark-700 text-gray-300 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <button className="text-primary-400 hover:text-primary-300 font-semibold flex items-center">
                    Mehr erfahren
                    <ExternalLink size={16} className="ml-1" />
                  </button>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                      <Github size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Erfahrung</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-center mb-12"
              >
                <div className="flex-1">
                  <div className="glass-effect rounded-xl p-6">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <span className="ml-3 text-primary-400 font-semibold">{exp.period}</span>
                    </div>
                    <p className="text-primary-400 font-semibold mb-2">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {exp.location}
                    </p>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Kontakt</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Lassen Sie uns zusammenarbeiten!</h3>
                <p className="text-gray-300 leading-relaxed">
                  Ich bin immer offen für neue Möglichkeiten und spannende Projekte. 
                  Kontaktieren Sie mich gerne für Praktika, Freelance-Projekte oder einfach für einen Austausch über Technologie.
                </p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:johannesmayer4230@gmail.com"
                  className="flex items-center p-4 glass-effect rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <Mail className="text-primary-400 mr-4 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="font-semibold text-white">E-Mail</p>
                    <p className="text-gray-400">johannesmayer4230@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+4366499390801"
                  className="flex items-center p-4 glass-effect rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <Phone className="text-primary-400 mr-4 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="font-semibold text-white">Telefon</p>
                    <p className="text-gray-400">+43 664 99390801</p>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/User11377"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 glass-effect rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <Github className="text-primary-400 mr-4 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="font-semibold text-white">GitHub</p>
                    <p className="text-gray-400">github.com/User11377</p>
                  </div>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Schnellkontakt</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">E-Mail</label>
                  <input 
                    type="email" 
                    className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="ihre@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Nachricht</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors resize-none"
                    placeholder="Ihre Nachricht..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Nachricht senden
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Johannes Mayer. Alle Rechte vorbehalten.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Entwickelt mit ❤️ und Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
