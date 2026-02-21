import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import personal from '../../data/personal.json'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-lg font-bold text-white"
          >
            <span className={scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}>
              {personal.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#/blog"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                scrolled
                  ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Blog
            </a>
            <ThemeToggle />
            <a
              href={personal.resumeUrl}
              download
              className="ml-2 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Blog
            </a>
            <a
              href={personal.resumeUrl}
              download
              className="mt-2 mx-3 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
