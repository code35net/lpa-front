/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import {useIntl} from 'react-intl'

type Props = {
  item: Model
}



const ShiftCell: FC<Props> = ({item}) => { 
  const intl = useIntl()
  return (<div className='d-flex align-items-center'>
  {/* begin:: Avatar */}
  
  <div className='d-flex flex-column'>
      {intl.formatMessage({id: 'USER.SHIFT.'+item.shift})}
  </div>
</div>)
}



  
  

export {ShiftCell}
