import axios from 'axios'
import { ColumnDef } from '@tanstack/react-table'
import { IconUserPlus } from '@tabler/icons-react'
import { useAuth } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import LongText from '@/components/long-text'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DataTableColumnHeader } from './components/data-table-column-header'
import { DataTableRowActions } from './components/data-table-row-actions'
import { TenantsDeleteDialog } from './components/tenants-delete-dialog'
import { TenantsTable } from './components/tenants-table'
import { TenantsActionDialog } from './components/users-action-dialog'
import TenantsProvider, { useTenants } from './context/tenants-context'
import { Tenant } from './data/schema'

export type ODataQueryWithCount<T> = {
  value: T[]
  totalCount: number
}

const columns: ColumnDef<Tenant>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-120'>{row.getValue('name')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'displayName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Display Name' />
    ),
    cell: ({ row }) => row.getValue('displayName'),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTenants()
  const { accessToken } = useAuth()
  return (
    <>
      <TenantsActionDialog
        onExternalSubmit={async (values) => {
          await axios.post(`http://localhost:5002/odata-api/tenants`, values, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        }}
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <TenantsDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}

export function UsersPrimaryButtons() {
  const { setOpen } = useTenants()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add User</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}

interface EntityListProps {
  entityName: string
}

export default function EntityList({ entityName }: EntityListProps) {
  return (
    <TenantsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <TenantsTable columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </TenantsProvider>
  )
}
