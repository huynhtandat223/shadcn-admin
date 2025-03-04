import { useMemo } from 'react'
import * as z from 'zod'
import AutoForm, { AutoFormSubmit } from '../auto-form'

const typeMap: Record<string, z.ZodTypeAny> = {
  input: z.string(),
  complex: z.array(z.object({})),
}

export default function AutoFormAdv({ fields }) {
  const formSchema = useMemo(() => {
    return z.object({
      name: z.string(),
      description: z.string().optional(),
      action: z.enum(['goto', 'fill']),
    })
  }, [fields])

  return (
    <AutoForm formSchema={formSchema}>
      <AutoFormSubmit />{' '}
    </AutoForm>
  )
}
