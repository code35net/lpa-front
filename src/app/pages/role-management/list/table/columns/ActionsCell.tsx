/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteRole} from '../../core/_requests'
import {useIntl} from 'react-intl'
type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const intl = useIntl()
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteRole(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
    
        <div className='d-flex justify-content-end flex-shrink-0'>
          
        <a className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <Link to={`/role-management/permissions/${id}`}>{intl.formatMessage({id: 'USER.TABLE.AUTHORITY'})}</Link>
          </a>

          {/* <a className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
           onClick={openEditModal}
           >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </a> */}

        </div>
      
    </>
  )
}

export {ActionsCell}
