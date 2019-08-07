import { Validation, ValidationInitializer } from '@register/utils/validate'
import { FormattedMessage } from 'react-intl'
import {
  ISelectOption as SelectComponentOption,
  IRadioOption as RadioComponentOption,
  ICheckboxOption as CheckboxComponentOption,
  THEME_MODE,
  RadioSize
} from '@opencrvs/components/lib/forms'
import { ApolloQueryResult } from 'apollo-client'
import { GQLQuery } from '@opencrvs/gateway/src/graphql/schema.d'
import { IDynamicValues } from '@opencrvs/register/src/navigation'

export const TEXT = 'TEXT'
export const TEL = 'TEL'
export const NUMBER = 'NUMBER'
export const RADIO_GROUP = 'RADIO_GROUP'
export const INFORMATIVE_RADIO_GROUP = 'INFORMATIVE_RADIO_GROUP'
export const CHECKBOX_GROUP = 'CHECKBOX_GROUP'
export const DATE = 'DATE'
export const TEXTAREA = 'TEXTAREA'
export const SUBSECTION = 'SUBSECTION'
export const FIELD_GROUP_TITLE = 'FIELD_GROUP_TITLE'
export const LIST = 'LIST'
export const PARAGRAPH = 'PARAGRAPH'
export const DOCUMENTS = 'DOCUMENTS'
export const SELECT_WITH_OPTIONS = 'SELECT_WITH_OPTIONS'
export const SELECT_WITH_DYNAMIC_OPTIONS = 'SELECT_WITH_DYNAMIC_OPTIONS'
export const FIELD_WITH_DYNAMIC_DEFINITIONS = 'FIELD_WITH_DYNAMIC_DEFINITIONS'
export const IMAGE_UPLOADER_WITH_OPTIONS = 'IMAGE_UPLOADER_WITH_OPTIONS'
export const DOCUMENT_UPLOADER_WITH_OPTION = 'DOCUMENT_UPLOADER_WITH_OPTION'
export const SIMPLE_DOCUMENT_UPLOADER = 'SIMPLE_DOCUMENT_UPLOADER'
export const WARNING = 'WARNING'
export const LINK = 'LINK'
export const PDF_DOCUMENT_VIEWER = 'PDF_DOCUMENT_VIEWER'
export const DYNAMIC_LIST = 'DYNAMIC_LIST'
export const FETCH_BUTTON = 'FETCH_BUTTON'
export const SEARCH_FIELD = 'SEARCH_FIELD'

export enum Event {
  BIRTH = 'birth',
  DEATH = 'death'
}

export enum Action {
  SUBMIT_FOR_REVIEW = 'submit for review',
  APPROVE_APPLICATION = 'approve',
  REGISTER_APPLICATION = 'register',
  COLLECT_CERTIFICATE = 'collect certificate',
  REJECT_APPLICATION = 'reject',
  LOAD_REVIEW_APPLICATION = 'load application data for review',
  LOAD_CERTIFICATE_APPLICATION = 'load application data for certificate collection'
}

export interface ISelectOption {
  value: SelectComponentOption['value']
  label: FormattedMessage.MessageDescriptor
}
export interface IRadioOption {
  value: RadioComponentOption['value']
  label: FormattedMessage.MessageDescriptor
}
export interface ICheckboxOption {
  value: CheckboxComponentOption['value']
  label: FormattedMessage.MessageDescriptor
}

export interface IDynamicOptions {
  dependency: string
  resource?: string
  options?: { [key: string]: ISelectOption[] }
}

export interface IDynamicItems {
  dependency: string
  valueMapper: IDynamicValueMapper
  items: { [key: string]: FormattedMessage.MessageDescriptor[] }
}

export interface IDynamicFormFieldValidators {
  validator: ValidationInitializer
  dependencies: string[]
}

export type IDynamicFormFieldLabelMapper = (
  key: string
) => FormattedMessage.MessageDescriptor

export type IDynamicValueMapper = (key: string) => string

