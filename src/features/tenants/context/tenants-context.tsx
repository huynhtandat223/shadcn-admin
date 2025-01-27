import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Tenant } from '../data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface UsersContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: Tenant | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Tenant | null>>
}

const Context = React.createContext<UsersContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TenantsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Tenant | null>(null)

  return (
    <Context value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </Context>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTenants = () => {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return context
}
