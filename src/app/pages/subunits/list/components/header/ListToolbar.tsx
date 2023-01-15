import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Languages} from '../../../../../../_metronic/partials/layout/header-menus/Languages'
import { Link, useLocation } from 'react-router-dom'
import qs from 'qs'


//const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
//const qsd2 = qs.parse(window.location.search, { ignoreQueryPrefix: true }).parentUnitId

const ListToolbar = () => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const openAddModal = () => {
    setItemIdForUpdate(null)
  }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qsd = searchParams.get("sectionId");
  const qsdpuid = searchParams.get("parentUnitId");
  return (
    <div className='d-flex justify-content-end' data-kt-item-table-toolbar='base'>
      
      <Link className='btn btn-sm btn-dark btn-active-light-dark  me-3' to={`../Add?sectionId=${qsd}&parentUnitId=${qsdpuid}`}>
      <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'UNIT.LIST.BULKADD'})}
        </Link>
     
      {/* begin::Add Places */}
      <button
        type='button'
        className='btn btn-sm btn-dark btn-active-light-dark '
        onClick={openAddModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'UNIT.LIST.ADD'})}
      </button>
      {/* end::Add Places */}
     
    </div>
  )
}

export {ListToolbar}
