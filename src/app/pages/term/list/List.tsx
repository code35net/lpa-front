import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ListHeader} from './components/header/ListHeader'
import {Table} from './table/Table'
import {EditModal} from './edit-modal/EditModal'
import {EditModal as UserModal} from './user-modal/EditModal'
import {KTCard} from '../../../../_metronic/helpers'

const List = () => {
  const {itemIdForUpdate} = useListView()
  const {itemIdForUpdate2} = useListView()
  return (
    <>
      <KTCard>
        <ListHeader />
        <Table />
      </KTCard>
      {itemIdForUpdate !== undefined && <EditModal />}
      {itemIdForUpdate2 !== undefined && <UserModal />}
    </>
  )
}

const ListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <List />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ListWrapper}
