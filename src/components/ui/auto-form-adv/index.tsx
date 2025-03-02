import { useEffect, useMemo } from 'react'
import * as z from 'zod'
import { create } from 'zustand'
import AutoForm, { AutoFormSubmit } from '../auto-form'

const useBearStore = create((set) => ({
  schema: [],
  add: (schemaElement: any) =>
    set((state: any) => ({ schema: [...state.schema, schemaElement] })),
}))

export function AutoFormInput({ name }) {
  const add = useBearStore((state: any) => state.add)

  useEffect(() => {
    console.log('add')
    add(z.object({ [name || 'name']: z.string().optional() }))
  }, [name])
  return <></>
}

export default function AutoFormAdv({ fields }) {
  const formSchema = useMemo(() => {
    let schema = z.object({})

    for (const field of fields) {
      schema = schema.extend({
        [field.name]: z.string().optional(),
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
