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
      <a href='#' className='text-gray-800 text-hover-primary'>
       
      {item.unitType ? (
        'Operatör'
      ) : (
        'Hat'
      )}
         {/* {
          item.unitType ==  "Hat" ? "Operatör"
         } */}



      </a>
    </div>
  </div>
)

export {TypeCell}
