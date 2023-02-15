/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import { Certificate} from '../../core/_models'
import { Link } from 'react-router-dom'

type Props = {
  item: string
}

const InfoCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className='text-gray-800'>
      {item}
      </span>
    </div>
  </div>
  
)

export {InfoCell}
