import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Organization } from './organization'
import type { Repository } from './repository'
import type { User } from './user'

import * as crypto from 'crypto'

import moment from 'moment'

export type Commit = Partial<RestEndpointMethodTypes['repos']['getCommit']['response']['data']>

export type Options = {
  sha?: string
  repository: Repository
  committer: Organization | User
  author?: Organization | User
}

export function commit(options: Options): Commit {
  const { repository, committer } = options

  const author = options.author || committer
  const repo = repository.full_name
  const sha = options.sha || crypto.createHash('sha1').digest('hex')
  const ref = crypto.createHash('sha1').digest('hex')
  const now = moment().utc().format()

  return {
    sha,
    node_id: Buffer.from(`06:Commit${sha}`).toString('base64'),
    url: `https://api.github.com/repos/${repo}/commits/${sha}`,
    html_url: `https://github.com/${repo}/commit/${sha}`,
    comments_url: `https://api.github.com/repos/${repo}/commits/${sha}/comments`,
    commit: {
      url: `https://api.github.com/repos/${repo}/git/commits/${sha}`,
      author: {
        name: author.name || author.login!,
        email: 'user@example.com',
        date: now,
      },
      committer: {
        name: committer.name || committer.login!,
        email: 'user@example.com',
        date: now,
      },
      message: 'Commit',
      tree: {
        url: `https://api.github.com/repos/${repo}/tree/${sha}`,
        sha,
      },
      comment_count: 0,
      verification: {
        verified: false,
        reason: 'unsigned',
        signature: null as any,
        payload: null as any,
      },
    },
    author: author as any,
    committer: committer as any,
    parents: [
      {
        url: `https://api.github.com/repos/${repo}/commits/${sha}`,
        sha,
      },
    ],
    stats: {
      additions: 1,
      deletions: 0,
      total: 1,
    },
    files: [
      {
        filename: 'script.js',
        additions: 1,
        deletions: 0,
        changes: 1,
        status: 'modified',
        raw_url: `https://github.com/${repo}/raw/${ref}/script.js`,
        blob_url: `https://github.com/${repo}/blob/${ref}/script.js`,
        patch: '@@ -29,7 +29,7 @@\n.....',
      },
    ],
  }
}
