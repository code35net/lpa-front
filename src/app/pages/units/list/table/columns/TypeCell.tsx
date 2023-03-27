/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: Model
}

const TypeCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    
    <div className='d-flex flex-column'>
  

    {
      (item.unitType == null) ? (
        '-'
      ) : null
    }
    {
      (item.unitType == 0) ? (
        'Hat'
      ) : null
    }
    {
      (item.unitType == 1) ? (
        'Operatör'
      ) : null
    }
    {
      (item.unitType == 2) ? (
        'Setter'
      ) : null
    }
  
    
    
      
      
    </div>
  </div>
)

export {TypeCell}
