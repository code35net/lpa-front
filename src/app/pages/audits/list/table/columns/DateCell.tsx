/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import { format } from "date-fns";
import moment from 'moment'

type Props = {
  item: Model
}

const DateCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className='text-gray-800 text-hover-primary'>
     
     
      {moment(item.auditDate).format("DD.MM.YYYY HH:mm")}
      </span>
    </div>
    
  </div>
  
)

export {DateCell}
