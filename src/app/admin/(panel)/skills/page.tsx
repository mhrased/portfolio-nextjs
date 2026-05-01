import { getSkills } from '@/lib/data.server'
import SkillsManager from './SkillsManager'
import { PageHeader, ToastContainer } from '@/components/admin/AdminUI'

export default function SkillsPage() {
  const skills = getSkills()
  return (
    <>
      <ToastContainer />
      <PageHeader title="Skills" desc="Manage your specializations and proficiency levels." />
      <SkillsManager initialSkills={skills} />
    </>
  )
}
