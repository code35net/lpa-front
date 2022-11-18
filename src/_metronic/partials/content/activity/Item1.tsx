/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

const Item1: FC = () => {
  return (
    <div className='timeline-item'>
      <div className='timeline-line w-40px'></div>

     

      <div className='timeline-content mb-10 mt-n1'>
        

        <div className='overflow-auto pb-5 mt-5'>
          <div className='d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5'>
            <a href='#' className='fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px'>
              Meeting with customer
            </a>

            <div className='min-w-175px pe-2'>
              <span className='badge badge-light text-muted'>Application Design</span>
            </div>

            <div className='symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2'>
              <div className='symbol symbol-circle symbol-25px'>
                <img src={toAbsoluteUrl('/media/avatars/300-2.jpg')} alt='img' />
              </div>

              <div className='symbol symbol-circle symbol-25px'>
                <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='img' />
              </div>

              <div className='symbol symbol-circle symbol-25px'>
                <div className='symbol-label fs-8 fw-bold bg-primary text-inverse-primary'>A</div>
              </div>
            </div>

            <div className='min-w-125px pe-2'>
              <span className='badge badge-light-primary'>In Progress</span>
            </div>

            <a href='#' className='btn btn-sm btn-light btn-active-light-primary'>
              View
            </a>
          </div>

          <div className='d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-0'>
            <a href='#' className='fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px'>
              Project Delivery Preparation
            </a>

            <div className='min-w-175px'>
              <span className='badge badge-light text-muted'>CRM System Development</span>
            </div>

            <div className='symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px'>
              <div className='symbol symbol-circle symbol-25px'>
                <img src={toAbsoluteUrl('/media/avatars/300-20.jpg')} alt='img' />
              </div>

              <div className='symbol symbol-circle symbol-25px'>
                <div className='symbol-label fs-8 fw-bold bg-success text-inverse-primary'>B</div>
              </div>
            </div>

            <div className='min-w-125px'>
              <span className='badge badge-light-success'>Completed</span>
            </div>

            <a href='#' className='btn btn-sm btn-light btn-active-light-primary'>
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Item1}
