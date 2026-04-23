export const PIPELINE_NODES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    label: 'Step 01', title: 'Code',        tools: 'git · VSCode',       active: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2l10 5-10 5-10-5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    label: 'Step 02', title: 'Build',       tools: 'Vite · Webpack',     active: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    label: 'Step 03', title: 'Test',        tools: 'Jest · Playwright',  active: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M8 10h8M8 14h5" /></svg>,
    label: 'Step 04', title: 'Containerize',tools: 'Docker · k8s',       active: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
    label: 'Step 05', title: 'Deploy',      tools: 'AWS · Terraform',    active: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    label: 'Step 06', title: 'Monitor',     tools: 'Datadog · Sentry',   active: false,
  },
]

export const TERM_SCRIPT = [
  { t: '$ git push origin main',                                   cls: 'prompt' },
  { t: 'Writing objects: 100% (25/25), 4.82 KiB/s, done.',        cls: 'dim'    },
  { t: '✓ Pushed to origin/main',                                  cls: 'ok'     },
  { t: '',                                                          cls: ''       },
  { t: '$ gh workflow run deploy.yml',                             cls: 'prompt' },
  { t: '▸ Run #1247 · pipeline started',                           cls: 'info'   },
  { t: '✓ lint         passed   12s',                              cls: 'ok'     },
  { t: '✓ test         passed   1m 04s (284/284)',                 cls: 'ok'     },
  { t: '✓ build        passed   48s   bundle 2.4MB',               cls: 'ok'     },
  { t: '✓ docker push  passed   22s   ghcr.io/rasel/app:a4f9c21', cls: 'ok'     },
  { t: '✓ terraform    applied  31s',                              cls: 'ok'     },
  { t: '✓ deploy aws   running  → healthy on us-east-1',          cls: 'ok'     },
  { t: '',                                                          cls: ''       },
  { t: '● Deployed: https://app.live.example.com',                 cls: 'info'   },
] as const
