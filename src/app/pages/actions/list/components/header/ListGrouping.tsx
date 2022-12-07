import {useQueryClient, useMutation} from 'react-query'
import {QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteSelectedActions} from '../../core/_requests'
import {useIntl} from 'react-intl'
const ListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
  const intl = useIntl()
  const deleteSelectedItems = useMutation(() => deleteSelectedActions(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      clearSelected()
    },
  })

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> {intl.formatMessage({id: 'ACTION.LIST.SELECTED'})}
      </div>

      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        {intl.formatMessage({id: 'ACTION.LIST.DELETE'})}
      </button>
    </div>
  )
}

export {ListGrouping}