export type IDynamicFieldTypeMapper = (key: string) => string

export interface IDynamicFormFieldDefinitions {
  label?: IDynamicFieldLabel
  type?: IDynamicFieldType | IStaticFieldType
  validate?: IDynamicFormFieldValidators[]
}

export interface IDynamicFieldLabel {
  dependency: string
  labelMapper: IDynamicFormFieldLabelMapper
}

export interface IDynamicFieldType {
  kind: 'dynamic'
  dependency: string
  typeMapper: IDynamicFieldTypeMapper
}

export interface IStaticFieldType {
  kind: 'static'
  staticType: string
}

export interface IFieldInput {
  name: string
  valueField: string
}

export type IFormFieldValue =
  | string
  | string[]
  | number
  | boolean
  | IFileValue[]
  | { [key: string]: string }
  | IAttachmentValue

export interface IFileValue {
  optionValues: IFormFieldValue[]
  type: string
  data: string
}

export interface IAttachmentValue {
  type: string
  data: string
}

export type IFormFieldMutationMapFunction = (
  transFormedData: any,
  draftData: IFormData,
  sectionId: string,
  fieldDefinition: IFormField
) => void

export type IFormFieldQueryMapFunction = (
  transFormedData: IFormData,
  queryData: any,
  sectionId: string,
  fieldDefinition: IFormField
) => void

export type IFormFieldMapping = {
  mutation?: IFormFieldMutationMapFunction
  query?: IFormFieldQueryMapFunction
}
export interface IFormFieldBase {
  name: string
  type: IFormField['type']
  label: FormattedMessage.MessageDescriptor
  validate: Validation[]
  required?: boolean
  prefix?: string
  postfix?: string
  disabled?: boolean
  initialValue?: IFormFieldValue
  extraValue?: IFormFieldValue
  conditionals?: IConditional[]
  description?: FormattedMessage.MessageDescriptor
  placeholder?: FormattedMessage.MessageDescriptor
  mapping?: IFormFieldMapping
  hideAsterisk?: boolean
  hideHeader?: boolean
  mode?: THEME_MODE
  hidden?: boolean
}

export interface ISelectFormFieldWithOptions extends IFormFieldBase {
  type: typeof SELECT_WITH_OPTIONS
  options: ISelectOption[]
}
export interface ISelectFormFieldWithDynamicOptions extends IFormFieldBase {
  type: typeof SELECT_WITH_DYNAMIC_OPTIONS
  dynamicOptions: IDynamicOptions
}

export interface IFormFieldWithDynamicDefinitions extends IFormFieldBase {
  type: typeof FIELD_WITH_DYNAMIC_DEFINITIONS
  dynamicDefinitions: IDynamicFormFieldDefinitions
}

export interface IRadioGroupFormField extends IFormFieldBase {
  type: typeof RADIO_GROUP
  options: IRadioOption[]
  size?: RadioSize
  notice?: FormattedMessage.MessageDescriptor
}

export interface IInformativeRadioGroupFormField extends IFormFieldBase {
  type: typeof INFORMATIVE_RADIO_GROUP
  information: IFormSectionData
  dynamicInformationRetriever?: (obj: any) => IFormSectionData
  options: IRadioOption[]
}

export interface ITextFormField extends IFormFieldBase {
  type: typeof TEXT
}

export interface ITelFormField extends IFormFieldBase {
  type: typeof TEL
}
export interface INumberFormField extends IFormFieldBase {
  type: typeof NUMBER
  step?: number
}
export interface ICheckboxGroupFormField extends IFormFieldBase {
  type: typeof CHECKBOX_GROUP
  options: ICheckboxOption[]
}
export interface IDateFormField extends IFormFieldBase {
  type: typeof DATE
  notice?: FormattedMessage.MessageDescriptor
  ignorePlaceHolder?: boolean
}
export interface ITextareaFormField extends IFormFieldBase {
  type: typeof TEXTAREA
}
export interface ISubsectionFormField extends IFormFieldBase {
  type: typeof SUBSECTION
}
export interface IFieldGroupTitleField extends IFormFieldBase {
  type: typeof FIELD_GROUP_TITLE
}
export interface IDocumentsFormField extends IFormFieldBase {
  type: typeof DOCUMENTS
}
export interface IListFormField extends IFormFieldBase {
  type: typeof LIST
  items: FormattedMessage.MessageDescriptor[]
}

