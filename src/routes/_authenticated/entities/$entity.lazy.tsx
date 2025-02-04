import { createLazyFileRoute } from '@tanstack/react-router'
import EntityList from '@/features/tenants'

export const Route = createLazyFileRoute('/_authenticated/entities/$entity')({
  component: EntityListWrapper,
})

function EntityListWrapper() {
  const { entity } = Route.useParams()
  return <EntityList entityName={entity} />
}
