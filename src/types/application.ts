import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Organization } from './organization'
import type { User } from './user'

import moment from 'moment'

export type Application = Partial<RestEndpointMethodTypes['apps']['getBySlug']['response']['data']>

export type Options = {
  id: number
  name: string
  owner: Organization | User
  permissions: Record<string, string>
  events: string[]
}

export function application(options: Options): Application {
  const { id, name, owner, permissions, events } = options

  const slug = name.toLowerCase().replace(/[\W_-]+/g, '-')
  const now = moment().utc().format()

  return {
    id,
    name,
    slug,
    node_id: Buffer.from(`03:App${id}`).toString('base64'),
    owner: owner as any,
    description: 'An application',
    external_url: 'https://github.com',
    html_url: `https://github.com/apps/${slug}`,
    created_at: now,
    updated_at: now,
    permissions: permissions as any,
    events,
  }
}
