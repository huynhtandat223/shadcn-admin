import Tenants from '@/features/tenants'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/tenants/')({
  component: Tenants,
})
