/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import { resolvers } from '@gateway/features/user/root-resolvers'
import * as fetchAny from 'jest-fetch-mock'
import * as jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'

const fetch = fetchAny as any

beforeEach(() => {
  fetch.resetMocks()
})

describe('User root resolvers', () => {
  describe('getUser()', () => {
    it('returns a user object', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          _id: 'ba7022f0ff4822',
          name: [
            {
              use: 'en',
              given: ['Sakib Al'],
              family: ['Hasan']
            }
          ],
          username: 'sakibal.hasan',
          mobile: '+8801711111111',
          email: 'test@test.org',
          passwordHash:
            'b8be6cae5215c93784b1b9e2c06384910f754b1d66c077f1f8fdc98fbd92e6c17a0fdc790b30225986cadb9553e87a47b1d2eb7bd986f96f0da7873e1b2ddf9c',
          salt: '12345',
          role: 'FIELD_AGENT',
          status: 'active',
          practitionerId: 'dcba7022-f0ff-4822-b5d9-cb90d0e7b8de',
          primaryOfficeId: '79776844-b606-40e9-8358-7d82147f702a',
          catchmentAreaIds: [
            'b21ce04e-7ccd-4d65-929f-453bc193a736',
            '95754572-ab6f-407b-b51a-1636cb3d0683',
            '7719942b-16a7-474a-8af1-cd0c94c730d2',
            '43ac3486-7df1-4bd9-9b5e-728054ccd6ba'
          ],
          creationDate: 1559054406433
        })
      )

      const user = await resolvers.Query.getUser(
        {},
        { userId: 'ba7022f0ff4822' }
      )

      expect(user).toBeDefined()
    })
  })
  describe('searchUsers()', () => {
    let authHeaderSysAdmin: { Authorization: string }
    let authHeaderRegister: { Authorization: string }
    beforeEach(() => {
      fetch.resetMocks()
      const sysAdminToken = jwt.sign(
        { scope: ['sysadmin'] },
        readFileSync('../auth/test/cert.key'),
        {
          subject: 'ba7022f0ff4822',
          algorithm: 'RS256',
          issuer: 'opencrvs:auth-service',
          audience: 'opencrvs:gateway-user'
        }
      )
      authHeaderSysAdmin = {
        Authorization: `Bearer ${sysAdminToken}`
      }
      const regsiterToken = jwt.sign(
        { scope: ['register'] },
        readFileSync('../auth/test/cert.key'),
        {
          subject: 'ba7022f0ff4822',
          algorithm: 'RS256',
          issuer: 'opencrvs:auth-service',
          audience: 'opencrvs:gateway-user'
        }
      )
      authHeaderRegister = {
        Authorization: `Bearer ${regsiterToken}`
      }
    })
    const dummyUserList = [
      {
        name: [
          {
            use: 'en',
            given: ['Sakib Al'],
            family: ['Hasan']
          }
        ],
        username: 'sakibal.hasan',
        mobile: '+8801711111111',
        email: 'test@test.org',
        passwordHash:
          'b8be6cae5215c93784b1b9e2c06384910f754b1d66c077f1f8fdc98fbd92e6c17a0fdc790b30225986cadb9553e87a47b1d2eb7bd986f96f0da7873e1b2ddf9c',
        salt: '12345',
        role: 'FIELD_AGENT',
        status: 'active',
        practitionerId: 'dcba7022-f0ff-4822-b5d9-cb90d0e7b8de',
        primaryOfficeId: '79776844-b606-40e9-8358-7d82147f702a',
        catchmentAreaIds: [
          'b21ce04e-7ccd-4d65-929f-453bc193a736',
          '95754572-ab6f-407b-b51a-1636cb3d0683',
          '7719942b-16a7-474a-8af1-cd0c94c730d2',
          '43ac3486-7df1-4bd9-9b5e-728054ccd6ba'
        ],
        creationDate: 1559054406433
      },
      {
        name: [
          {
            use: 'en',
            given: ['Md. Ariful'],
            family: ['Islam']
          }
        ],
        username: 'mdariful.islam',
        mobile: '+8801740012994',
        email: 'test@test.org',
        passwordHash:
          'b8be6cae5215c93784b1b9e2c06384910f754b1d66c077f1f8fdc98fbd92e6c17a0fdc790b30225986cadb9553e87a47b1d2eb7bd986f96f0da7873e1b2ddf9c',
        salt: '12345',
        role: 'FIELD_AGENT',
        status: 'active',
        practitionerId: 'dcba7022-f0ff-4822-b5d9-cb90d0e7b8de',
        primaryOfficeId: '79776844-b606-40e9-8358-7d82147f702a',
        catchmentAreaIds: [
          'b21ce04e-7ccd-4d65-929f-453bc193a736',
          '95754572-ab6f-407b-b51a-1636cb3d0683',
          '7719942b-16a7-474a-8af1-cd0c94c730d2',
          '43ac3486-7df1-4bd9-9b5e-728054ccd6ba'
        ],
        creationDate: 1559054406444
      },
      {
        name: [
          {
            use: 'en',
            given: ['Mohammad'],
            family: ['Ashraful']
          }
        ],
        username: 'mohammad.ashraful',
        mobile: '+8801733333333',
        email: 'test@test.org',
        passwordHash:
          'b8be6cae5215c93784b1b9e2c06384910f754b1d66c077f1f8fdc98fbd92e6c17a0fdc790b30225986cadb9553e87a47b1d2eb7bd986f96f0da7873e1b2ddf9c',
        salt: '12345',
        role: 'LOCAL_REGISTRAR',
        status: 'active',
        practitionerId: 'dcba7022-f0ff-4822-b5d9-cb90d0e7b8de',
        primaryOfficeId: '79776844-b606-40e9-8358-7d82147f702a',
        catchmentAreaIds: [
          'b21ce04e-7ccd-4d65-929f-453bc193a736',
          '95754572-ab6f-407b-b51a-1636cb3d0683',
          '7719942b-16a7-474a-8af1-cd0c94c730d2',
          '43ac3486-7df1-4bd9-9b5e-728054ccd6ba'
        ],
        creationDate: 1559054406555
      }
    ]
    it('should returns full user list for sysadmin', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          totalItems: dummyUserList.length,
          results: dummyUserList
        })
      )

      const response = await resolvers.Query.searchUsers(
        {},
        {},
        authHeaderSysAdmin
      )

      expect(response.totalItems).toBe(3)
      expect(response.results).toEqual(dummyUserList)
    })
    it('should return error for register', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          totalItems: dummyUserList.length,
          results: dummyUserList
        })
      )

      expect(
        resolvers.Query.searchUsers({}, {}, authHeaderRegister)
      ).rejects.toThrow('Search user is only allowed for sysadmin')
    })
    it('returns filtered user list', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          totalItems: 1,
          results: [dummyUserList[2]]
        })
      )

      const response = await resolvers.Query.searchUsers(
        {},
        {
          username: 'mohammad.ashraful',
          mobile: '+8801733333333',
          email: 'test@test.org',
          role: 'LOCAL_REGISTRAR',
          status: 'active',
          primaryOfficeId: '79776844-b606-40e9-8358-7d82147f702a',
          locationId: '43ac3486-7df1-4bd9-9b5e-728054ccd6ba',
          count: 10,
          skip: 0,
          sort: 'desc'
        },
        authHeaderSysAdmin
      )

      expect(response.totalItems).toBe(1)
      expect(response.results).toEqual([dummyUserList[2]])
    })
  })

  describe('activateUser mutation', () => {
    it('activates the pending user', async () => {
      fetch.mockResponses(
        [
          JSON.stringify({
            userId: 'ba7022f0ff4822'
          }),
          { status: 201 }
        ],
        [JSON.stringify({})]
      )

      const response = await resolvers.Mutation.activateUser(
        {},
        {
          userId: 'ba7022f0ff4822',
          password: 'test',
          securityQNAs: [{ questionKey: 'HOME_TOWN', answer: 'test' }]
        }
      )

      expect(response).toEqual({
        userId: 'ba7022f0ff4822'
      })
    })
    it('throws error if /activateUser sends anything but 201', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          statusCode: '401'
        })
      )

      expect(
        resolvers.Mutation.activateUser(
          {},
          {
            userId: 'ba7022f0ff4822',
            password: 'test',
            securityQNAs: [{ questionKey: 'HOME_TOWN', answer: 'test' }]
          }
        )
      ).rejects.toThrowError(
        "Something went wrong on user-mgnt service. Couldn't activate given user"
      )
    })
  })

  describe('changePassword mutation', () => {
    let authHeaderValidUser: { Authorization: string }
    let authHeaderInValidUser: { Authorization: string }

    beforeEach(() => {
      fetch.resetMocks()
      const validUserToken = jwt.sign(
        { scope: ['register'] },
        readFileSync('../auth/test/cert.key'),
        {
          subject: 'ba7022f0ff4822',
          algorithm: 'RS256',
          issuer: 'opencrvs:auth-service',
          audience: 'opencrvs:gateway-user'
        }
      )
      authHeaderValidUser = {
        Authorization: `Bearer ${validUserToken}`
      }
      const inValidUserToken = jwt.sign(
        { scope: ['register'] },
        readFileSync('../auth/test/cert.key'),
        {
          algorithm: 'RS256',
          issuer: 'opencrvs:auth-service',
          audience: 'opencrvs:gateway-user'
        }
      )
      authHeaderInValidUser = {
        Authorization: `Bearer ${inValidUserToken}`
      }
    })

    it('changes password for loggedin user', async () => {
      fetch.mockResponses(
        [
          JSON.stringify({
            userId: 'ba7022f0ff4822'
          }),
          { status: 200 }
        ],
        [JSON.stringify({})]
      )

      const response = await resolvers.Mutation.changePassword(
        {},
        {
          userId: 'ba7022f0ff4822',
          existingPassword: 'test',
          password: 'NewPassword'
        },
        authHeaderValidUser
      )

      expect(response).toEqual(true)
    })
    it('throws error if @user-mgnt/changeUserPassword sends anything but 201', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          statusCode: '401'
        })
      )

      expect(
        resolvers.Mutation.changePassword(
          {},
          {
            userId: 'ba7022f0ff4822',
            existingPassword: 'test',
            password: 'NewPassword'
          },
          authHeaderValidUser
        )
      ).rejects.toThrowError(
        "Something went wrong on user-mgnt service. Couldn't change user password"
      )
    })
    it("throws error if any user (except sysadmin) tries to update some other user's password", async () => {
      fetch.mockResponses(
        [
          JSON.stringify({
            userId: 'ba7022f0ff4822'
          }),
          { status: 201 }
        ],
        [JSON.stringify({})]
      )

      expect(
        resolvers.Mutation.changePassword(
          {},
          {
            userId: 'ba7022f0ff4822',
            existingPassword: 'test',
            password: 'NewPassword'
          },
          authHeaderInValidUser
        )
      ).rejects.toThrowError(
        'Change password is not allowed. ba7022f0ff4822 is not the owner of the token'
      )
    })
  })

  describe('createUser mutation', () => {
    let authHeaderSysAdmin: { Authorization: string }
    let authHeaderRegister: { Authorization: string }
    beforeEach(() => {
      fetch.resetMocks()
      const sysAdminToken = jwt.sign(
        { scope: ['sysadmin'] },
        readFileSync('../auth/test/cert.key'),
        {
          subject: 'ba7022f0ff4822',
          algorithm: 'RS256',
          issuer: 'opencrvs:auth-service',
          audience: 'opencrvs:gateway-user'
        }
      )
      authHeaderSysAdmin = {
        Authorization: `Bearer ${sysAdminToken}`
      }
      const regsiterToken = jwt.sign(
        { scope: ['register'] },
        readFileSync('../auth/test/cert.key'),
        {
          subject: 'ba7022f0ff4822',
          algorithm: 'RS256',
          issuer: 'opencrvs:auth-service',
          audience: 'opencrvs:gateway-user'
        }
      )
      authHeaderRegister = {
        Authorization: `Bearer ${regsiterToken}`
      }
    })
    const user = {
      name: [{ use: 'en', given: ['Mohammad'], family: 'Ashraful' }],
      identifiers: [{ system: 'NATIONAL_ID', value: '1014881922' }],
      username: 'mohammad.ashraful',
      mobile: '+8801733333333',
      email: 'test@test.org',
      role: 'LOCAL_REGISTRAR',
      type: 'HOSPITAL',
      status: 'active',
      primaryOfficeId: '79776844-b606-40e9-8358-7d82147f702a'
    }

    it('creates user for sysadmin', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          username: 'someUser123'
        }),
        { status: 201 }
      )

      const response = await resolvers.Mutation.createUser(
        {},
        { user },
        authHeaderSysAdmin
      )

      expect(response).toEqual({
        username: 'someUser123'
      })
    })

    it('should throw error for register', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          statusCode: '201'
        }),
        { status: 400 }
      )

      expect(
        resolvers.Mutation.createUser({}, { user }, authHeaderRegister)
      ).rejects.toThrowError('Create user is only allowed for sysadmin')
    })

    it('should throw error when /createUser sends anything but 201', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          statusCode: '201'
        }),
        { status: 400 }
      )

      expect(
        resolvers.Mutation.createUser({}, { user }, authHeaderSysAdmin)
      ).rejects.toThrowError(
        "Something went wrong on user-mgnt service. Couldn't create user"
      )
    })
  })
})
