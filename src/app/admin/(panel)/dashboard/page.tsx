import { getSiteData, getProjects, getSkills, getExperience } from '@/lib/data.server'
import { PageHeader, ToastContainer } from '@/components/admin/AdminUI'
import { StatCards, QuickLinks } from './DashboardClient'
import Link from 'next/link'

export default function DashboardPage() {
  const site = getSiteData()
  const projects = getProjects()
  const skills = getSkills()
  const experience = getExperience()

  const stats = [
    { label: 'Projects', value: projects.length, href: '/admin/projects', color: '#7359ff' },
    { label: 'Skills', value: skills.length, href: '/admin/skills', color: '#3399ff' },
    { label: 'Experience', value: experience.length, href: '/admin/experience', color: '#33d980' },
  ]

  const quickLinks = [
    { href: '/admin/profile', label: 'Edit Profile', desc: 'Update name, bio, contact info' },
    {
      href: '/admin/projects',
      label: 'Manage Projects',
      desc: `${projects.length} projects · add, edit, reorder`,
    },
    {
      href: '/admin/skills',
      label: 'Manage Skills',
      desc: `${skills.length} skills · update proficiency`,
    },
    {
      href: '/admin/experience',
      label: 'Timeline',
      desc: `${experience.length} entries · career history`,
    },
    { href: '/admin/process', label: 'Process & Stats', desc: 'Edit workflow steps and counters' },
    { href: '/admin/media', label: 'Media Library', desc: 'Upload and manage images' },
  ]

  return (
    <>
      <ToastContainer />
      <PageHeader title="Dashboard" desc={`Welcome back. Managing portfolio for ${site.name}.`} />

      <StatCards stats={stats} />

      <h2
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: '#8892a4',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        Quick Access
      </h2>
      <QuickLinks links={quickLinks} />

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: 13, color: '#4a5568' }}>
          View live portfolio at{' '}
          <Link href="/" target="_blank" style={{ color: '#7359ff', textDecoration: 'none' }}>
            localhost:3000 ↗
          </Link>
        </p>
      </div>
    </>
  )
}
