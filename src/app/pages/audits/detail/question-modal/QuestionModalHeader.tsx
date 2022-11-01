import { FC } from "react"
import { useIntl } from "react-intl"
import { KTSVG } from "../../../../../_metronic/helpers"
import { useListView } from "../../list/core/ListViewProvider"
import { Model } from "../../list/core/_models"



const QuestionModalHeader: FC<any> = (props :{showModal : boolean, setShowModal : Function}) => {
 
  const intl = useIntl()
  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>
      {"Question Detail"}
      </h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-items-modal-action='close'
        onClick={() =>  props.setShowModal(false)}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {QuestionModalHeader}
