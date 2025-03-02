import { z, ZodType, ZodTypeDef } from 'zod'
import { ComponentRegistry } from '@/lib/ui-builder/registry/component-registry'
import {
  childrenFieldOverrides,
  classNameFieldOverrides,
} from '@/lib/ui-builder/registry/form-field-overrides'
import AutoFormAdv, { AutoFormInput } from '@/components/ui/auto-form-adv'
import EntityList from '@/features/tenants'

class ZodAutoForm extends ZodType<string, ZodTypeDef, string> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    const { data } = input

    const t = z.object(this.currentShape)
    const result = t.safeParse(data)

    return {
      status: result.success ? 'valid' : 'dirty',
      value: result.data,
    }
  }

  _type: string = 'ZodUUID'

  private currentShape: any

  getShape(val) {
    if (!val?.type)
      this.currentShape = {
        type: z.enum(['input']),
      }

    if (val.type === 'input') {
      this.currentShape = {
        type: z.enum(['input']),
        name: z.string(),
        isRequired: z.boolean().optional(),
      }
    }

    return this.currentShape
  }

  _def: ZodTypeDef = {
    schema: z.object({
      type: z.enum(['goto', 'fill']),
    }),
  }
}

export const customComponentDefinitions: ComponentRegistry = {
  AutoFormInput: {
    component: AutoFormInput,
    from: '@/components/ui/auto-form-adv',
    schema: z.object({
      name: z.string().optional(),
    }),
  },
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
