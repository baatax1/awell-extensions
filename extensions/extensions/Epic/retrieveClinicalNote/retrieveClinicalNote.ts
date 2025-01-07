/actions/retrieveClinicalNote/config/datapoints.ts
--------------------------------------------------
import { type DataPointDefinition } from '@awell-health/extensions-core'

export const dataPoints = {
  id: { key: 'id', valueType: 'string' },
  date: { key: 'date', valueType: 'date' },
  type: { key: 'type', valueType: 'string' },
  author: { key: 'author', valueType: 'string' },
  status: { key: 'status', valueType: 'string' },
  content: { key: 'content', valueType: 'string' },
  context: { key: 'context', valueType: 'string' },
  subject: { key: 'subject', valueType: 'string' },
  category: { key: 'category', valueType: 'string' },
  custodian: { key: 'custodian', valueType: 'string' },
  docStatus: { key: 'docStatus', valueType: 'string' },
  extension: { key: 'extension', valueType: 'string' },
  identifier: { key: 'identifier', valueType: 'string' },
  resourceType: { key: 'resourceType', valueType: 'string' },
  authenticator: { key: 'authenticator', valueType: 'string' },
  securityLabel: { key: 'securityLabel', valueType: 'string' },
} satisfies Record<string, DataPointDefinition>

/actions/retrieveClinicalNote/config/fields.ts
---------------------------------------------
import { FieldType, type Field } from '@awell-health/extensions-core'
import z, { type ZodTypeAny } from 'zod'

export const fields = {
  documentReferenceId: {
    id: 'documentReferenceId',
    label: 'Document Reference ID',
    description: 'Epic DocumentReference resource ID',
    type: FieldType.STRING,
    required: true,
  },
} satisfies Record<string, Field>

export const FieldsValidationSchema = z.object({
  documentReferenceId: z.string().min(1),
} satisfies Record<keyof typeof fields, ZodTypeAny>)

/actions/retrieveClinicalNote/config/index.ts
--------------------------------------------
export { fields, FieldsValidationSchema } from './fields'
export { dataPoints } from './datapoints'

/actions/retrieveClinicalNote/retrieveClinicalNote.ts
-----------------------------------------------------
import { Category, type Action } from '@awell-health/extensions-core'
import { fields, dataPoints, FieldsValidationSchema } from './config'
import { type settings } from '../../settings'
import { validatePayloadAndCreateClient } from '../../helpers'

export const retrieveClinicalNote: Action<
  typeof fields,
  typeof settings,
  keyof typeof dataPoints
> = {
  key: 'retrieveClinicalNote',
  category: Category.EHR_INTEGRATIONS,
  title: 'Retrieve Clinical Note Details on Epic',
  description: 'Fetches a clinical note from Epic via DocumentReference.',
  fields,
  previewable: false,
  dataPoints,
  onActivityCreated: async (payload, onComplete, onError) => {
    try {
      const {
        fields: { documentReferenceId },
        // You’d build a dedicated Epic client similarly to Athena’s
        // or reuse a generic FHIR client if you have one
        // but we’ll skip that for brevity here:
      } = await validatePayloadAndCreateClient({
        fieldsSchema: FieldsValidationSchema,
        payload,
      })

      // Example mock fetch
      const response = {
        id: documentReferenceId,
        date: '2025-01-07',
        type: 'Progress Note',
        author: 'Dr. Epic',
        status: 'final',
        content: 'Base64 or text content here',
        context: 'Inpatient encounter',
        subject: 'Patient/123',
        category: 'Clinical Note',
        custodian: 'Organization/ABC',
        docStatus: 'preliminary',
        extension: 'Some extension data',
        identifier: 'ID-123',
        resourceType: 'DocumentReference',
        authenticator: 'Practitioner/456',
        securityLabel: 'Confidential',
      }

      await onComplete({
        data_points: {
          id: response.id,
          date: response.date,
          type: response.type,
          author: response.author,
          status: response.status,
          content: response.content,
          context: response.context,
          subject: response.subject,
          category: response.category,
          custodian: response.custodian,
          docStatus: response.docStatus,
          extension: response.extension,
          identifier: response.identifier,
          resourceType: response.resourceType,
          authenticator: response.authenticator,
          securityLabel: response.securityLabel,
        },
      })
    } catch (error) {
      await onError({
        events: [
          {
            date: new Date().toISOString(),
            text: { en: 'Unable to retrieve the clinical note from Epic.' },
            error: {
              category: 'SERVER_ERROR',
              message: 'Epic fetch failed',
            },
          },
        ],
      })
    }
  },
}

/actions/retrieveClinicalNote/index.ts
-------------------------------------
export { retrieveClinicalNote } from './retrieveClinicalNote'
