import { getProjects } from '@/lib/data.server'
import ProjectsManager from './ProjectsManager'
import { PageHeader, ToastContainer } from '@/components/admin/AdminUI'

export default function ProjectsPage() {
  const projects = getProjects()
  return (
    <>
      <ToastContainer />
      <PageHeader title="Projects" desc="Create, edit, and reorder your featured work." />
      <ProjectsManager initialProjects={projects} />
    </>
  )
}
