/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: Model
}

const InfoCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <Link
        onClick={() => {
          localStorage.setItem('department-name-breadcrumb', (item as any)?.name)
        }}
        to={`/sections/list?departmentId=${item.id}`}
      >
        {item.name}
      </Link>
      {/* <a href='/positions/{item.id}' className='text-gray-800 text-hover-primary'>
        {item.name}
      </a> */}
    </div>
  </div>
)

export {InfoCell}
