import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Application } from './application'
import type { Repository } from './repository'

import moment from 'moment'

export type Token = Partial<
  RestEndpointMethodTypes['apps']['createInstallationToken']['response']['data']
>

export type Options = {
  value: string
  application: Application
  repositories: Repository[]
}

export function token(options: Options): Token {
  const { value, application, repositories } = options

  const expiry = moment().utc().add(1, 'hour').format()

  return {
    token: value,
    expires_at: expiry,
    permissions: application.permissions,
    repositories: repositories as any,
  }
}
