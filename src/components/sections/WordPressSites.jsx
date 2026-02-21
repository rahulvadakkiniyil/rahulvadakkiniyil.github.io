import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import wordpress from '../../data/wordpress.json'

export default function WordPressSites() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionHeading title="WordPress Sites" subtitle="WordPress" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wordpress.map((site, i) => (
            <ProjectCard
              key={site.name}
              name={site.name}
              url={site.url}
              image={site.image}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
