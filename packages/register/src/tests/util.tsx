import * as React from 'react'

import { Provider } from 'react-redux'
import { graphql, print } from 'graphql'
import ApolloClient from 'apollo-client'

import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloLink, Observable } from 'apollo-link'
import { IStoreState, createStore, AppStore } from '../store'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as en from 'react-intl/locale-data/en'
import { mount, configure, shallow, ReactWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { addLocaleData, IntlProvider, intlShape } from 'react-intl'
import { App } from '../App'
import { getSchema } from './graphql-schema-mock'
import { ThemeProvider } from 'styled-components'
import { ENGLISH_STATE } from '../i18n/locales/en'
import { getTheme } from '@opencrvs/components/lib/theme'
import { config } from '../config'
import { I18nContainer } from '@opencrvs/register/src/i18n/components/I18nContainer'

configure({ adapter: new Adapter() })

function createGraphQLClient() {
  const schema = getSchema()

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink(operation => {
      return new Observable(observer => {
        const { query, operationName, variables } = operation

        graphql(schema, print(query), null, null, variables, operationName)
          .then(result => {
            observer.next(result)
            observer.complete()
          })
          .catch(observer.error.bind(observer))
      })
    })
  })
}

addLocaleData([...en])

export function getInitialState(): IStoreState {
  const { store: mockStore } = createStore()

  mockStore.dispatch({ type: 'NOOP' })

  return mockStore.getState()
}

export function createTestApp() {
  const { store, history } = createStore()
  const app = mount(
    <App store={store} history={history} client={createGraphQLClient()} />
  )

  return { history, app, store }
}

interface ITestView {
  intl: ReactIntl.InjectedIntl
}

const intlProvider = new IntlProvider(
  { locale: 'en', messages: ENGLISH_STATE.messages },
  {}
)
export const { intl } = intlProvider.getChildContext()

function nodeWithIntlProp(node: React.ReactElement<ITestView>) {
  return React.cloneElement(node, { intl })
}

export function createTestComponent(
  node: React.ReactElement<ITestView>,
  store: AppStore,
  graphqlMocks: any = null
) {
  const component = mount(
    <MockedProvider mocks={graphqlMocks} addTypename={false}>
      <Provider store={store}>
        <I18nContainer>
          <ThemeProvider theme={getTheme(config.COUNTRY)}>
            {nodeWithIntlProp(node)}
          </ThemeProvider>
        </I18nContainer>
      </Provider>
    </MockedProvider>,
    {
      context: { intl },
      childContextTypes: { intl: intlShape }
    }
  )

  return { component, store }
}

export function createShallowRenderedComponent(
  node: React.ReactElement<ITestView>
) {
  return shallow(node)
}

export const wait = () => new Promise(res => process.nextTick(res))

export const selectOption = (
  wrapper: ReactWrapper<{}, {}, React.Component<{}, {}, any>>,
  selector: string,
  option: string
): string => {
  const input = wrapper
    .find(`${selector} input`)
    .instance() as React.InputHTMLAttributes<HTMLInputElement>
  input.value = option.charAt(0)
  wrapper.find(`${selector} input`).simulate('change', {
    target: { value: option.charAt(0) }
  })
  wrapper
    .find(`${selector} .react-select__menu div[children="${option}"]`)
    .simulate('click')
  return `${selector} .react-select__single-value`
}

export const mockUserResponse = {
  data: {
    getUser: {
      catchmentArea: [
        {
          id: 'ddab090d-040e-4bef-9475-314a448a576a',
          name: 'Dhaka',
          status: 'active',
          __typename: 'Location'
        },
        {
          id: 'f9ec1fdb-086c-4b3d-ba9f-5257f3638286',
          name: 'GAZIPUR',
          status: 'active',
          __typename: 'Location'
        },
        {
          id: '825b17fb-4308-48cb-b77c-2f2cee4f14b9',
          name: 'KALIGANJ',
          status: 'active',
          __typename: 'Location'
        },
        {
          id: '123456789',
          name: 'BAKTARPUR',
          status: 'active',
          identifier: [
            {
              system: 'http://opencrvs.org/specs/id/jurisdiction-type',
              value: 'UNION',
              __typename: 'Identifier'
            }
          ],
          __typename: 'Location'
        }
      ],
      primaryOffice: {
        id: '2a83cf14-b959-47f4-8097-f75a75d1867f',
        name: 'Kaliganj Union Sub Center',
        status: 'active',
        __typename: 'Location'
      },
      __typename: 'User'
    }
  }
}