export interface IDynamicListFormField extends IFormFieldBase {
  type: typeof DYNAMIC_LIST
  dynamicItems: IDynamicItems
}
export interface IParagraphFormField extends IFormFieldBase {
  type: typeof PARAGRAPH
  fontSize?: string
}
export interface IImageUploaderWithOptionsFormField extends IFormFieldBase {
  type: typeof IMAGE_UPLOADER_WITH_OPTIONS
  optionSection: IFormSection
}
export interface IDocumentUploaderWithOptionsFormField extends IFormFieldBase {
  type: typeof DOCUMENT_UPLOADER_WITH_OPTION
  options: ISelectOption[]
}
export interface ISimpleDocumentUploaderFormField extends IFormFieldBase {
  type: typeof SIMPLE_DOCUMENT_UPLOADER
  onCompleted?: (response: string) => void
}
export interface ISearchFormField extends IFormFieldBase {
  type: typeof SEARCH_FIELD
  onCompleted?: (response: string) => void
}

export interface IWarningField extends IFormFieldBase {
  type: typeof WARNING
}

export interface ILink extends IFormFieldBase {
  type: typeof LINK
}

export interface IPDFDocumentViewerFormField extends IFormFieldBase {
  type: typeof PDF_DOCUMENT_VIEWER
}
export interface IQuery {
  query: any
  inputs: IFieldInput[]
  variables?: IDynamicValues
  modalInfoText: FormattedMessage.MessageDescriptor
  errorText: FormattedMessage.MessageDescriptor
  responseTransformer: (response: ApolloQueryResult<GQLQuery>) => void
}
export interface IQueryMap {
  [key: string]: IQuery
}
export interface ILoaderButton extends IFormFieldBase {
  type: typeof FETCH_BUTTON
  queryMap: IQueryMap
  queryData?: IQuery
  querySelectorInput: IFieldInput
  onFetch?: (response: any) => void
  modalTitle: FormattedMessage.MessageDescriptor
  successTitle: FormattedMessage.MessageDescriptor
  errorTitle: FormattedMessage.MessageDescriptor
}

export type IFormField =
  | ITextFormField
  | ITelFormField
  | INumberFormField
  | ISelectFormFieldWithOptions
  | ISelectFormFieldWithDynamicOptions
  | IFormFieldWithDynamicDefinitions
  | IRadioGroupFormField
  | IInformativeRadioGroupFormField
  | ICheckboxGroupFormField
  | IDateFormField
  | ITextareaFormField
  | ISubsectionFormField
  | IFieldGroupTitleField
  | IDocumentsFormField
  | IListFormField
  | IParagraphFormField
  | IImageUploaderWithOptionsFormField
  | IDocumentUploaderWithOptionsFormField
  | IWarningField
  | ILink
  | IPDFDocumentViewerFormField
  | IDynamicListFormField
  | ILoaderButton
  | ISearchFormField
  | ISimpleDocumentUploaderFormField

export type IDynamicFormField = ISelectFormFieldWithDynamicOptions &
  IFormFieldWithDynamicDefinitions

export interface IConditional {
  action: string
  expression: string
}

