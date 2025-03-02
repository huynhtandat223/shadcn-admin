import { useEffect } from 'react'
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

export default function AutoFormAdv({ children }) {
  const schema = useBearStore((state: any) => state.schema)

  const formSchema = schema.length > 0 ? schema[0] : z.object({})

  return (
    <AutoForm formSchema={formSchema}>
      {children} <AutoFormSubmit />{' '}
    </AutoForm>
  )
}
