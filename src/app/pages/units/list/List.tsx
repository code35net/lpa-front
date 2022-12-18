import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ListHeader} from './components/header/ListHeader'
import {Table} from './table/Table'
import {EditModal} from './edit-modal/EditModal'
import {KTCard} from '../../../../_metronic/helpers'

const List = (qsd: any) => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ListHeader qsd={qsd.qsd} />
        <Table />
      </KTCard>
      {itemIdForUpdate !== undefined && <EditModal />}
    </>
  )
}

const ListWrapper = (qsd: any) => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <List qsd={qsd.qsd} />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ListWrapper}
