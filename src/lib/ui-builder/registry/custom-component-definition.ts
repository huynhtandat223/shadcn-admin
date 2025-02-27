import { z } from 'zod'
import { ComponentRegistry } from '@/lib/ui-builder/registry/component-registry'
import {
  childrenFieldOverrides,
  classNameFieldOverrides,
} from '@/lib/ui-builder/registry/form-field-overrides'
import EntityList from '@/features/tenants'

export const customComponentDefinitions: ComponentRegistry = {
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
