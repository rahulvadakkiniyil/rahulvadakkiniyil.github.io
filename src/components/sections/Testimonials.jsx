import SectionHeading from '../ui/SectionHeading'
import TestimonialCard from '../ui/TestimonialCard'
import testimonials from '../../data/testimonials.json'

export default function Testimonials() {
  if (testimonials.length === 1 && testimonials[0].name === 'Coming Soon') {
    return null
  }

  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <SectionHeading title="Testimonials" subtitle="What people say" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              role={t.role}
              text={t.text}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
