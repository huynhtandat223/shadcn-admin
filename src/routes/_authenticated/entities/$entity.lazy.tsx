import { z } from 'zod'
import { createLazyFileRoute } from '@tanstack/react-router'
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import UIBuilder from '@/components/ui/ui-builder'
import LayerRenderer from '@/components/ui/ui-builder/layer-renderer'

export const Route = createLazyFileRoute('/_authenticated/entities/$entity')({
  component: Test,
})

function Test() {
  const formSchema = z.object({
    name: z.string(),
    actions: z.array(
      z.object({
        type: z.object({}),
      })
    ),
  })

  return (
    <AutoForm
      fieldConfig={{
        actions: {
          fieldType: 'automation-action',
        },
      }}
      formSchema={formSchema}
      onSubmit={(value) => console.log(value)}
    >
      {' '}
      <AutoFormSubmit>Send now</AutoFormSubmit>
    </AutoForm>
  )
}

function EntityListWrapper() {
  const { show } = Route.useSearch()

  if (show === 'edit') {
    return <UIBuilder />
  }

  const layerStoreStr = localStorage.getItem('layer-store')
  const layerStore = layerStoreStr ? JSON.parse(layerStoreStr) : {}

  const page = layerStore.state?.pages[0]

  return <LayerRenderer page={page} />
}
