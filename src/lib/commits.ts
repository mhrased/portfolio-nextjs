export type CommitEntry = {
  hash: string
  msg: string
  plus: string
  minus: string | null
  pos: Record<string, string>
  delay: string
}

const POSITIONS: Record<string, string>[] = [
  { top: '12%', left: '6%' },
  { top: '24%', right: '7%' },
  { bottom: '18%', right: '5%' },
]
const DELAYS = ['', '2s', '1s']

const FALLBACK: CommitEntry[] = [
  {
    hash: 'a4f9c21',
    msg: 'feat(api): rate limit',
    plus: '+42',
    minus: null,
    pos: POSITIONS[0],
    delay: DELAYS[0],
  },
  {
    hash: 'b8e3117',
    msg: 'fix(auth): refresh token',
    plus: '+18',
    minus: '-6',
    pos: POSITIONS[1],
    delay: DELAYS[1],
  },
  {
    hash: 'd1f5b39',
    msg: 'refactor: db layer',
    plus: '+86',
    minus: '-120',
    pos: POSITIONS[2],
    delay: DELAYS[2],
  },
]

function truncate(msg: string, max = 100): string {
  return msg.length > max ? msg.slice(0, max - 1) + '…' : msg
}

export async function getLatestCommits(): Promise<CommitEntry[]> {
  const owner = process.env.GITHUB_REPO_OWNER
  const repo = process.env.GITHUB_REPO_NAME

  if (!owner || !repo) return FALLBACK

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const listRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=3`,
      { headers, next: { revalidate: 60 * 60 * 24 * 7 } },
    )
    if (!listRes.ok) return FALLBACK

    const list = (await listRes.json()) as Array<{
      sha: string
      commit: { message: string }
    }>

    const commits = await Promise.all(
      list.slice(0, 3).map(async (item, i) => {
        const detailRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits/${item.sha}`,
          { headers, next: { revalidate: 60 * 60 * 24 * 7 } },
        )
        const detail = detailRes.ok
          ? ((await detailRes.json()) as { stats?: { additions: number; deletions: number } })
          : {}

        const additions = detail.stats?.additions ?? 0
        const deletions = detail.stats?.deletions ?? 0

        return {
          hash: item.sha.slice(0, 7),
          msg: truncate(item.commit.message.split('\n')[0]),
          plus: `+${additions}`,
          minus: deletions > 0 ? `-${deletions}` : null,
          pos: POSITIONS[i],
          delay: DELAYS[i],
        } satisfies CommitEntry
      }),
    )

    return commits
  } catch {
    return FALLBACK
  }
}
