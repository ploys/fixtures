import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Application } from './application'
import type { Repository } from './repository'
import type { Commit } from './commit'

import moment from 'moment'

export type CheckSuite = Partial<
  RestEndpointMethodTypes['checks']['getSuite']['response']['data']
> & {
  created_at?: string
  updated_at?: string
}

export type Options = {
  id: number
  status: string
  conclusion?: string
  commit: Commit
  application: Application
  repository: Repository
  branch?: string
}

export function checkSuite(options: Options): CheckSuite {
  const { id, status, conclusion, commit, application, repository } = options

  const branch = options.branch || 'master'
  const repo = repository.full_name
  const now = moment().utc().format()

  return {
    id,
    node_id: Buffer.from(`010:CheckSuite${id}`).toString('base64'),
    head_branch: branch,
    head_sha: commit.sha,
    status,
    conclusion,
    url: `https://api.github.com/repos/${repo}/check-suites/${id}`,
    before: commit.parents![0].sha,
    after: commit.sha,
    pull_requests: [],
    app: application as any,
    created_at: now,
    updated_at: now,
  }
}
