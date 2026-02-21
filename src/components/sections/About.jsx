import { Download, MapPin, User } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import personal from '../../data/personal.json'

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <AnimatedSection className="lg:col-span-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 to-accent-400/20 rounded-2xl blur-xl" />
              <img
                src={personal.photo}
                alt={personal.name}
                className="relative w-full max-w-sm mx-auto rounded-2xl shadow-xl"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-3" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {personal.name}
            </h2>
            <p className="text-primary-500 font-medium mb-6">{personal.subtitle}</p>
            <ul className="space-y-3 mb-8">
              {[
                { icon: MapPin, label: 'From', value: personal.from },
                { icon: MapPin, label: 'Lives In', value: personal.livesIn },
                { icon: User, label: 'Age', value: personal.age },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <item.icon size={16} className="text-primary-500 shrink-0" />
                  <span>
                    <strong className="text-gray-900 dark:text-white">{item.label}:</strong> {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={personal.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-medium transition-all duration-300"
            >
              <Download size={18} />
              Download Resume
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
