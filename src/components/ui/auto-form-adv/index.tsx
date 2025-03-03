import { useMemo } from 'react'
import * as z from 'zod'
import AutoForm, { AutoFormSubmit } from '../auto-form'

export default function AutoFormAdv({ fields }) {
  console.log('AutoFormAdv fields', fields)
  const formSchema = useMemo(() => {
    if (!fields || fields.length === 0) return z.object({})

    let schema = z.object({})

    for (const field of fields) {
      if (field.type === 'input') {
        schema = schema.extend({
          [field.name]: z.string().optional(),
        })
      }

      if (field.type === 'complex') {
        schema = schema.extend({
          [field.name]: z.object({
            [field.name]: z.string().optional(),
          }),
        })
      }
    }
    return schema
  }, [fields])

  return (
    <AutoForm formSchema={formSchema}>
      <AutoFormSubmit />{' '}
    </AutoForm>
  )
}
