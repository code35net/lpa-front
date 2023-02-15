/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteThing} from '../../core/_requests'
import {useIntl} from 'react-intl'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteThing(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
    
    <div className='d-flex justify-content-end flex-shrink-0'>
    <Link className='btn btn-icon btn-success btn-active-light btn-sm me-1' to={`/my-quiz/join/${id}`}> 
        <KTSVG path='/media/icons/duotune/general/gen002.svg' className='svg-icon-3' />
        </Link>       
      </div>
      
    </>
  )
}

export {ActionsCell}
