import {useQuery} from 'react-query'
import {EditModalForm} from './EditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getThingById} from '../core/_requests'

const EditModalFormWrapper = () => {
  const {itemIdForUpdate2, setItemIdForUpdate2} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate2)
  const {
    isLoading,
    data: item,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-item-${itemIdForUpdate2}`,
    () => {
      return getThingById(itemIdForUpdate2)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        if(setItemIdForUpdate2 != undefined) setItemIdForUpdate2(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate2) {
    return <EditModalForm isThingLoading={isLoading} item={{id: undefined}} />
  }

  if (!isLoading && !error && item) {
    return <EditModalForm isThingLoading={isLoading} item={item} />
  }

  return null
}

export {EditModalFormWrapper}