/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { Link } from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: Model
}

const StatusCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
    <span className='text-gray-800 text-hover-primary'>
    {item.status == 0 ? "Not Started" : item.status == 1 ? "In Progress" : "Finished" }
    
      </span>
    </div>
  </div>
)

export {StatusCell}
