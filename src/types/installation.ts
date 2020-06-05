import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Application } from './application'
import type { Organization } from './organization'
import type { User } from './user'

export type Installation = Partial<
  RestEndpointMethodTypes['apps']['getInstallation']['response']['data']
> & {
  app_slug?: string
}

export type Options = {
  id: number
  application: Application
  account: Organization | User
}

export function installation(options: Options): Installation {
  const { id, application, account } = options

  const url =
    account.type === 'Organization'
      ? `https://github.com/organizations/${account.login}/settings/installations/${id}`
      : `https://github.com/settings/installations/${id}`

  return {
    id,
    account: account as any,
    repository_selection: 'selected',
    access_tokens_url: `https://api.github.com/app/installations/${id}/access_tokens`,
    repositories_url: 'https://api.github.com/installation/repositories',
    html_url: url,
    app_id: application.id,
    app_slug: application.slug,
    target_id: account.id,
    target_type: account.type,
    permissions: application.permissions as any,
    events: application.events,
  }
}
