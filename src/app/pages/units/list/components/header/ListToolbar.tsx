import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Languages} from '../../../../../../_metronic/partials/layout/header-menus/Languages'
import { Link } from 'react-router-dom'
import qs from 'qs'


const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId

const ListToolbar = () => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const openAddModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-item-table-toolbar='base'>
     <Link className='btn btn-sm btn-dark btn-active-light-dark  me-3' to={`../Add?sectionId=${qsd}`}>
      <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'UNIT.LIST.BULKADD'})}
        </Link>
     
     
      <button
        type='button'
        className='btn btn-sm btn-dark btn-active-light-dark '
        onClick={openAddModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'UNIT.LIST.ADD'})}
      </button>
      

      
    </div>
  )
}

export {ListToolbar}
