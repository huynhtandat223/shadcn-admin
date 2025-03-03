import { z, ZodType, ZodTypeDef } from 'zod'
import { ComponentRegistry } from '@/lib/ui-builder/registry/component-registry'
import {
  childrenFieldOverrides,
  classNameFieldOverrides,
} from '@/lib/ui-builder/registry/form-field-overrides'
import AutoFormAdv from '@/components/ui/auto-form-adv'
import EntityList from '@/features/tenants'

class ZodAutoForm extends ZodType<string, ZodTypeDef, string> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    const { data } = input
    console.log('data', data)
    const type = data.type || 'input'

    //change new type
    if (type !== this.currentType) {
      return {
        status: 'valid',
        value: { type: type },
      }
    }

    const t = z.object(this.currentShape)
    const result = t.safeParse(data)
    console.log('result', result)
    return {
      status: result.success ? 'valid' : 'aborted',
      value: result.data,
      error: result.error,
    }
  }

  _type: string = 'ZodUUID'

  private currentShape: any
  private currentType = ''

  getShape(val) {
    this.currentType = val?.type || 'input'
    if (this.currentType)
      this.currentShape = {
        //default input
        type: z.enum(['input', 'complex']),
        name: z.string().default('inputName'),
        isRequired: z.boolean().optional().default(false),
      }

    if (val.type === 'complex') {
      this.currentShape = {
        type: z.enum(['input', 'complex']),
        name: z.string(),
        isRequired: z.boolean().optional(),
        nestedFields: z.array(new ZodAutoForm({})),
      }
    }

    return this.currentShape
  }

  // _def: ZodTypeDef = {
  //   schema: z.object({
  //     type: z.enum(['goto', 'fill']),
  //   }),
  // }
}

export const customComponentDefinitions: ComponentRegistry = {
  AutoFormAdv: {
    component: AutoFormAdv,
    from: '@/components/ui/auto-form-adv',
    schema: z.object({
      //children: z.any().optional(),
      fields: z.array(new ZodAutoForm({})),
    }),
    fieldOverrides: {
      //children: (layer) => childrenFieldOverrides(layer),
    },
  },
  EntityList: {
    component: EntityList,
    schema: z.object({
      entity: z.string(),
    }),
    from: '@/features/tenants',
    fieldOverrides: {
      className: (layer) => classNameFieldOverrides(layer),
      children: (layer) => childrenFieldOverrides(layer),
    },
  },
}
