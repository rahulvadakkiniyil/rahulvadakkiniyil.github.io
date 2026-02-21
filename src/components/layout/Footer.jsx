import { Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import personal from '../../data/personal.json'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Contact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <MapPin className="mx-auto mb-3 text-primary-500" size={24} />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Where to find me</p>
            <p className="font-medium text-gray-900 dark:text-white">{personal.address}</p>
          </div>
          <div className="text-center">
            <Linkedin className="mx-auto mb-3 text-primary-500" size={24} />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Follow me</p>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-500 hover:text-primary-600 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="text-center">
            <Mail className="mx-auto mb-3 text-primary-500" size={24} />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Contact me</p>
            <p className="font-medium text-gray-900 dark:text-white">{personal.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{personal.phone}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
