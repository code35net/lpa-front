import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'

import {Field} from 'formik'
import {KTSVG} from '../../../../../_metronic/helpers'
import clsx from 'clsx'
import { updateUnit, createUnit } from '../../../units/list/core/_requests'
import { ListLoading } from '../../list/components/loading/ListLoading'
import { useListView } from '../../list/core/ListViewProvider'
import { useQueryResponse } from '../../list/core/QueryResponseProvider'
import { Model } from '../../list/core/_models'



type Props = {
  isUnitLoading?: boolean
  item: Model
}

const editchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const QuestionModalForm: FC<Props> = ({item}) => {

  console.log(item,"soru buraya geldi bakx")
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [unitForEdit] = useState<Model>({
    ...item,
   
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik = useFormik({
    initialValues: unitForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
     
      
      

      try {
        if (isNotEmpty(values.id)) {
          await updateUnit(values)
        } else {
          await createUnit(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_item_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_item_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_item_header'
          data-kt-scroll-wrappers='#kt_modal_add_item_scroll'
          data-kt-scroll-offset='300px'
        >
          

        {/* begin::Input group */}
        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id:'HOLIDAY.LIST.WHATDAY'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('whatDay')}
            type='text'
            name='whatDay'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.auditName && formik.errors.auditName},
              {
                'is-valid': formik.touched.auditName && !formik.errors.auditName,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting}
          />
          {formik.touched.auditName && formik.errors.auditName && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.auditName}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>
        
        

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-items-modal-action='submit'
            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            {(formik.isSubmitting) && (
              <span className='indicator-progress'>
                {intl.formatMessage({id: 'AUDITS.DETAIL.MODAL.WAIT'})}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        </div>
      </form>
      
    </>
  )
}

export {QuestionModalForm}
