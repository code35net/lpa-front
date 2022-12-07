/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { Link } from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import {useIntl} from 'react-intl'
type Props = {
  item: Model
}

const StatusCell: FC<Props> = ({item}) => { 
  const intl = useIntl()
  return (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
    <span className='text-gray-800 text-hover-primary'>
    {item.status == 0 ? `${intl.formatMessage({id: 'ACTION.TABLE.NOTSTART'})}` : item.status == 1 ? `${intl.formatMessage({id: 'ACTION.TABLE.PROGRESS'})}`: `${intl.formatMessage({id: 'ACTION.TABLE.FINISHED'})}` }
    
      </span>
    </div>
  </div>
  )
}

export {StatusCell}
