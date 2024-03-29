/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: any
}

const DefCell: FC<Props> = ({item}) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 text-hover-primary'>
          {item.definition == 'null' || item.status == 2 || item.definition == null
            ? '-'
            : item.definition}
        </span>
      </div>
    </div>
  )
}

export {DefCell}
