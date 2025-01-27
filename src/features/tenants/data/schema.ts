import { z } from 'zod'

export const tenantTypeSchema = z.enum(['organization', 'personal', 'system'])

const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayName: z.string().or(z.undefined()),
  tenantType: tenantTypeSchema,
})

export type TenantType = z.infer<typeof tenantTypeSchema>

export type Tenant = z.infer<typeof tenantSchema>

export const tenantListSchema = z.array(tenantSchema)
