import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import projects from '../../data/projects.json'

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <SectionHeading title="Projects" subtitle="Projects" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              url={project.url}
              image={project.image}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
