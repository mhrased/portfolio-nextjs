import { getExperience } from '@/lib/data.server'
import ExperienceManager from './ExperienceManager'
import { PageHeader, ToastContainer } from '@/components/admin/AdminUI'

export default function ExperiencePage() {
  const experience = getExperience()
  return (
    <>
      <ToastContainer />
      <PageHeader title="Experience" desc="Manage your career timeline entries." />
      <ExperienceManager initialItems={experience} />
    </>
  )
}