export const mockApplicationData = {
  child: {
    firstNames: 'গায়ত্রী',
    familyName: 'স্পিভক',
    firstNamesEng: 'Mike',
    familyNameEng: 'Test',
    childBirthDate: '1977-09-20',
    gender: 'male',
    weightAtBirth: '3.5',
    attendantAtBirth: 'MIDWIFE',
    typeOfBirth: 'SINGLE'
  },
  mother: {
    firstNames: 'স্পিভক',
    familyName: 'গায়ত্রী',
    firstNamesEng: 'Liz',
    familyNameEng: 'Test',
    iD: '654651',
    iDType: 'NATIONAL_ID',
    motherBirthDate: '1949-05-31',
    dateOfMarriage: '1972-09-19',
    maritalStatus: 'MARRIED',
    educationalAttainment: 'SECOND_STAGE_TERTIARY_ISCED_6',
    nationality: 'BGD',
    countryPermanent: 'BGD',
    statePermanent: 'state2',
    districtPermanent: 'district2',
    addressLine1Permanent: '',
    addressLine2Permanent: '',
    addressLine3Permanent: '',
    addressLine4Permanent: 'upazila1',
    postalCodePermanent: '',
    country: 'BGD',
    state: 'state2',
    district: 'district2',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    addressLine4: 'upazila2',
    postalCode: ''
  },
  father: {
    fathersDetailsExist: true,
    firstNames: 'গায়ত্রী',
    familyName: 'স্পিভক',
    firstNamesEng: 'Jeff',
    familyNameEng: 'Test',
    iD: '43468',
    iDType: 'NATIONAL_ID',
    fatherBirthDate: '1950-05-19',
    dateOfMarriage: '1972-09-19',
    maritalStatus: 'MARRIED',
    educationalAttainment: 'SECOND_STAGE_TERTIARY_ISCED_6',
    nationality: 'BGD',
    countryPermanent: 'BGD',
    statePermanent: 'state2',
    districtPermanent: 'district2',
    addressLine1Permanent: '',
    addressLine2Permanent: '',
    addressLine3Permanent: '',
    addressLine4Permanent: 'upazila1',
    postalCodePermanent: '',
    country: 'BGD',
    state: 'state2',
    district: 'district2',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    addressLine4: 'upazila2',
    postalCode: '',
    permanentAddressSameAsMother: true,
    addressSameAsMother: true
  },
  registration: {
    whoseContactDetails: 'MOTHER',
    presentAtBirthRegistration: 'BOTH_PARENTS',
    registrationPhone: '01557394986',
    registrationEmail: 'test@tester.com'
  }
}

export const mockOfflineData = {
  locations: [
    {
      id: '65cf62cb-864c-45e3-9c0d-5c70f0074cb4',
      name: 'Barisal',
      nameBn: 'বরিশাল',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: '8cbc862a-b817-4c29-a490-4a8767ff023c',
      name: 'Chittagong',
      nameBn: 'চট্টগ্রাম',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
      name: 'Dhaka',
      nameBn: 'ঢাকা',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: '7304b306-1b0d-4640-b668-5bf39bc78f48',
      name: 'Khulna',
      nameBn: 'খুলনা',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: '75fdf3dc-0dd2-4b65-9c59-3afe5f49fc3a',
      name: 'Rajshahi',
      nameBn: 'রাজশাহী',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: '2b55d13f-f700-4373-8255-c0febd4733b6',
      name: 'Rangpur',
      nameBn: 'রংপুর',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: '59f7f044-84b8-4a6c-955d-271aa3e5af46',
      name: 'Sylhet',
      nameBn: 'সিলেট',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: '237f3404-d417-41fe-9130-3d049800a1e5',
      name: 'Mymensingh',
      nameBn: 'ময়মনসিংহ',
      physicalType: 'Jurisdiction',
      juristictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    {
      id: 'bc4b9f99-0db3-4815-926d-89fd56889407',
      name: 'BARGUNA',
      nameBn: 'বরগুনা',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    {
      id: 'dabffdf7-c174-4450-b306-5a3c2c0e2c0e',
      name: 'BARISAL',
      nameBn: 'বরিশাল',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    {
      id: 'a5b61fc5-f0c9-4f54-a934-eba18f9110c2',
      name: 'BHOLA',
      nameBn: 'ভোলা',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    {
      id: '5ffa5780-5ddf-4549-a391-7ad3ba2334d4',
      name: 'JHALOKATI',
      nameBn: 'ঝালকাঠি',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    {
      id: 'c8dcf1fe-bf92-404b-81c0-31d6802a1a68',
      name: 'PATUAKHALI',
      nameBn: 'পটুয়াখালী ',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    {
      id: '9c86160a-f704-464a-8b7d-9eae2b4cf1f9',
      name: 'PIROJPUR',
      nameBn: 'পিরোজপুর ',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    {
      id: '1846f07e-6f5c-4507-b5d6-126716b0856b',
      name: 'BANDARBAN',
      nameBn: 'বান্দরবান',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    {
      id: 'cf141982-36a1-4308-9090-0445c311f5ae',
      name: 'BRAHMANBARIA',
      nameBn: 'ব্রাহ্মণবাড়িয়া',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    {
      id: '478f518e-8d86-439d-8618-5cfa8d3bf5dd',
      name: 'CHANDPUR',
      nameBn: 'চাঁদপুর',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    {
      id: 'db5faba3-8143-4924-a44a-8562ed5e0437',
      name: 'CHITTAGONG',
      nameBn: 'চট্টগ্রাম',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    {
      id: '5926982b-845c-4463-80aa-cbfb86762e0a',
      name: 'COMILLA',
      nameBn: 'কুমিল্লা',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    {
      id: 'a3455e64-164c-4bf4-b834-16640a85efd8',
      name: "COX'S BAZAR",
      nameBn: 'কক্সবাজার ',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    {
      id: '1dfc716a-c5f7-4d39-ad71-71d2a359210c',
      name: 'FENI',
      nameBn: 'ফেনী',
      physicalType: 'Jurisdiction',
      juristictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    }
  ]
}
