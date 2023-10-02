/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteAudit} from '../../core/_requests'
import {useAuth} from '../../../../../../app/modules/auth'
import {useLocation, Link} from 'react-router-dom'
import {EditModal} from './DateUpdateModal'

type Props = {
  item: any
  isChanged: boolean
}

const ActionsCell: FC<Props> = ({item, isChanged}) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  console.log(item)
  const {currentUser} = useAuth()

  const auditDate = new Date(item?.auditDate)
  const currentDate = new Date()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(item.id)
  }

  const deleteItem = useMutation(() => deleteAudit(item.id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return currentUser?.roleName == 'Key Account' ? (
    <>
      <div className='d-flex justify-content-end flex-shrink-0'>
        {!isChanged && (
          <Link
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            to={`/audits/change-request/${item.id}`}
          >
            <KTSVG path='/media/icons/duotune/art/art006.svg' className='svg-icon-3' />
          </Link>
        )}
        {isChanged && (
          <Link
            aria-disabled
            className='btn btn-icon btn-danger btn-active-color-danger btn-sm me-1'
            to={'#'}
          >
            <KTSVG path='/media/icons/duotune/art/art006.svg' className='svg-icon-3' />
          </Link>
        )}

        <a
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          onClick={openEditModal}
        >
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>

        <a
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          data-kt-users-table-filter='delete_row'
          onClick={async () => await deleteItem.mutateAsync()}
        >
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </a>
      </div>
    </>
  ) : (
    <div className='d-flex gap-2'>
      {item.statusEnum == 0 ? (
        <>
          <button
            type='button'
            className={`btn btn-sm btn-icon btn-light btn-active-color-primary`}
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            id='kt_toolbar_primary_button'
            onClick={() => setShowCreateAppModal(true)}
          >
            <KTSVG path='/media/icons/duotune/general/gen014.svg' className='svg-icon-3' />
          </button>
          <EditModal
            item={item}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
          />
        </>
      ) : null}

      {!isChanged && (
        <Link
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          to={`/audits/change-request/${item.id}`}
        >
          <KTSVG path='/media/icons/duotune/art/art006.svg' className='svg-icon-3' />
        </Link>
      )}
      {isChanged && (
        <Link
          aria-disabled
          className='btn btn-icon btn-danger btn-active-color-danger btn-sm me-1'
          to={'#'}
        >
          <KTSVG path='/media/icons/duotune/art/art006.svg' className='svg-icon-3' />
        </Link>
      )}
      {auditDate < currentDate ? (
        <Link to={`/audits/auditquestions/${item.id}`} className='btn btn-sm btn-icon btn-dark '>
          <KTSVG path='/media/icons/duotune/general/gen016.svg' className='svg-icon-3' />
        </Link>
      ) : null}
    </div>
  )
}

export {ActionsCell}
