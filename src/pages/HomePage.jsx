import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Education from '../components/sections/Education'
import Experience from '../components/sections/Experience'
import Certifications from '../components/sections/Certifications'
import Projects from '../components/sections/Projects'
import WordPressSites from '../components/sections/WordPressSites'
import Testimonials from '../components/sections/Testimonials'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <section id="experience" className="section-padding bg-white dark:bg-gray-950">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12">
              <Education />
              <Experience />
            </div>
          </div>
        </section>
        <Certifications />
        <Projects />
        <WordPressSites />
        <Testimonials />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
