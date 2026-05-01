import { getUploads } from '@/lib/data.server'
import MediaManager from './MediaManager'
import { PageHeader, ToastContainer } from '@/components/admin/AdminUI'

export default function MediaPage() {
  const uploads = getUploads()
  return (
    <>
      <ToastContainer />
      <PageHeader title="Media Library" desc="Upload images — files replace existing ones with the same name." />
      <MediaManager initialFiles={uploads} />
    </>
  )
}
