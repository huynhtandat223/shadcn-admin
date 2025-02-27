import { create } from 'zustand'

type DialogKeyStore = {
  currentDialogKey: string | null
  setCurrentDialogKey: (dialogKey: string | null) => void
}

export const useDialogKey = create<DialogKeyStore>((set) => ({
  currentDialogKey: null,
  setCurrentDialogKey: (dialogKey) => set((state) => ({ ...state, dialogKey })),
}))