export interface IConditionals {
  iDType: IConditional
  fathersDetailsExist: IConditional
  permanentAddressSameAsMother: IConditional
  addressSameAsMother: IConditional
  countryPermanent: IConditional
  statePermanent: IConditional
  districtPermanent: IConditional
  addressLine4Permanent: IConditional
  addressLine3Permanent: IConditional
  country: IConditional
  state: IConditional
  district: IConditional
  addressLine4: IConditional
  addressLine3: IConditional
  uploadDocForWhom: IConditional
  motherCollectsCertificate: IConditional
  fatherCollectsCertificate: IConditional
  informantCollectsCertificate: IConditional
  otherPersonCollectsCertificate: IConditional
  birthCertificateCollectorNotVerified: IConditional
  deathCertificateCollectorNotVerified: IConditional
  currentAddressSameAsPermanent: IConditional
  placeOfBirthHospital: IConditional
  deathPlaceAddressTypeHeathInstitue: IConditional
  otherBirthEventLocation: IConditional
  isNotCityLocation: IConditional
  isCityLocation: IConditional
  isNotCityLocationPermanent: IConditional
  isCityLocationPermanent: IConditional
  applicantPermanentAddressSameAsCurrent: IConditional
  iDAvailable: IConditional
  deathPlaceOther: IConditional
  deathPlaceAtPrivateHome: IConditional
  deathPlaceAtOtherLocation: IConditional
  causeOfDeathEstablished: IConditional
  isMarried: IConditional
  identifierIDSelected: IConditional
  otherRelationship: IConditional
  fatherContactDetailsRequired: IConditional
  withIn45Days: IConditional
  between46daysTo5yrs: IConditional
  after5yrs: IConditional
  deceasedNationIdSelected: IConditional
  isRegistrarRoleSeleted: IConditional
}

export type ViewType = 'form' | 'preview' | 'review' | 'hidden'

export type IFormSectionMutationMapFunction = (
  transFormedData: any,
  draftData: IFormData,
  sectionId: string
) => void

export type IFormSectionQueryMapFunction = (
  transFormedData: IFormData,
  queryData: any,
  sectionId: string
) => void

export type IFormSectionMapping = {
  mutation?: IFormSectionMutationMapFunction
  query?: IFormSectionQueryMapFunction
}
export interface IFormSection {
  id: string
  viewType: ViewType
  name: FormattedMessage.MessageDescriptor
  title: FormattedMessage.MessageDescriptor
  groups: IFormSectionGroup[]
  disabled?: boolean
  optional?: boolean
  notice?: FormattedMessage.MessageDescriptor
  mapping?: IFormSectionMapping
  hasDocumentSection?: boolean
}

export interface IFormSectionGroup {
  id: string
  title?: FormattedMessage.MessageDescriptor
  fields: IFormField[]
  disabled?: boolean
  ignoreSingleFieldView?: boolean
  conditionals?: IConditional[]
}

export interface IForm {
  sections: IFormSection[]
}

export interface Ii18nSelectOption {
  value: string
  label: string
}

export interface Ii18nFormFieldBase {
  name: string
  type: string
  label: string
  description?: string
  validate: Validation[]
  required?: boolean
  prefix?: string
  initialValue?: IFormFieldValue
  extraValue?: IFormFieldValue
  postfix?: string
  disabled?: boolean
  conditionals?: IConditional[]
  hideAsterisk?: boolean
  hideHeader?: boolean
  mode?: THEME_MODE
  placeholder?: string
  hidden?: boolean
}

export interface Ii18nSelectFormField extends Ii18nFormFieldBase {
  type: typeof SELECT_WITH_OPTIONS
  options: SelectComponentOption[]
}

export interface Ii18nRadioGroupFormField extends Ii18nFormFieldBase {
  type: typeof RADIO_GROUP
  options: RadioComponentOption[]
  size?: RadioSize
  notice?: string
}

type Name = {
  firstNames: string
  familyName: string
}
type Identifier = {
  id: string
  type: string
}
type Infomation = {
  name: Name[]
  birthDate: string
  nationality: [string]
  identifier: [Identifier] | null
}

export interface Ii18nInformativeRadioGroupFormField
  extends Ii18nFormFieldBase {
  type: typeof INFORMATIVE_RADIO_GROUP
  information: Infomation
  options: RadioComponentOption[]
}

