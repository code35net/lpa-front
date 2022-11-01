/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useLayout} from '../core'

const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      {/* begin::Container */}
      <div className={`${classes.footerContainer} d-flex flex-column flex-md-row flex-stack`}>
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1'>
          <span className='text-gray-400 fw-bold me-1'>Powered by</span>
          
          <a href='http://code35.net' target='_blank' className='text-muted text-hover-primary fw-bold me-2 fs-6'> CODE35 | A Software Company
          </a>
        </div>
        {/* end::Copyright */}

        {/* begin::Menu */}
        
        {/* end::Menu */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Footer}
