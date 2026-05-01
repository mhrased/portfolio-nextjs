import { getSiteData, getHeroData } from '@/lib/data.server'
import ProfileForm from './ProfileForm'
import { PageHeader } from '@/components/admin/AdminUI'
import { ToastContainer } from '@/components/admin/AdminUI'

export default function ProfilePage() {
  const site = getSiteData()
  const hero = getHeroData()
  return (
    <>
      <ToastContainer />
      <PageHeader title="Profile" desc="Update your personal information, bio, and hero section." />
      <ProfileForm site={site} hero={hero} />
    </>
  )
}
