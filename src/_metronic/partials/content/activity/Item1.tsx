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
            <span className='fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px'>
              Meeting with customer
            </span>
            <span className='fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px'>
              Meeting with customer
            </span>
            <span className='fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px'>
              Meeting with customer
            </span>
            <span className='fs-5 text-dark text-hover-primary fw-bold w-375px min-w-200px'>
              Meeting with customer
            </span>

            

            
          </div>


        </div>
      </div>
    </div>
  )
}

export {Item1}
