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
      <span className='text-gray-800 text-hover-primary'>
       
      {item.unitType == 1 ? (
        'Operatör'
      ) : item.unitType == 2 ? 'Unit Group' : (
        'Hat'
      )}
         {/* {
          item.unitType ==  "Hat" ? "Operatör"
         } */}



      </span>
    </div>
  </div>
)

export {TypeCell}
