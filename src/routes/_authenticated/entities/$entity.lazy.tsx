import { ZodType, ZodTypeDef, z } from 'zod'
import { createLazyFileRoute } from '@tanstack/react-router'
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import UIBuilder from '@/components/ui/ui-builder'
import LayerRenderer from '@/components/ui/ui-builder/layer-renderer'

export class ZodUUID extends ZodType<string, ZodTypeDef, string> {
  _parse(input: z.ParseInput): z.ParseReturnType<string> {
    return {
      status: 'valid',
      value: 'test12344444444',
    }
  }

  _type: string = 'ZodUUID'

  getShape(val) {
    if (!val?.type)
      return {
        type: z.enum(['goto', 'fill']),
      }

    if (val.type === 'goto') {
      return {
        type: z.enum(['goto', 'fill']),
        url: z.string(),
      }
    }

    return {
      type: z.enum(['goto', 'fill']),
      selector: z.string(),
      value: z.string(),
    }
  }

  _def: ZodTypeDef = {
    schema: z.object({
      type: z.enum(['goto', 'fill']),
    }),
  }
}

export const Route = createLazyFileRoute('/_authenticated/entities/$entity')({
  component: App,
})

function App() {
  const { pageName } = Route.useSearch()
  console.log('page', pageName)
  if (!pageName) {
    return <UIBuilder />
  }

  const layerStoreStr = localStorage.getItem('layer-store')
  const layerStore = layerStoreStr ? JSON.parse(layerStoreStr) : {}

  const page = layerStore.state?.pages.find((p) => p.name === pageName)

  return <LayerRenderer page={page} />
}

function Test(props) {
  const formSchema = z.object({
    name: z.string(),
    actions: z.array(new ZodUUID({})),
  })

  return (
    <AutoForm formSchema={formSchema} onSubmit={(value) => console.log(value)}>
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
