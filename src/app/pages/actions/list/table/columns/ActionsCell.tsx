/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteAction} from '../../core/_requests'
import {useAuth} from '../../../../../modules/auth'

type Props = {
  item: any
}

const ActionsCell: FC<Props> = ({item}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  const {currentUser} = useAuth()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(item.id)
  }

  const deleteItem = useMutation(() => deleteAction(item.id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <div className='d-flex justify-content-end flex-shrink-0'>
        {currentUser?.id == item?.assignedUserId && item?.status == 1 ? (
          <a className='btn btn-icon btn-bg-secondary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </a>
        ) : (
          <>
            {currentUser?.id == item?.auditorId && item?.status == 0 ? (
              <a className='btn btn-icon btn-bg-secondary btn-sm me-1'>
                <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
              </a>
            ) : (
              <a
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                onClick={openEditModal}
              >
                <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
              </a>
            )}
          </>
        )}
      </div>
    </>
  )
}

export {ActionsCell}
