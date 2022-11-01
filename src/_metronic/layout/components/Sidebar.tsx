import clsx from 'clsx'
import {KTSVG} from '../../helpers'
import {useLayout} from '../core'
import {BestSellers, Orders, Stats, Tasks} from '../../partials'

const Sidebar = () => {
  const {classes} = useLayout()
  const sidebarCSSClass = classes.sidebar

  return (
    <div>
      {/* begin::Sidebar Content */}
      <div className='d-flex flex-column sidebar-body px-5 py-10' id='kt_sidebar_body'>
        {/* begin::Sidebar Nav */}
       
        
        {/* end::Sidebar Nav */}
      </div>
      {/* end::Sidebar Content */}

      {/* begin::Sidebar Content */}
      <div id='kt_sidebar_content'>
        <div
          className='hover-scroll-y'
          data-kt-scroll='false'
          data-kt-scroll-height='auto'
          data-kt-scroll-offset='0px'
          data-kt-scroll-dependencies='#kt_sidebar_tabs'
          data-kt-scroll-wrappers='#kt_sidebar_content, #kt_sidebar_body'
        >
          {/* begin::Tab content */}
          <div className='tab-content px-5 px-xxl-10'>
            {/* begin::Tab pane */}
            <div className='tab-pane fade' id='kt_sidebar_tab_1' role='tabpanel'>
              <Stats category='tasks' />
              <Tasks />
            </div>
            {/* end::Tab pane */}

            {/* begin::Tab pane */}
            <div className='tab-pane fade' id='kt_sidebar_tab_2' role='tabpanel'>
              <Stats category='orders' />
              <Orders />
            </div>
            {/* end::Tab pane */}

            {/* begin::Tab pane */}
            <div className='tab-pane fade show active' id='kt_sidebar_tab_3' role='tabpanel'>
              <Stats category='tickets' />
              <BestSellers />
            </div>
            {/* end::Tab pane */}

            {/* begin::Tab pane */}
            <div className='tab-pane fade' id='kt_sidebar_tab_4' role='tabpanel'>
              <Stats category='notifcations' />
              <Tasks />
            </div>
            {/* end::Tab pane */}

            {/* begin::Tab pane */}
            <div className='tab-pane fade' id='kt_sidebar_tab_5' role='tabpanel'>
              <Stats category='mail' />
              <Tasks />
            </div>
            {/* end::Tab pane */}
          </div>
          {/* end::Tab content */}
        </div>
      </div>
      {/* end::Sidebar Content */}
    </div>
  )
}

export {Sidebar}
