import {
  ViewType,
  TEXT,
  NUMBER,
  DATE,
  SELECT_WITH_OPTIONS,
  SELECT_WITH_DYNAMIC_OPTIONS
} from '@register/forms'
import {
  bengaliOnlyNameFormat,
  englishOnlyNameFormat,
  range,
  isValidBirthDate,
  greaterThanZero,
  maxLength
} from '@register/utils/validate'
import { conditionals } from '@register/forms/utils'
import {
  OFFLINE_FACILITIES_KEY,
  OFFLINE_LOCATIONS_KEY
} from '@register/offline/reducer'
import { formMessages as messages, formMessages } from '@register/i18n/messages'
import { countries } from '@register/forms/countries'
import {
  fieldToNameTransformer,
  sectionFieldToBundleFieldTransformer,
  fieldNameTransformer,
  fieldValueSectionExchangeTransformer
} from '@register/forms/mappings/mutation/field-mappings'
import { eventLocationMutationTransformer } from '@register/forms/register/fieldDefinitions/birth/mappings/mutation/child-mappings'
import {
  nameToFieldTransformer,
  fieldValueTransformer,
  bundleFieldToSectionFieldTransformer,
  sectionFieldExchangeTransformer,
  eventLocationTypeQueryTransformer,
  eventLocationIDQueryTransformer,
  eventLocationQueryTransformer
} from '@register/forms/mappings/query/field-mappings'
import { IFormSection } from '@register/forms/index'

export interface IChildSectionFormData {
  firstName: string
  foo: string
  bar: string
  baz: string
}

