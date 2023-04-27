/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useAuth} from '../../../../app/modules/auth'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {UserMenu} from '../user-menu/UserMenu'
import {Link} from 'react-router-dom'
import {useIntl} from 'react-intl'

const AsideUserMenu: FC = () => {
  const {currentUser} = useAuth()

  const fileUrl = 'http://freudapi.iqualitor.com/Files/file/Freudenberg_Admin.pdf'
  const fileUrl2 = 'http://freudapi.iqualitor.com/Files/file/Freudenberg_Auditor.pdf'
  const intl = useIntl()
  return (
    <div className='d-flex flex-col' style={{width: '100%', flexDirection: 'column'}}>
      <div className='d-flex flex-stack' style={{width: '100%'}}>
        {/* begin::Wrapper */}
        <div className='d-flex align-items-center'>
          {/* begin::Avatar */}
          {/* <div className='symbol symbol-circle symbol-40px'>
            <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='avatar' />
          </div> */}
          {/* end::Avatar */}
          {/* begin::User info */}
          <div className='ms-2'>
            <Link
              className='text-gray-800 text-hover-primary fs-6 fw-bolder lh-1'
              to={`/change-password`}
            >
              {' '}
              {currentUser?.fullName}
            </Link>
            {/* <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bolder lh-1'>
              {currentUser?.fullName}
            </a> */}
            <span className='text-muted fw-bold d-block fs-7 lh-1'> {currentUser?.email}</span>
          </div>

          {/* end::User info */}
        </div>

        {/* end::Wrapper */}

        {/* begin::User menu */}
        <div className='ms-1'>
          <div
            className='btn btn-sm btn-icon btn-active-color-primary position-relative me-n2'
            data-kt-menu-trigger='click'
            data-kt-menu-overflow='false'
            data-kt-menu-placement='top-end'
          >
            <KTSVG path='/media/icons/duotune/coding/cod001.svg' className='svg-icon-1' />
          </div>
          <UserMenu />
        </div>

        {/* end::User menu */}
      </div>
      {currentUser?.roleName == 'Key Account' ? (
        <div style={{marginTop: '5px', marginLeft: '6px'}}>
          <a href={fileUrl} target='_blank' rel='noopener noreferrer' className='fs-8'>
            {intl.formatMessage({id: 'Doc'})}
          </a>
        </div>
      ) : (
        <div style={{marginTop: '5px', marginLeft: '6px'}}>
          <a href={fileUrl2} target='_blank' rel='noopener noreferrer' className='fs-8'>
            {intl.formatMessage({id: 'Doc'})}
          </a>
        </div>
      )}
    </div>
  )
}

export {AsideUserMenu}
