import { useMemo } from 'react'
import * as z from 'zod'
import AutoForm, { AutoFormSubmit } from '../auto-form'

const typeMap: Record<string, z.ZodTypeAny> = {
  input: z.string(),
  complex: z.array(z.object({})),
}

export default function AutoFormAdv({ fields }) {
  const formSchema = useMemo(() => {
    let schema = z.object({})
    if (!fields || fields.length === 0) return schema

    for (const field of fields) {
      let fieldSchema = typeMap[field.type]

      if (!field.isRequired) fieldSchema = fieldSchema.optional()

      schema = schema.extend({
        [field.name]: fieldSchema,
      })
    }
    return schema
  }, [fields])

  return (
    <AutoForm formSchema={formSchema}>
      <AutoFormSubmit />{' '}
    </AutoForm>
  )
}
