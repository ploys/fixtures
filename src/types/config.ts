import type { RestEndpointMethodTypes } from '@octokit/rest'
import type { Repository } from './repository'

import { createHash } from 'crypto'
import { basename } from 'path'
import { safeDump, safeLoad } from 'js-yaml'

export function encode(input: Record<string, any>): [string, number] {
  const buffer = Buffer.from(safeDump(input))

  return [buffer.toString('base64'), buffer.byteLength]
}

export function decode(input: string): Record<string, any> {
  const buffer = Buffer.from(input, 'base64')
  const data = safeLoad(buffer.toString())

  return data
}

export type Config = Partial<RestEndpointMethodTypes['repos']['getContents']['response']['data']>

export type Options = {
  ref: string
  path: string
  data: Record<string, any>
  repository: Repository
}

export function config(options: Options): Config {
  const { ref, path, data, repository } = options

  const repo = repository.full_name
  const sha = createHash('sha1').digest('hex')
  const [content, size] = encode(data)

  return {
    name: basename(path),
    path,
    sha,
    size,
    url: `https://api.github.com/repos/${repo}/contents/${path}?ref=${ref}`,
    html_url: `https://github.com/${repo}/blob/${ref}/${path}`,
    git_url: `https://api.github.com/repos/${repo}/git/blobs/${sha}`,
    download_url: `https://raw.githubusercontent.com/${repo}/${ref}/${path}?token=token`,
    type: 'file',
    content,
    encoding: 'base64',
    _links: {
      self: `https://api.github.com/repos/${repo}/contents/${path}?ref=${ref}`,
      git: `https://api.github.com/repos/${repo}/git/blobs/${sha}`,
      html: `https://github.com/${repo}/blob/${ref}/${path}`,
    },
  }
}