export interface Ii18nTextFormField extends Ii18nFormFieldBase {
  type: typeof TEXT
}
export interface Ii18nTelFormField extends Ii18nFormFieldBase {
  type: typeof TEL
}
export interface Ii18nNumberFormField extends Ii18nFormFieldBase {
  type: typeof NUMBER
  step?: number
}
export interface Ii18nCheckboxGroupFormField extends Ii18nFormFieldBase {
  type: typeof CHECKBOX_GROUP
  options: CheckboxComponentOption[]
}
export interface Ii18nDateFormField extends Ii18nFormFieldBase {
  type: typeof DATE
  notice?: string
  ignorePlaceHolder?: boolean
}
export interface Ii18nTextareaFormField extends Ii18nFormFieldBase {
  type: typeof TEXTAREA
}
export interface Ii18nSubsectionFormField extends Ii18nFormFieldBase {
  type: typeof SUBSECTION
}
export interface Ii18nFieldGroupTitleField extends Ii18nFormFieldBase {
  type: typeof FIELD_GROUP_TITLE
}
export interface Ii18nDocumentsFormField extends Ii18nFormFieldBase {
  type: typeof DOCUMENTS
}
export interface Ii18nListFormField extends Ii18nFormFieldBase {
  type: typeof LIST
  items: FormattedMessage.MessageDescriptor[]
}
export interface Ii18nParagraphFormField extends Ii18nFormFieldBase {
  type: typeof PARAGRAPH
  fontSize?: string
}
export interface Ii18nImageUploaderWithOptionsFormField
  extends Ii18nFormFieldBase {
  type: typeof IMAGE_UPLOADER_WITH_OPTIONS
  optionSection: IFormSection
}
export interface Ii18nDocumentUploaderWithOptions extends Ii18nFormFieldBase {
  type: typeof DOCUMENT_UPLOADER_WITH_OPTION
  options: SelectComponentOption[]
}
export interface Ii18nSimpleDocumentUploaderFormField
  extends Ii18nFormFieldBase {
  type: typeof SIMPLE_DOCUMENT_UPLOADER
}
export interface Ii18nSearchFormField extends Ii18nFormFieldBase {
  type: typeof SEARCH_FIELD
  onCompleted?: (response: string) => void
}

export interface Ii18nWarningField extends Ii18nFormFieldBase {
  type: typeof WARNING
}

export interface Ii18nLinkField extends Ii18nFormFieldBase {
  type: typeof LINK
}

export interface Ii18nPDFDocumentViewerFormField extends Ii18nFormFieldBase {
  type: typeof PDF_DOCUMENT_VIEWER
}

export interface Ii18nLoaderButtonField extends Ii18nFormFieldBase {
  type: typeof FETCH_BUTTON
  queryMap: IQueryMap
  queryData?: IQuery
  querySelectorInput: IFieldInput
  onFetch?: (response: any) => void
  modalTitle: string
  successTitle: string
  errorTitle: string
  errorText: string
}

export type Ii18nFormField =
  | Ii18nTextFormField
  | Ii18nTelFormField
  | Ii18nNumberFormField
  | Ii18nSelectFormField
  | Ii18nRadioGroupFormField
  | Ii18nInformativeRadioGroupFormField
  | Ii18nCheckboxGroupFormField
  | Ii18nDateFormField
  | Ii18nTextareaFormField
  | Ii18nSubsectionFormField
  | Ii18nFieldGroupTitleField
  | Ii18nDocumentsFormField
  | Ii18nListFormField
  | Ii18nParagraphFormField
  | Ii18nImageUploaderWithOptionsFormField
  | Ii18nDocumentUploaderWithOptions
  | Ii18nWarningField
  | Ii18nLinkField
  | Ii18nPDFDocumentViewerFormField
  | Ii18nLoaderButtonField
  | Ii18nSearchFormField
  | Ii18nSimpleDocumentUploaderFormField

export interface IFormSectionData {
  [key: string]: IFormFieldValue
}

export interface IFormData {
  [key: string]: IFormSectionData
}

export interface IAttachment {
  data: string
  optionValues: string[]
  type: string
  title?: string
  description?: string
}
