/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { Link } from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

import moment from 'moment'
type Props = {
  item: Model
}

const CreatedCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className='text-gray-800'>
        {moment(item.theDay).format("DD.MM.YYYY")}
      </span>
    </div>
  </div>
)

export {CreatedCell}
