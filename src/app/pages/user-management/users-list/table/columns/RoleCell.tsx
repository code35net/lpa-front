/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: Model
}

const RoleCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    
    <div className='d-flex flex-column'>
        {item.roleName}
      {/* <span>{item.email}</span> */}
    </div>
  </div>
)

export {RoleCell}