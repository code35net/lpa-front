import React, {useState, useRef, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import clsx from 'clsx'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {FileUploader} from 'react-drag-drop-files'
import Swal from 'sweetalert2'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {StepperComponent} from '../../../../../../_metronic/assets/ts/components'
import {
  defaultCreateAppData,
  ICreateAppData,
} from '../../../../../../_metronic/partials/modals/create-app-stepper/IAppModels'
import moment from 'moment'
import {updateAuditDate} from '../../core/_requests'
import {useQueryResponse} from '../../core/QueryResponseProvider'

type Props = {
  item: any
  show: boolean
  handleClose: () => void
}

const fileTypes = ['PDF', 'MP4', 'ZIP']
const fileTypes2 = ['ZIP']

const modalsRoot = document.getElementById('root-modals') || document.body

const editchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const EditModal = ({item, show, handleClose}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [data, setData] = useState<ICreateAppData>(defaultCreateAppData)
  const [hasError, setHasError] = useState(false)
  const intl = useIntl()
  const [file, setFile] = useState<any>([])
  //   const [trigger, setTrigger] = React.useState(0)
  const {refetch} = useQueryResponse()

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const updateData = (fieldsToUpdate: Partial<ICreateAppData>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  const checkAppBasic = (): boolean => {
    if (!data.appBasic.appName || !data.appBasic.appType) {
      return false
    }
    return true
  }

  const checkAppDataBase = (): boolean => {
    if (!data.appDatabase.databaseName || !data.appDatabase.databaseSolution) {
      return false
    }

    return true
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()
  }

  const nextStep = () => {
    setHasError(false)
    if (!stepper.current) {
      return
    }

    if (stepper.current.getCurrentStepIndex() === 1) {
      if (!checkAppBasic()) {
        setHasError(true)
        return
      }
    }

    if (stepper.current.getCurrentStepIndex() === 3) {
      if (!checkAppDataBase()) {
        setHasError(true)
        return
      }
    }

    stepper.current.goNext()
  }

  const submit = () => {
    window.location.reload()
  }
  //   console.log(item)
  //   const [name, setName] = React.useState('')
  //   const [text, setText] = React.useState('')

  //   useEffect(() => {
  //     setName(item?.name)
  //     setText(item?.text)
  //   }, [item])

  //   const reset = () => {
  //     setName('')
  //     setText('')
  //   }

  //   console.log(item)

  //   const update = () => {
  //     let obj = {id: item.id, name: name, text: text}
  //     updateCourse(obj).then((res: any) => {
  //       //   setTrigger(Math.floor(Math.random() * 10000) + 1)
  //       handleClose()
  //     })
  //   }

  //   ??????

  //   const {setItemIdForUpdate} = useListView()

  const [auditDate, setAuditDate] = React.useState([])
  const [lessons, setlessons] = React.useState([])

  useEffect(() => {
    setAuditDate(item.auditDate)
  }, [item])

  console.log(item)
  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
    }
    // setItemIdForUpdate(undefined)
  }

  const handleFileChange = (file: any) => {
    if (file) {
      setFile(file)
    }
  }

  const dateUpdate = () => {
    item.auditDate = auditDate
    let payload = {
      auditDate: auditDate,
    }
    updateAuditDate(payload, item.id).then((res: any) => {
      return handleClose(), refetch()
    })
  }
  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-650px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
    >
      <div className='modal-header'>
        <h2> {intl.formatMessage({id: 'Date_Update'})}</h2>

        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='px-10 py-5'>
          <div className='card-body px-2 py-9'>
            {' '}
            <div className='fv-row mb-7'>
              {/* begin::Label */}
              <label className='required fw-bold fs-6 mb-2'>
                {intl.formatMessage({id: 'AUDITS.LIST.DATE'})}
              </label>
              {/* end::Label */}

              {/* begin::Input */}
              <input
                //placeholder='Full name'

                type='datetime-local'
                name='auditDate'
                value={moment(auditDate).format('YYYY-MM-DD HH:mm')}
                className='form-control form-control-solid mb-3 mb-lg-0'
                autoComplete='off'
                onChange={(e: any) => setAuditDate(e?.target.value)}
              />

              {/* end::Input */}
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <button
              type='submit'
              className='btn btn-primary'
              data-kt-items-modal-action='submit'
              data-kt-menu-dismiss='true'
              onClick={(e: any) => dateUpdate()}
            >
              <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {EditModal}
