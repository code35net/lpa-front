/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: Model
}

const PositionCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {item.departmentName}
      </a>
    </div>
    <div className='d-flex flex-column'>
      /
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {item.sectionName}
      </a>
    </div>
  </div>
)

export {PositionCell}
