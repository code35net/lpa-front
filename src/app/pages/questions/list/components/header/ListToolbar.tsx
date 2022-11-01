import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Languages} from '../../../../../../_metronic/partials/layout/header-menus/Languages'
import {ListFilter} from './ListFilter'

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
      <a href='Add'
        type='button'
        className='btn btn-sm btn-dark btn-active-light-dark '
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'QUESTIONS.LIST.ADD'})}
      </a>
      {/* end::Add Places */}
    </div>
  )
}

export {ListToolbar}
