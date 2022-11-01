import {useQuery} from 'react-query'
import {EditModalForm} from './EditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getDepartmentById} from '../core/_requests'

const EditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const response = useQuery(
    `${QUERIES.USERS_LIST}-item-${itemIdForUpdate}`,
    () => {
      return getDepartmentById(itemIdForUpdate)
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

  console.log(response,"tastdtastdsa")
  if (!itemIdForUpdate) {
    return <EditModalForm isDepartmentLoading={response.isLoading} item={{id: undefined}} />
  }

  if (!response.isLoading && !response.error && response.data) {
    return <EditModalForm isDepartmentLoading={response.isLoading} item={response.data} />
  }

  return null
}

export {EditModalFormWrapper}
