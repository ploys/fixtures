import type { Webhooks } from '@octokit/webhooks'
import type { Installation } from '../types/installation'
import type { Organization } from '../types/organization'
import type { Repository } from '../types/repository'
import type { User } from '../types/user'
import type { Commit } from '../types/commit'

export type Push = Omit<Webhooks.WebhookPayloadPush, 'head_commit'> & {
  head_commit: Webhooks.WebhookPayloadPush['commits'][0]
  organization: Organization
  installation: {
    id: number
    node_id: string
  }
}

export type Options = {
  branch: string
  commit: Commit
  repository: Repository
  installation: Installation
  pusher?: User
  sender?: User
}

export function push(options: Options): Push {
  const { branch, commit, repository, installation } = options

  const pusher = options.pusher || commit.committer
  const sender = options.sender || commit.committer

  const before = commit.parents![0].sha
  const after = commit.sha!
  const compare = `${before.substr(0, 12)}...${after.substr(0, 12)}`

  return {
    ref: `refs/heads/${branch}`,
    before,
    after,
    repository: repository as any,
    pusher: {
      name: pusher!.login!,
      email: 'user@example.com',
    },
    organization: repository.owner as any,
    sender: sender as any,
    installation: {
      id: installation.id!,
      node_id: Buffer.from(`023:IntegrationInstallation${installation.id}`).toString('base64'),
    },
    created: false,
    deleted: false,
    forced: false,
    base_ref: null,
    compare: `https://github.com/${repository.full_name}/compare/${compare}`,
    commits: [
      {
        id: commit.sha,
        tree_id: commit.commit!.tree.sha,
        distinct: true,
        message: commit.commit!.message,
        timestamp: commit.commit!.committer.date,
        url: commit.html_url,
        author: {
          name: commit.commit!.author.name,
          email: commit.commit!.author.email,
          username: commit.commit!.author.name,
        },
        committer: {
          name: commit.commit!.committer.name,
          email: commit.commit!.committer.email,
          username: commit.commit!.committer.name,
        },
        added: [],
        removed: [],
        modified: commit.files!.map(file => file.filename),
      },
    ],
    head_commit: {
      id: commit.sha,
      tree_id: commit.commit!.tree.sha,
      distinct: true,
      message: commit.commit!.message,
      timestamp: commit.commit!.committer.date,
      url: commit.html_url,
      author: {
        name: commit.commit!.author.name,
        email: commit.commit!.author.email,
        username: commit.commit!.author.name,
      },
      committer: {
        name: commit.commit!.committer.name,
        email: commit.commit!.committer.email,
        username: commit.commit!.committer.name,
      },
      added: [],
      removed: [],
      modified: commit.files!.map(file => file.filename),
    },
  }
}
