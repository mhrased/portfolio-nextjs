import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0b0f1a',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
    }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        minWidth: 0,
        padding: '32px',
        overflowY: 'auto',
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  )
}
