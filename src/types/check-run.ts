import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Repository } from './repository'
import type { CheckSuite } from './check-suite'

import moment from 'moment'

export type CheckRun = Partial<RestEndpointMethodTypes['checks']['get']['response']['data']>

export type Options = {
  id: number
  name: string
  repository: Repository
  suite: CheckSuite
  output: Output
  status: string
  conclusion?: string
  external?: string
}

export type Output = {
  title: string
  summary: string
  text?: string
}

export function checkRun(options: Options): CheckRun {
  const { id, name, repository, suite, output, status, conclusion } = options

  const repo = repository.full_name
  const now = moment().utc().format()

  return {
    id,
    name,
    node_id: Buffer.from(`03:CheckRun${id}`).toString('base64'),
    head_sha: suite.head_sha,
    external_id: options.external,
    url: `https://api.github.com/repos/${repo}/check-runs/${id}`,
    html_url: `https://github.com/${repo}/runs/${id}`,
    details_url: 'https://github.com',
    status,
    conclusion,
    started_at: now,
    completed_at: now,
    output: {
      ...(output as any),
      annotations_count: 0,
      annotations_url: `https://api.github.com/repos/${repo}/check-runs/${id}/annotations`,
    },
    check_suite: suite as any,
    app: suite.app as any,
    pull_requests: [],
  }
}
