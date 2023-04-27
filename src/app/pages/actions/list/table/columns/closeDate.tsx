/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: any
}

const CloseDateCell: FC<Props> = ({item}) => {
  console.log(item)
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 text-hover-primary'>
          {item == '1.01.0001' || !item ? '-' : item}
        </span>
      </div>
    </div>
  )
}

export {CloseDateCell}
