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

    let defaultData = {}
    if (!data.type || data.type === 'input') {
      defaultData = {
        type: 'input',
        name: 'inputName',
        isRequired: false,
      }
    }

    if (data.type === 'complex') {
      defaultData = {
        name: 'complexName',
        type: 'complex',
        isRequired: false,
        test: 'test',
      }
    }

    const t = z.object(this.currentShape)
    const result = t.safeParse(defaultData)
    console.log('ZodAutoForm _parse result', result, this.currentShape)

    return {
      status: result.success ? 'valid' : 'aborted',
      value: result.data,
      error: result.error,
    }
  }

  _type: string = 'ZodUUID'

  private currentShape: any

  getShape(val) {
    console.log('ZodAutoForm getShape val', val)
    if (!val?.type || val.type === 'input')
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
        test: z.string().optional().default('test'),
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
