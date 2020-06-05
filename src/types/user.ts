import type { RestEndpointMethodTypes } from '@octokit/rest'

export type User = Partial<RestEndpointMethodTypes['users']['getByUsername']['response']['data']>

export type Options = {
  id: number
  name: string
}

export function user(options: Options): User {
  const { id, name } = options

  return {
    id,
    login: name,
    node_id: Buffer.from(`04:User${id}`).toString('base64'),
    avatar_url: `https://avatars0.githubusercontent.com/u/${id}?v=4`,
    gravatar_id: '',
    url: `https://api.github.com/users/${name}`,
    html_url: `https://github.com/${name}`,
    followers_url: `https://api.github.com/users/${name}/followers`,
    following_url: `https://api.github.com/users/${name}/following{/other_user}`,
    gists_url: `https://api.github.com/users/${name}/gists{/gist_id}`,
    starred_url: `https://api.github.com/users/${name}/starred{/owner}{/repo}`,
    subscriptions_url: `https://api.github.com/users/${name}/subscriptions`,
    organizations_url: `https://api.github.com/users/${name}/orgs`,
    repos_url: `https://api.github.com/users/${name}/repos`,
    events_url: `https://api.github.com/users/${name}/events{/privacy}`,
    received_events_url: `https://api.github.com/users/${name}/received_events`,
    type: 'User',
    site_admin: false,
  }
}
