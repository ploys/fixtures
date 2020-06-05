import * as crypto from 'crypto'

/**
 * Creates a new private key.
 *
 * @returns The promised private key.
 */
export function privateKey(): Promise<string> {
  const options: crypto.RSAKeyPairOptions<'pem', 'pem'> = {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  }

  return new Promise(resolve => {
    crypto.generateKeyPair('rsa', options, (_, __, key) => resolve(key))
  })
}
