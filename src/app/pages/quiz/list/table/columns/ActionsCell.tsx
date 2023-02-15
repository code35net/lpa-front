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
    <Link className='btn btn-icon btn-success btn-active-light btn-sm me-1' to={`/quiz/join?Id=${id}`}> 
        <KTSVG path='/media/icons/duotune/general/gen002.svg' className='svg-icon-3' />
        </Link>
        <a
          className='btn btn-icon btn-primary btn-active-light btn-sm me-1'
          
        >
          <KTSVG path='/media/icons/duotune/communication/com006.svg' className='svg-icon-3' />
        </a>

        <Link className='btn btn-icon btn-info btn-active-light btn-sm me-1' to={`/quiz/quiz-questions?Id=${id}`}> 
        <KTSVG path='/media/icons/duotune/general/gen046.svg' className='svg-icon-3' />
        </Link>

        <a
          className='btn btn-icon btn-warning btn-active-light btn-sm me-1'
          onClick={openEditModal}
        >
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>

        <a
          className='btn btn-icon btn-danger btn-active-light btn-sm'
          data-kt-users-table-filter='delete_row'
          onClick={async () => {
            Swal.fire({
              color : "#000000",
              title: (intl.formatMessage({id: "SWEETALERT.TITLE"})),
              text: (intl.formatMessage({id: "SWEETALERT.TEXT"})),
              icon: 'warning',
              // showCancelButton: true,
              // confirmButtonColor: '#000',
              // cancelButtonColor: 'primary',
              confirmButtonText: (intl.formatMessage({id: "SWEETALERT.CONFIRM"})),
              cancelButtonText: (intl.formatMessage({id: "SWEETALERT.CANCEL"}))
            }).then( async (result) => {
              if (result.isConfirmed) {
                await deleteItem.mutateAsync()
                Swal.fire({
                  title: (intl.formatMessage({id: "SWEETALERT.SUCCESS"})),
                  text: (intl.formatMessage({id: "SWEETALERT.DELETED"})),
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton:true
                })
                
              }
            })
            
          }}
        >
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </a>
      </div>
      
    </>
  )
}

export {ActionsCell}
