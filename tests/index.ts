import * as fixtures from '../src'

describe('fixtures', () => {
  test('application', () => {
    const owner = fixtures.user({ id: 1, name: 'github' })
    const app = fixtures.application({
      id: 1,
      name: 'Hello world',
      owner,
      permissions: {
        metadata: 'read',
      },
      events: ['push'],
    })

    expect(app).toMatchObject({ id: 1, name: 'Hello world', slug: 'hello-world' })
  })

  test('check-run', () => {
    const user = fixtures.user({ id: 1, name: 'github' })
    const repo = fixtures.repository({ id: 1, name: 'hello', owner: user })
    const commit = fixtures.commit({ repository: repo, committer: user })
    const app = fixtures.application({
      id: 1,
      name: 'Hello world',
      owner: user,
      permissions: {
        metadata: 'read',
      },
      events: ['push'],
    })
    const checkSuite = fixtures.checkSuite({
      id: 1,
      status: 'completed',
      conclusion: 'success',
      commit,
      application: app,
      repository: repo,
      branch: 'custom',
    })
    const checkRun = fixtures.checkRun({
      id: 1,
      name: 'test',
      repository: repo,
      suite: checkSuite,
      output: { title: 'Test', summary: 'Testing' },
      status: 'completed',
      conclusion: 'success',
      external: 'other',
    })

    expect(checkRun).toMatchObject({ id: 1, status: 'completed', conclusion: 'success' })
  })

  test('check-suite', () => {
    const user = fixtures.user({ id: 1, name: 'github' })
    const repo = fixtures.repository({ id: 1, name: 'hello', owner: user })
    const commit = fixtures.commit({ repository: repo, committer: user })
    const app = fixtures.application({
      id: 1,
      name: 'Hello world',
      owner: user,
      permissions: {
        metadata: 'read',
      },
      events: ['push'],
    })
    const checkSuite = fixtures.checkSuite({
      id: 1,
      status: 'completed',
      conclusion: 'success',
      commit,
      application: app,
      repository: repo,
      branch: 'custom',
    })

    expect(checkSuite).toMatchObject({ id: 1, status: 'completed', conclusion: 'success' })
  })

  test('commit', () => {
    const user = fixtures.user({ id: 1, name: 'github' })
    const repo = fixtures.repository({ id: 1, name: 'hello', owner: user })
    const config = fixtures.config({
      ref: 'master',
      path: '.github/my-config.yml',
      data: { key: 'val' },
      repository: repo,
    })

    expect(config).toMatchObject({ name: 'my-config.yml', path: '.github/my-config.yml' })
    expect(fixtures.decode(config.content!)).toMatchObject({ key: 'val' })
  })

  test('config', () => {
    const user = fixtures.user({ id: 1, name: 'github' })
    const repo = fixtures.repository({ id: 1, name: 'hello', owner: user })
    const commit = fixtures.commit({ repository: repo, committer: user })

    expect(commit).toMatchObject({ committer: user, author: user })
  })

  test('installation', () => {
    const owner = fixtures.user({ id: 1, name: 'github' })
    const app = fixtures.application({
      id: 1,
      name: 'Hello world',
      owner,
      permissions: {
        metadata: 'read',
      },
      events: ['push'],
    })
    const inst = fixtures.installation({ id: 1, application: app, account: owner })

    expect(inst).toMatchObject({ id: 1, account: owner })
  })

  test('organization', () => {
    const org = fixtures.organization({ id: 1, name: 'github' })

    expect(org).toMatchObject({ id: 1, name: 'github', login: 'github' })
  })

  test('repository', () => {
    const owner = fixtures.user({ id: 1, name: 'github' })
    const repo = fixtures.repository({ id: 1, name: 'hello', owner })

    expect(repo).toMatchObject({ id: 1, name: 'hello', owner, full_name: 'github/hello' })
  })

  test('token', () => {
    const owner = fixtures.user({ id: 1, name: 'github' })
    const repo = fixtures.repository({ id: 1, name: 'hello-world', owner })
    const app = fixtures.application({
      id: 1,
      name: 'Hello world',
      owner,
      permissions: {
        metadata: 'read',
      },
      events: ['push'],
    })
    const token = fixtures.token({ value: 'test', application: app, repositories: [repo] })

    expect(token).toMatchObject({ token: 'test', repositories: [repo] })
  })

  test('user', () => {
    const user = fixtures.user({ id: 1, name: 'github' })

    expect(user).toMatchObject({ id: 1, login: 'github' })
  })

  test('private-key', async () => {
    const key = await fixtures.privateKey()

    expect(typeof key).toBe('string')
    expect(key).toMatch('-----BEGIN PRIVATE KEY-----')
    expect(key).toMatch('-----END PRIVATE KEY-----')
  })
})
