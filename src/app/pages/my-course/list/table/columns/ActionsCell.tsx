/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {useIntl} from 'react-intl'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
    const intl = useIntl()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])


  return (
    <>
    
    <div className='d-flex justify-content-end flex-shrink-0'>
    <Link className='btn btn-icon btn-warning btn-active-light btn-sm me-1' to={`/term/list?courseId=${id}`}>
    <KTSVG path='/media/icons/duotune/general/gen033.svg' className='svg-icon-3' />
        </Link>
        

      </div>
      
    </>
  )
}

export {ActionsCell}
