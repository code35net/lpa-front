import {useQuery} from 'react-query'
import {EditModalForm} from './EditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getAnswerTemplatesById} from '../core/_requests'

const EditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: item,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-item-${itemIdForUpdate}`,
    () => {
      return getAnswerTemplatesById(itemIdForUpdate)
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

  if (!itemIdForUpdate) {
    return <EditModalForm isTemplateLoading={isLoading} item={{id: undefined}} />
  }

  if (!isLoading && !error && item) {
    return <EditModalForm isTemplateLoading={isLoading} item={item} />
  }

  return null
}

export {EditModalFormWrapper}
