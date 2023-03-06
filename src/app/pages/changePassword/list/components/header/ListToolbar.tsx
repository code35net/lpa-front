import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import { Link } from 'react-router-dom'

const ListToolbar = () => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const openAddModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-item-table-toolbar='base'>


<Link className='btn btn-sm btn-dark btn-active-light-dark ' to={`/user-management/newuser`}> 
<KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'USERS.ADD'})}
</Link> 
      {/* begin::Add Places */}
      {/* <button
        type='button'
        className='btn btn-sm btn-dark btn-active-light-dark '
        onClick={openAddModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'USERS.ADD'})}
      </button> */}
      
    </div>
  )
}

export {ListToolbar}
