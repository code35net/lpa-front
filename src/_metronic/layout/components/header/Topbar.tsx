import {KTSVG} from '../../../helpers'
import {Search, ThemeModeSwitcher} from '../../../partials'
import {Languages} from '../../../partials/layout/header-menus/Languages'

const Topbar = () => {
  return (
    <div className='d-flex align-items-center flex-shrink-0'>

      <Search
        className='w-lg-250px'
        mobileToggleBtnClass='btn btn-icon btn-color-gray-700 btn-active-color-primary btn-outline btn-outline-secondary w-40px h-40px'
      />


      <div className='d-flex align-items-center ms-3 ms-lg-4'>

        <div
          className='btn btn-icon btn-color-gray-700 btn-active-color-primary btn-outline btn-outline-secondary w-40px h-40px position-relative'
          id='kt_activities_toggle'
        >
          <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
        </div>

      </div>
     
      <div className={'d-flex align-items-center ms-3 ms-lg-4'}>
        <ThemeModeSwitcher toggleBtnClass='btn-color-gray-700 btn-active-color-primary btn-outline btn-outline-secondary w-40px h-40px' />
      </div>
      
      
      
    </div>
  )
}

export {Topbar}
