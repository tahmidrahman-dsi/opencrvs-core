import fetch from 'node-fetch'
import {
  USER_MANAGEMENT_URL,
  CERT_PRIVATE_KEY_PATH,
  CERT_PUBLIC_KEY_PATH,
  CONFIG_TOKEN_EXPIRY_SECONDS
} from 'src/constants'
import { resolve } from 'url'
import { readFileSync } from 'fs'
import { promisify } from 'util'
import * as jwt from 'jsonwebtoken'
import { get, set } from 'src/database'
import * as t from 'io-ts'
import { identity } from 'fp-ts/lib/function'

const cert = readFileSync(CERT_PRIVATE_KEY_PATH)
const publicCert = readFileSync(CERT_PUBLIC_KEY_PATH)

const sign = promisify(jwt.sign) as (
  payload: string | Buffer | object,
  secretOrPrivateKey: jwt.Secret,
  options?: jwt.SignOptions
) => Promise<string>

export interface IAuthentication {
  mobile: string
  userId: string
  roles: string[]
}

export class UserInfoNotFoundError extends Error {}

export function isUserInfoNotFoundError(err: Error) {
  return err instanceof UserInfoNotFoundError
}

export async function authenticate(
  mobile: string,
  password: string
): Promise<IAuthentication> {
  const url = resolve(USER_MANAGEMENT_URL, '/verifyPassword')

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ mobile, password })
  })

  if (res.status !== 200) {
    throw Error(res.statusText)
  }

  const body = await res.json()
  return {
    userId: body.id,
    roles: body.roles,
    mobile
  }
}

export async function createToken(
  userId: string,
  roles: string[],
  audience: string[]
): Promise<string> {
  return sign({ roles }, cert, {
    subject: userId,
    algorithm: 'RS256',
    expiresIn: CONFIG_TOKEN_EXPIRY_SECONDS,
    audience
  })
}

export function getTokenAudience(roles: string[]) {
  return ['user-management']
}

export async function storeUserInformation(
  nonce: string,
  userId: string,
  roles: string[],
  mobile: string
) {
  return set(
    `user_information_${nonce}`,
    JSON.stringify({ userId, roles, mobile })
  )
}

export async function getStoredUserInformation(nonce: string) {
  const record = await get(`user_information_${nonce}`)
  if (record === null) {
    throw new UserInfoNotFoundError('user not found')
  }
  return JSON.parse(record)
}

const TokenPayload = t.type({
  sub: t.string,
  role: t.string,
  iat: t.number,
  exp: t.number,
  aud: t.array(t.string)
})

export type ITokenPayload = t.TypeOf<typeof TokenPayload>

export function verifyToken(token: string): ITokenPayload {
  const decoded = jwt.verify(token, publicCert, {
    issuer: ''
  })

  return TokenPayload.decode(decoded).fold(err => {
    throw err
  }, identity)
}
