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
import * as React from 'react'
import {
  createTestComponent,
  flushPromises,
  getFileFromBase64String,
  validImageB64String
} from '@client/tests/util'
import { CreateNewUser } from '@client/views/SysAdmin/tabs/user/userCreation/CreateNewUser'
import { createStore } from '@client/store'
import { ReactWrapper } from 'enzyme'
import { modifyUserFormData } from '@client/user/userReducer'
import {
  mockFetchRoleGraphqlOperation,
  mockDataWithRegistarRoleSelected,
  mockUserGraphqlOperation
} from '@client/views/SysAdmin/utils'
import { waitForElement } from '@client/tests/wait-for-element'
import { userSection } from '@client/forms/user/fieldDefinitions/user-section'

describe('signature upload tests', () => {
  const { store, history } = createStore()
  let testComponent: ReactWrapper

  describe('when user is in signature upload form page', () => {
    beforeEach(async () => {
      testComponent = (await createTestComponent(
        // @ts-ignore
        <CreateNewUser
          match={{
            params: {
              sectionId: userSection.id,
              groupId: userSection.groups[2].id
            },
            isExact: true,
            path: '/createUser',
            url: ''
          }}
        />,
        store
      )).component
    })

    it('show the signature form page', async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 100)
      })
      testComponent.update()

      const title = testComponent
        .find('#form-title')
        .hostNodes()
        .text()

      expect(title).toBe('Attach the signature')
    })

    it('No error while uploading if valid file', async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 100)
      })
      testComponent.update()
      testComponent
        .find('#image_file_uploader_field')
        .hostNodes()
        .simulate('change', {
          target: {
            files: [
              getFileFromBase64String(
                validImageB64String,
                'index.png',
                'image/png'
              )
            ]
          }
        })
      await flushPromises()
      testComponent.update()

      expect(testComponent.find('#field-error').hostNodes().length).toBe(0)
    })

    it('return if not file', async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 100)
      })
      testComponent.update()
      testComponent
        .find('#image_file_uploader_field')
        .hostNodes()
        .simulate('change', {
          target: {
            files: []
          }
        })
      await flushPromises()
      testComponent.update()

      expect(testComponent.find('#field-error').hostNodes().length).toBe(0)
    })

    it('clicking on confirm button will go to review page', async () => {
      store.dispatch(modifyUserFormData(mockDataWithRegistarRoleSelected))
      const confirmButton = await waitForElement(testComponent, '#confirm_form')
      confirmButton.hostNodes().simulate('click')
      await flushPromises()
      testComponent.update()

      expect(history.location.pathname).toContain(
        '/createUser/preview/preview-registration-office'
      )
    })
  })

  describe('when user in review page', () => {
    beforeEach(async () => {
      store.dispatch(modifyUserFormData(mockDataWithRegistarRoleSelected))
      testComponent = (await createTestComponent(
        // @ts-ignore
        <CreateNewUser
          match={{
            params: {
              sectionId: 'preview',
              groupId: 'preview-' + userSection.groups[0].id
            },
            isExact: true,
            path: '/createUser',
            url: ''
          }}
        />,
        store,
        [mockFetchRoleGraphqlOperation, mockUserGraphqlOperation]
      )).component
    })

    it('renders review header', () => {
      expect(
        testComponent
          .find('#preview_title')
          .hostNodes()
          .text()
      ).toBe('Please review the new users details')
    })

    it('clicking submit button submits the form data', async () => {
      testComponent
        .find('#submit_user_form')
        .hostNodes()
        .simulate('click')

      await flushPromises()

      expect(store.getState().userForm.submitting).toBe(false)
    })
  })
})
