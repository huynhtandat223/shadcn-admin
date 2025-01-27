import { z } from 'zod'

const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayName: z.string().or(z.undefined()),
})


export type Tenant = z.infer<typeof tenantSchema>

export const tenantListSchema = z.array(tenantSchema)
