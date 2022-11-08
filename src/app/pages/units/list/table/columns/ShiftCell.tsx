/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: Model
}

const ShiftCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className='text-gray-800 text-primary'>
        {item.shift == 0 ? "Morning" : item.shift == 1 ? "Day" : "Night" }
      </span>
    </div>
    
  </div>
)

export {ShiftCell}
