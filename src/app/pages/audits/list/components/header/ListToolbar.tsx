

import {ListFilter} from './ListFilter'
import { Link } from 'react-router-dom'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Languages} from '../../../../../../_metronic/partials/layout/header-menus/Languages'

const ListToolbar = () => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const openAddModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-item-table-toolbar='base'>
      <ListFilter />
      {/* begin::Add Places */}
      <Link className='btn btn-sm btn-dark btn-active-light-dark me-3' to={`../OpPlanner`}>{intl.formatMessage({id: 'AUDITS.LIST.ADD_OP'})}</Link>
      <Link className='btn btn-sm btn-dark btn-active-light-dark' to={`../Planner`}>{intl.formatMessage({id: 'AUDITS.LIST.ADD'})}</Link>
      {/* <a href='Planner'
        type='button'
        className='btn btn-sm btn-dark btn-active-light-dark'
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'AUDITS.LIST.ADD'})}
      </a> */}
      {/* end::Add Places */}
    </div>
  )
}

export {ListToolbar}
