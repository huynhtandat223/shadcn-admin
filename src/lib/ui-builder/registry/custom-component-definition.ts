import { z } from 'zod'
import { ComponentRegistry } from '@/lib/ui-builder/registry/component-registry'
import {
  childrenFieldOverrides,
  classNameFieldOverrides,
} from '@/lib/ui-builder/registry/form-field-overrides'
import AutoFormAdv, { AutoFormInput } from '@/components/ui/auto-form-adv'
import EntityList from '@/features/tenants'

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
      children: z.any().optional(),
    }),
    fieldOverrides: {
      children: (layer) => childrenFieldOverrides(layer),
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
