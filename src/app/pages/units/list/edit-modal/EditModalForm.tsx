import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createUnit, updateUnit} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {Field} from 'formik'
import {KTSVG} from '../../../../../_metronic/helpers'



type Props = {
  isUnitLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const EditModalForm: FC<Props> = ({item, isUnitLoading}) => {
  console.log(item,"test")
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [unitForEdit] = useState<Model>({
    name: undefined,
    unitType: undefined,
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
        {/* begin::Scroll */}
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
         
        </div>
      
      
        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'UNIT.LIST.NAME'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('name')}
            type='text'
            name='name'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.name && formik.errors.name},
              {
                'is-valid': formik.touched.name && !formik.errors.name,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUnitLoading}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.name}</span>
              </div>
            </div>
          )}
          
          {/* end::Input row */}
         
         
          {/* end::Input */}
        </div>
        <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
              {intl.formatMessage({id: 'UNIT.LIST.TYPE'})}
              </label>

              <div className='col-lg-8 fv-row'>
                <div className='d-flex align-items-center mt-3'>
                  <label className='form-check form-check-inline form-check-solid me-5'>
                    <input
                      className='form-check-input'
                      name='unitType'
                      type='radio'
                      value={0}
                      checked={formik.values.unitType === 0}
                      onChange={() => formik.setFieldValue("unitType",0)}
                    />
                    <span className='fw-bold ps-2 fs-6'>
                    {intl.formatMessage({id: 'UNIT.LIST.LINE'})}
                    </span>
                  </label>

                  <label className='form-check form-check-inline form-check-solid'>
                  <input
                      className='form-check-input'
                      name='unitType'
                      type='radio'
                      value={1}
                      checked={formik.values.unitType === 1}
                      onChange={() => formik.setFieldValue("unitType",1)}
                    />
                    <span className='fw-bold ps-2 fs-6'>
                    {intl.formatMessage({id: 'UNIT.LIST.OPERATOR'})}
                    </span>
                  </label>
                </div>
              </div>
            </div>
        {/* begin::Input group */}
        
        {/* end::Input group */}
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting || isUnitLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-items-modal-action='submit'
            disabled={isUnitLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            {(formik.isSubmitting || isUnitLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUnitLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