export const childSection: IFormSection = {
  id: 'child',
  viewType: 'form' as ViewType,
  name: messages.childTab,
  title: messages.childTitle,
  hasDocumentSection: true,
  groups: [
    {
      id: 'child-view-group',
      fields: [
        {
          name: 'firstNames',
          type: TEXT,
          label: messages.childFirstNames,
          required: false,
          initialValue: '',
          validate: [bengaliOnlyNameFormat],
          mapping: {
            mutation: fieldToNameTransformer('bn'),
            query: nameToFieldTransformer('bn')
          }
        },
        {
          name: 'familyName',
          type: TEXT,
          label: messages.childFamilyName,
          required: true,
          initialValue: '',
          validate: [bengaliOnlyNameFormat],
          mapping: {
            mutation: fieldToNameTransformer('bn'),
            query: nameToFieldTransformer('bn')
          }
        },
        {
          name: 'firstNamesEng',
          type: TEXT,
          label: messages.childFirstNamesEng,
          required: false,
          initialValue: '',
          validate: [englishOnlyNameFormat],
          mapping: {
            mutation: fieldToNameTransformer('en', 'firstNames'),
            query: nameToFieldTransformer('en', 'firstNames')
          }
        },
        {
          name: 'familyNameEng',
          type: TEXT,
          label: messages.childFamilyNameEng,
          required: true,
          initialValue: '',
          validate: [englishOnlyNameFormat],
          mapping: {
            mutation: fieldToNameTransformer('en', 'familyName'),
            query: nameToFieldTransformer('en', 'familyName')
          }
        },
        {
          name: 'gender',
          type: SELECT_WITH_OPTIONS,
          label: messages.childSex,
          required: true,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          options: [
            { value: 'male', label: messages.childSexMale },
            { value: 'female', label: messages.childSexFemale },
            { value: 'other', label: messages.childSexOther },
            { value: 'unknown', label: messages.childSexUnknown }
          ]
        },
        {
          name: 'childBirthDate',
          type: DATE,
          label: messages.childDateOfBirth,
          required: true,
          initialValue: '',
          validate: [isValidBirthDate],
          mapping: {
            mutation: fieldNameTransformer('birthDate'),
            query: fieldValueTransformer('birthDate')
          }
        },
        {
          name: 'attendantAtBirth',
          type: SELECT_WITH_OPTIONS,
          label: messages.attendantAtBirth,
          required: false,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          options: [
            { value: 'PHYSICIAN', label: messages.attendantAtBirthPhysician },
            { value: 'NURSE', label: messages.attendantAtBirthNurse },
            { value: 'MIDWIFE', label: messages.attendantAtBirthMidwife },
            {
              value: 'OTHER_PARAMEDICAL_PERSONNEL',
              label: messages.attendantAtBirthOtherParamedicalPersonnel
            },
            { value: 'LAYPERSON', label: messages.attendantAtBirthLayperson },
            { value: 'NONE', label: messages.attendantAtBirthNone },
            { value: 'OTHER', label: messages.attendantAtBirthOther }
          ],
          mapping: {
            mutation: sectionFieldToBundleFieldTransformer(),
            query: bundleFieldToSectionFieldTransformer()
          }
        },
        {
          name: 'birthType',
          type: SELECT_WITH_OPTIONS,
          label: messages.birthType,
          required: false,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          options: [
            { value: 'SINGLE', label: messages.birthTypeSingle },
            { value: 'TWIN', label: messages.birthTypeTwin },
            { value: 'TRIPLET', label: messages.birthTypeTriplet },
            { value: 'QUADRUPLET', label: messages.birthTypeQuadruplet },
            {
              value: 'HIGHER_MULTIPLE_DELIVERY',
              label: messages.birthTypeHigherMultipleDelivery
            }
          ],
          mapping: {
            mutation: sectionFieldToBundleFieldTransformer(),
            query: bundleFieldToSectionFieldTransformer()
          }
        },
        {
          name: 'multipleBirth',
          type: NUMBER,
          label: messages.multipleBirth,
          required: true,
          initialValue: '',
          validate: [greaterThanZero, maxLength(2)],
          mapping: {
            mutation: fieldValueSectionExchangeTransformer('mother'),
            query: sectionFieldExchangeTransformer('mother')
          }
        },
        {
          name: 'weightAtBirth',
          type: NUMBER,
          step: 0.01,
          label: messages.weightAtBirth,
          required: false,
          initialValue: '',
          validate: [range(0, 6)],
          postfix: 'Kg',
          mapping: {
            mutation: sectionFieldToBundleFieldTransformer(),
            query: bundleFieldToSectionFieldTransformer()
          }
        },
        {
          name: 'placeOfBirth',
          type: SELECT_WITH_OPTIONS,
          label: messages.placeOfBirth,
          required: false,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          options: [
            { value: 'HOSPITAL', label: messages.hospital },
            {
              value: 'OTHER_HEALTH_INSTITUTION',
              label: messages.otherHealthInstitution
            },
            { value: 'PRIVATE_HOME', label: messages.privateHome },
            { value: 'OTHER', label: messages.otherInstitution }
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(),
            query: eventLocationTypeQueryTransformer()
          }
        },
        {
          name: 'birthLocation',
          type: SELECT_WITH_DYNAMIC_OPTIONS,
          label: messages.birthLocation,
          required: false,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          dynamicOptions: {
            resource: OFFLINE_FACILITIES_KEY,
            dependency: 'placeOfBirth'
          },
          conditionals: [conditionals.placeOfBirthHospital],
          mapping: {
            mutation: eventLocationMutationTransformer(),
            query: eventLocationIDQueryTransformer()
          }
        },
        {
          name: 'country',
          type: SELECT_WITH_OPTIONS,
          label: formMessages.country,
          required: true,
          initialValue: window.config.COUNTRY.toUpperCase(),
          validate: [],
          placeholder: messages.select,
          options: countries,
          conditionals: [conditionals.otherBirthEventLocation],
          mapping: {
            mutation: eventLocationMutationTransformer(),
            query: eventLocationQueryTransformer()
          }
        },
        {
          name: 'state',
          type: SELECT_WITH_DYNAMIC_OPTIONS,
          label: formMessages.state,
          required: true,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          dynamicOptions: {
            resource: OFFLINE_LOCATIONS_KEY,
            dependency: 'country'
          },
          conditionals: [
            conditionals.country,
            conditionals.otherBirthEventLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(),
            query: eventLocationQueryTransformer()
          }
        },
        {
          name: 'district',
          type: SELECT_WITH_DYNAMIC_OPTIONS,
          label: formMessages.district,
          required: true,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          dynamicOptions: {
            resource: OFFLINE_LOCATIONS_KEY,
            dependency: 'state'
          },
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.otherBirthEventLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(),
            query: eventLocationQueryTransformer()
          }
        },
        {
          name: 'addressLine4',
          type: SELECT_WITH_DYNAMIC_OPTIONS,
          label: formMessages.addressLine4,
          required: true,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          dynamicOptions: {
            resource: OFFLINE_LOCATIONS_KEY,
            dependency: 'district'
          },
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.otherBirthEventLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(6),
            query: eventLocationQueryTransformer(6)
          }
        },
        {
          name: 'addressLine3',
          type: SELECT_WITH_DYNAMIC_OPTIONS,
          label: formMessages.addressLine3,
          required: false,
          initialValue: '',
          validate: [],
          placeholder: messages.select,
          dynamicOptions: {
            resource: OFFLINE_LOCATIONS_KEY,
            dependency: 'addressLine4'
          },
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.addressLine4,
            conditionals.otherBirthEventLocation,
            conditionals.isNotCityLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(4),
            query: eventLocationQueryTransformer(4)
          }
        },
        {
          name: 'addressLine3CityOption',
          type: TEXT,
          label: formMessages.addressLine3CityOption,
          required: false,
          initialValue: '',
          validate: [],
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.addressLine4,
            conditionals.otherBirthEventLocation,
            conditionals.isCityLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(5),
            query: eventLocationQueryTransformer(5)
          }
        },
        {
          name: 'addressLine2',
          type: TEXT,
          label: formMessages.addressLine2,
          required: false,
          initialValue: '',
          validate: [],
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.addressLine4,
            conditionals.addressLine3,
            conditionals.otherBirthEventLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(3),
            query: eventLocationQueryTransformer(3)
          }
        },
        {
          name: 'addressLine1CityOption',
          type: TEXT,
          label: formMessages.addressLine1,
          required: false,
          initialValue: '',
          validate: [],
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.addressLine4,
            conditionals.otherBirthEventLocation,
            conditionals.isCityLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(2),
            query: eventLocationQueryTransformer(2)
          }
        },
        {
          name: 'postCodeCityOption',
          type: NUMBER,
          label: formMessages.postCode,
          required: false,
          initialValue: '',
          validate: [],
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.addressLine4,
            conditionals.otherBirthEventLocation,
            conditionals.isCityLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(0, 'postalCode'),
            query: eventLocationQueryTransformer(0, 'postalCode')
          }
        },
        {
          name: 'addressLine1',
          type: TEXT,
          label: formMessages.addressLine1,
          required: false,
          initialValue: '',
          validate: [],
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.addressLine4,
            conditionals.addressLine3,
            conditionals.otherBirthEventLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(1),
            query: eventLocationQueryTransformer(1)
          }
        },
        {
          name: 'postCode',
          type: NUMBER,
          label: formMessages.postCode,
          required: false,
          initialValue: '',
          validate: [],
          conditionals: [
            conditionals.country,
            conditionals.state,
            conditionals.district,
            conditionals.addressLine4,
            conditionals.addressLine3,
            conditionals.otherBirthEventLocation
          ],
          mapping: {
            mutation: eventLocationMutationTransformer(0, 'postalCode'),
            query: eventLocationQueryTransformer(0, 'postalCode')
          }
        }
      ]
    }
  ]
}
