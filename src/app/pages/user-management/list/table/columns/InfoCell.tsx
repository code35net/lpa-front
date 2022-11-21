/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import { Link } from 'react-router-dom'


type Props = {
  item: Model
}

const InfoCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    
    <div className='d-flex flex-column'>
    <Link to={`/user-manager/userdetails?Id=${item.id}`}> {item.email}</Link>
      {/* <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {item.email}
      </a> */}
    </div>
  </div>
)

export {InfoCell}
