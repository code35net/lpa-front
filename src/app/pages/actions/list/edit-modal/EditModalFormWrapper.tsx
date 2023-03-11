import {useQuery} from 'react-query'
import {EditModalForm} from './EditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getActionById} from '../core/_requests'

const EditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  console.log(itemIdForUpdate, "ssa")
  const {
    isLoading,
    data: item,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-item-${itemIdForUpdate}`,
    () => {
      return getActionById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )
console.log(item)
  if (!itemIdForUpdate) {
    return <EditModalForm item={{id: undefined}} />
  }

  if (!isLoading && !error && item) {
    return <EditModalForm item={item} />
  }

  return null
}

export {EditModalFormWrapper}
