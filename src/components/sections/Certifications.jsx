import SectionHeading from '../ui/SectionHeading'
import CertificationCard from '../ui/CertificationCard'
import certifications from '../../data/certifications.json'

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionHeading title="Certifications" subtitle="Certification" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <CertificationCard
              key={cert.title}
              title={cert.title}
              image={cert.image}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
