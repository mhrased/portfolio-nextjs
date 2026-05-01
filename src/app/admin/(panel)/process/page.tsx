import { getProcessData } from '@/lib/data.server'
import ProcessManager from './ProcessManager'
import { PageHeader, ToastContainer } from '@/components/admin/AdminUI'

export default function ProcessPage() {
  const process = getProcessData()
  return (
    <>
      <ToastContainer />
      <PageHeader title="Process & Stats" desc="Edit your workflow steps and homepage counter stats." />
      <ProcessManager initialData={process} />
    </>
  )
}
