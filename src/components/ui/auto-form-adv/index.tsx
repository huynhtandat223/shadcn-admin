import { useEffect, useState } from 'react'
import * as z from 'zod'
import AutoForm, { AutoFormSubmit } from '../auto-form'

export default function AutoFormAdv() {
  const [values, setValues] = useState({
    actions: [],
  })

  const [actionTypes, setActionTypes] = useState([])

  const [formSchema, setFormSchema] = useState(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      actions: z.array(
        z.object({
          type: z.enum(['goto', 'fill']),
        })
      ),
    })
  )

  useEffect(() => {
    const actions = values.actions || []

    const newActionTypes = []
    for (let index = 0; index < actions.length; index++) {
      const currentAction = actions[index]['type'] || 'goto'
      const storedAction = actionTypes[index]

      if (storedAction === currentAction) {
        continue
      }

      let newSchema = {} as any
      if (currentAction === 'goto') {
        newSchema = formSchema.extend({
          actions: z.array(
            z.object({
              type: z.enum(['goto', 'fill']),
              url: z.string(),
            })
          ),
        })
      }

      if (currentAction === 'fill') {
        newSchema = formSchema.extend({
          actions: z.array(
            z.object({
              type: z.enum(['goto', 'fill']),
              selector: z.string(),
              value: z.string(),
            })
          ),
        })
      }

      setFormSchema(newSchema)
    }
  }, [values.actions])

  // const formSchema = useMemo(() => {

  //   const actions = values.actions || []
  //   for (const action of actions) {
  //     const actionType = action.type || 'goto'

  //     if (actionType === 'goto') {
  //       schema = schema.extend({
  //         actions: z.array(
  //           z.object({
  //             type: z.enum(['goto', 'fill']),
  //             url: z.string(),
  //           })
  //         ),
  //       })
  //     }

  //     if (actionType === 'fill') {
  //       schema = schema.extend({
  //         actions: z.array(
  //           z.object({
  //             type: z.enum(['goto', 'fill']),
  //             selector: z.string(),
  //             value: z.string(),
  //           })
  //         ),
  //       })
  //     }
  //   }
  //   return schema
  // }, [values.actions])

  return (
    <AutoForm
      values={values}
      onValuesChange={setValues}
      formSchema={formSchema}
    >
      <AutoFormSubmit />{' '}
    </AutoForm>
  )
}
