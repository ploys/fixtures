import type { RestEndpointMethodTypes } from '@octokit/rest'

export type Organization = Partial<RestEndpointMethodTypes['orgs']['get']['response']['data']>

export type Options = {
  id: number
  name: string
}

/**
 * Creates a mock organization.
 *
 * @param options - The organization options.
 *
 * @returns The mock organization.
 */
export function organization(options: Options): Organization {
  const { id, name } = options

  return {
    id,
    name,
    login: name,
    node_id: Buffer.from(`012:Organization${id}`).toString('base64'),
    url: `https://api.github.com/orgs/${name}`,
    repos_url: `https://api.github.com/orgs/${name}/repos`,
    events_url: `https://api.github.com/orgs/${name}/events`,
    hooks_url: `https://api.github.com/orgs/${name}/hooks`,
    issues_url: `https://api.github.com/orgs/${name}/issues`,
    members_url: `https://api.github.com/orgs/${name}/members{/member}`,
    public_members_url: `https://api.github.com/orgs/${name}/public_members{/member}`,
    avatar_url: `https://avatars3.githubusercontent.com/u/${id}?v=4`,
    description: 'An organization',
    type: 'Organization',
  }
}
