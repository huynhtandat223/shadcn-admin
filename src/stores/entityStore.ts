import { create } from 'zustand'

type Entity = {
  name: string
}

type EntityStore = {
  entities: Entity[]
}

export const useEntityStore = create<EntityStore>(() => ({
  entities: [
    {
      name: 'tenants',
    },
  ],
}))
