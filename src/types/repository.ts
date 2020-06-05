import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Organization } from './organization'
import type { User } from './user'

import moment from 'moment'

export type Repository = Partial<RestEndpointMethodTypes['repos']['get']['response']['data']>

export type Options = {
  id: number
  name: string
  owner: Organization | User
}

export function repository(options: Options): Repository {
  const { id, name, owner } = options

  const repo = `${owner.login}/${name}`
  const now = moment().utc().format()

  return {
    id,
    node_id: Buffer.from(`010:Repository${id}`).toString('base64'),
    name,
    full_name: repo,
    private: false,
    owner: owner as any,
    html_url: `https://github.com/${repo}`,
    description: 'A repository',
    fork: false,
    url: `https://github.com/${repo}`,
    forks_url: `https://api.github.com/repos/${repo}/forks`,
    keys_url: `https://api.github.com/repos/${repo}/keys{/key_id}`,
    collaborators_url: `https://api.github.com/repos/${repo}/collaborators{/collaborator}`,
    teams_url: `https://api.github.com/repos/${repo}/teams`,
    hooks_url: `https://api.github.com/repos/${repo}/hooks`,
    issue_events_url: `https://api.github.com/repos/${repo}/issues/events{/number}`,
    events_url: `https://api.github.com/repos/${repo}/events`,
    assignees_url: `https://api.github.com/repos/${repo}/assignees{/user}`,
    branches_url: `https://api.github.com/repos/${repo}/branches{/branch}`,
    tags_url: `https://api.github.com/repos/${repo}/tags`,
    blobs_url: `https://api.github.com/repos/${repo}/git/blobs{/sha}`,
    git_tags_url: `https://api.github.com/repos/${repo}/git/tags{/sha}`,
    git_refs_url: `https://api.github.com/repos/${repo}/git/refs{/sha}`,
    trees_url: `https://api.github.com/repos/${repo}/git/trees{/sha}`,
    statuses_url: `https://api.github.com/repos/${repo}/statuses/{sha}`,
    languages_url: `https://api.github.com/repos/${repo}/languages`,
    stargazers_url: `https://api.github.com/repos/${repo}/stargazers`,
    contributors_url: `https://api.github.com/repos/${repo}/contributors`,
    subscribers_url: `https://api.github.com/repos/${repo}/subscribers`,
    subscription_url: `https://api.github.com/repos/${repo}/subscription`,
    commits_url: `https://api.github.com/repos/${repo}/commits{/sha}`,
    git_commits_url: `https://api.github.com/repos/${repo}/git/commits{/sha}`,
    comments_url: `https://api.github.com/repos/${repo}/comments{/number}`,
    issue_comment_url: `https://api.github.com/repos/${repo}/issues/comments{/number}`,
    contents_url: `https://api.github.com/repos/${repo}/contents/{+path}`,
    compare_url: `https://api.github.com/repos/${repo}/compare/{base}...{head}`,
    merges_url: `https://api.github.com/repos/${repo}/merges`,
    archive_url: `https://api.github.com/repos/${repo}/{archive_format}{/ref}`,
    downloads_url: `https://api.github.com/repos/${repo}/downloads`,
    issues_url: `https://api.github.com/repos/${repo}/issues{/number}`,
    pulls_url: `https://api.github.com/repos/${repo}/pulls{/number}`,
    milestones_url: `https://api.github.com/repos/${repo}/milestones{/number}`,
    notifications_url: `https://api.github.com/repos/${repo}/notifications{?since,all,participating}`,
    labels_url: `https://api.github.com/repos/${repo}/labels{/name}`,
    releases_url: `https://api.github.com/repos/${repo}/releases{/id}`,
    deployments_url: `https://api.github.com/repos/${repo}/deployments`,
    created_at: now,
    updated_at: now,
    pushed_at: now,
    git_url: `git://github.com/${repo}.git`,
    ssh_url: `git@github.com:${repo}.git`,
    clone_url: `https://github.com/${repo}.git`,
    svn_url: `https://github.com/${repo}`,
    size: 50,
    stargazers_count: 0,
    watchers_count: 0,
    language: 'JavaScript',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 0,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    default_branch: 'master',
  }
}
