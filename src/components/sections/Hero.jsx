import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import personal from '../../data/personal.json'

const roles = ['DevOps Engineer', 'Cloud Engineer', 'AWS Specialist']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.slice(0, text.length + 1))
          if (text.length + 1 === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setText(currentRole.slice(0, text.length - 1))
          if (text.length === 0) {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )
    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${personal.heroBackground})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-300 text-lg mb-4"
        >
          Welcome
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-light text-white mb-6"
        >
          I&apos;m <span className="font-bold text-primary-400">{personal.firstName}</span>{' '}
          {personal.lastName}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block"
        >
          <span className="px-6 py-2 bg-primary-500 text-white rounded-full text-lg font-semibold">
            {text}
            <span className="typing-cursor" />
          </span>
        </motion.div>
      </div>
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  )
}
