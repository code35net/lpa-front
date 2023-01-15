/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from 'react-router-dom'
import {useIntl} from 'react-intl'

import {useAuth} from '../../../../app/modules/auth'
import {toAbsoluteUrl} from '../../../helpers'
import {Languages} from '../header-menus/Languages'

const UserMenu = () => {
  const {currentUser, logout} = useAuth()
  const intl = useIntl()

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      {/* begin::Menu item */}
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
         
         
          {/* begin::Username */}
          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.userName} {currentUser?.email}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.userName}
            </a>
          </div>
          {/* end::Username */}
        </div>
      </div>
      {/* end::Menu item */}

      {/* begin::Menu separator */}
      <div className='separator my-2'></div>
      {/* end::Menu separator */}

     

      <Languages languageMenuPlacement='right-end' />

     
     

      {/* begin::Menu item */}
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
        {intl.formatMessage({id: 'USERMENU.SIGNOUT'})}
        </a>
      </div>
    </div>
  )
}

export {UserMenu}
