import { callingCountries } from 'country-data'
import { createHash } from 'crypto'
import * as uuid from 'uuid/v4'

interface ISaltedHash {
  hash: string
  salt: string
}

export function generateRandomPassword(demoUser?: boolean) {
  if (!!demoUser) {
    return 'test'
  }

  const length = 6
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  let randomPassword = ''
  for (let i = 0; i < length; i += 1) {
    // tslint:disable-next-line
    randomPassword += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return randomPassword
}

export function generateHash(content: string, salt: string): string {
  const hash = createHash('sha512')
  hash.update(salt)
  hash.update(content)
  return hash.digest('hex')
}

export function generateSaltedHash(password: string): ISaltedHash {
  const salt = uuid()
  return {
    hash: generateHash(password, salt),
    salt
  }
}

export const convertToMSISDN = (phone: string, countryAlpha3: string) => {
  const countryCode =
    callingCountries[countryAlpha3.toUpperCase()].countryCallingCodes[0]
  return phone.startsWith(countryCode)
    ? phone
    : phone.startsWith('0')
    ? `${countryCode}${phone.substring(1)}`
    : `${countryCode}${phone}`
}