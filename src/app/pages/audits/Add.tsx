import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model} from '../change-requests/list/core/_models'
import clsx from 'clsx'
import {useListView} from '../change-requests/list/core/ListViewProvider'
import {ListLoading} from '../change-requests/list/components/loading/ListLoading'
import {createThing, updateThing} from '../change-requests/list/core/_requests'
import {useQueryResponse} from '../change-requests/list/core/QueryResponseProvider'
import {useQueryRequest} from '../change-requests/list/core/QueryRequestProvider'
import {getThingById} from '../units/list/core/_requests'
import {listThings as listUnits} from '../units/list/core/_requests'
import {useParams} from 'react-router-dom'
import {listSomeThings as listPartialUnits} from '../units/list/core/_requests'
import {getAuditById, listUnits2} from '../audits/list/core/_requests'
import {useNavigate} from 'react-router-dom'

const editchema = Yup.object().shape({
  // name: Yup.string()
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Thing Name required'),
})

const ChangeRequestPage: FC = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const {state} = useQueryRequest()

  const [parentUnitId, setParentUnitId] = React.useState([])
  const [userId, setUserId] = React.useState([])
  const [unitId, setUnitId] = React.useState([])
  const [auditCategoryId, setAuditCategoryId] = React.useState('')
  const [operators, setOperators] = React.useState([])

  const [placeForEdit] = useState<Model>({
    text: undefined,
    auditId: undefined,
    unitId: undefined,
    isAccepted: false,
  })

  const params = useParams()

  useEffect(() => {
    // getAuditById(parseInt(params.auditId || '0')).then((res: any) => {
    //   //setAuditCategoryId(res?.auditCategoryId)
    //   listPartialUnits(res.auditCategoryId, params.auditId).then((res2) => {
    //     setUnitId(res2.data || [])
    //   })
    // })
    getAuditById(parseInt(params.auditId || '0')).then((res: any) => {
      getThingById(res.unitId).then((res2: any) => {
        listUnits2(res2.parentUnitId, params.auditId).then((res3: any) => {
          setOperators(res3.data)
        })
      })
    })
  }, [params.auditId])

  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)

      values.auditId = parseInt(params.auditId || '0')
      await createThing(values)
    },
  })

  const options = {value: 'chocolate', label: 'Chocolate'}

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div
          className='card-header border-0'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'AUDIT_CHANGE_REQUEST'})}</h3>
          </div>
        </div>

        <div>
          <form
            id='kt_modal_add_item_form'
            className='form'
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div
              className='d-flex flex-column scroll-y me-n7 pe-7'
              id='kt_modal_add_item_scroll'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_modal_add_item_header'
              data-kt-scroll-wrappers='#kt_modal_add_item_scroll'
              data-kt-scroll-offset='300px'
            ></div>

            {/* <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>
                {intl.formatMessage({id: 'AUDIT_CHANGE_UNIT'})}
              </label>
              <select
                className='form-select form-multi form-select-solid form-select-md'
                {...formik.getFieldProps('unitId')}
                value={formik.values.unitId}
              >
                <option value=''>Seçiniz</option>

                {unitId.map((unit: any) => (
                  <option value={unit?.id} key={unit?.id as any}>
                    {unit?.name as any}
                  </option>
                ))}
              </select> 
            </div> */}

            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>
                {intl.formatMessage({id: 'AUDIT_CHANGE_UNIT'})}
              </label>
              <select
                className='form-select form-multi form-select-solid form-select-md'
                {...formik.getFieldProps('unitId')}
                value={formik.values.unitId}
              >
                <option value=''>Seçiniz</option>

                {operators.map((unit: any) => (
                  <option value={unit?.id} key={unit?.id as any}>
                    {unit?.name as any}
                  </option>
                ))}
              </select>
            </div>

            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>
                {intl.formatMessage({id: 'AUDIT_CHANGE_TEXT'})}
              </label>

              <input
                //placeholder='Full name'
                {...formik.getFieldProps('text')}
                type='text'
                name='text'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.text && formik.errors.text},
                  {
                    'is-valid': formik.touched.text && !formik.errors.text,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting}
              />
              {formik.touched.text && formik.errors.text && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.text}</span>
                  </div>
                </div>
              )}
            </div>

            <div className='text-center pt-15'>
              <button
                type='submit'
                onClick={() => {
                  formik.submitForm().then(() => {
                    navigate('/audits/list')
                  })
                }}
                className='btn btn-sm btn-info'
                data-kt-items-modal-action='submit'
                disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
              >
                <span className='indicator-label'> {intl.formatMessage({id: 'FORM.SAVE'})}</span>
                {formik.isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
            {/* end::Actions */}
          </form>
          {formik.isSubmitting && <ListLoading />}
        </div>
      </div>
    </>
  )
}

export {ChangeRequestPage}
