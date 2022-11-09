import {KTSVG} from '../../../../../_metronic/helpers'
import {FC, useState} from 'react'
import {Model} from '../core/_models'

import {useListView} from '../core/ListViewProvider'
import {useIntl} from 'react-intl'


type Props = {
  item?: Model
}

const EditModalHeader: FC<Props> = ({item}) => {
  const {setItemIdForUpdate} = useListView()
  const intl = useIntl()
  console.log(item,"test")
  const [placeForEdit] = useState<Model>({
    ...item,
    fullname: item?.fullname || item?.fullname,
  })
  
  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>
      {item?.id ? "EditStaff List " : "Add Staff List"}
      </h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-items-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {EditModalHeader}
