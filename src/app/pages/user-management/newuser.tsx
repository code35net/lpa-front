import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model} from './list/core/_models'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik, validateYupSchema} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'


import {listThings as listUnits} from '../units/list/core/_requests'
import {listOtherThings as listOtherUnits} from '../units/list/core/_requests'
import {listThings as listPositions} from '../position/list/core/_requests'
import {useQueryResponse} from './list/core/QueryResponseProvider'
import {useListView} from './list/core/ListViewProvider'
import {createUser} from './list/core/_requests'

type Props = {
  //    isPlaceLoading: boolean
  item?: Model
}

const editchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .required('Email required'),
  fullName: Yup.string()
     .max(50, 'Maximum 50 symbols')
    .required('Fullname required'),
  identity: Yup.string()
    .max(50, 'Maximum 50 symbols')
   .required('Identity required'),
  unitId: Yup.string()
  .required('Section required'),
  positionId: Yup.string()
  .required('Position required'),
})

const UserEditForm: FC<Props> = ({item}) => {
    

  const navigate = useNavigate()
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [units, setUnits] = React.useState([])
  const [otherunits, setOtherUnits] = React.useState([])
  const [positions, setPositions] = React.useState([])

  useEffect(() => {
    listUnits().then((res) => {
      if (res?.data?.length) {
        setUnits(res.data || [])
      }
    })

    listPositions().then((res) => {
      if (res?.data?.length) {
        setPositions(res.data || [])
      }
    })
   
  }, [])

  const [formForEdit] = useState<Model>({
    ...item,
    email: undefined,
    role: undefined,
    fullName:undefined,
    identity: undefined,
    positionId:undefined,
    unitId:undefined, 
    parentUnitId:undefined
    })

  //   const updateData = (fieldsToUpdate: Partial<Model>): void => {
  //     const updatedData = Object.assign(data, fieldsToUpdate)
  //     setData(updatedData)
  //   }

  
const handleChangeUnitId = async (event:any) => {

  formik.setFieldValue('unitId',event?.target.value)
  listOtherUnits(event.target.value).then((res) => {
    setOtherUnits(res.data)
  })
}


  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: formForEdit,
    validationSchema: editchema,
    onSubmit: async (values) => {
      setLoading(true)

      if (!values.unitId && units.length) {
        values.unitId = (units[0] as any)?.id
      }

      if (!values.positionId && positions.length) {
        values.positionId = (positions[0] as any)?.id
      }


      values.role = "Inspector"

      

      values.identity = values.identity?.toString()

      try {
        await createUser(values)
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
      formik.setSubmitting(false)
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>
          {intl.formatMessage({id: 'USER.NEWUSER.TITLE'})}
            </h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e)
          }}
          noValidate
          className='form'
        >
          <div className='card-body border-top p-9'>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>{intl.formatMessage({id: 'USER.NEWUSER.MAIL'})}</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  //placeholder='Email'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.email && formik.errors.email},
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                  type='email'
                  name='email'
                  autoComplete='off'
                  disabled={formik.isSubmitting}
                />
                {/* end::Input */}
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                {intl.formatMessage({id: 'USER.NEWUSER.NAME'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                 // placeholder={formik.errors.fullName}
                  {...formik.getFieldProps('fullName')}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.fullName && formik.errors.fullName},
                    {
                      'is-valid': formik.touched.fullName && !formik.errors.fullName,
                    }
                  )}
                  type='text'
                  name='fullName'
                  autoComplete='off'
                  disabled={formik.isSubmitting}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.fullName}</span>
                    </div>
                  </div>
                )}

              
              
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                {intl.formatMessage({id: 'USER.NEWUSER.ID-NUM'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  //placeholder='Email'
                  {...formik.getFieldProps('identity')}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.identity && formik.errors.identity},
                    {
                      'is-valid': formik.touched.identity && !formik.errors.identity,
                    }
                  )}
                  type='number'
                  name='identity'
                  autoComplete='off'
                  disabled={formik.isSubmitting || loading}
                />
                {/* end::Input */}
                {formik.touched.identity && formik.errors.identity && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.identity}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
             <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                {intl.formatMessage({id: 'USER.NEWUSER.UNIT'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
              <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('parentUnitId')}
                  value={formik.values.parentUnitId}
                  onChange={handleChangeUnitId}
                >
                  <option value=''>Seçiniz</option>
                  {units.map((unit: any) => (
                    <option value={unit?.id} key={unit?.id as any}>
                      {unit?.name as any}
                    </option>
                  ))}
                </select>
                {formik.touched.unitId && formik.errors.unitId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.unitId}</span>
                    </div>
                  </div>
                )}

              </div>
            </div> 
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                {intl.formatMessage({id: 'USER.NEWUSER.UNIT'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
              <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('unitId')}
                  // value={formik.values.unitId}
                  // onChange={handleChangeUnitId}
                >
                  <option value=''>Seçiniz</option>
                  {otherunits.map((otherunit: any) => (
                    <option value={otherunit?.id} key={otherunit?.id as any}>
                      {otherunit?.name as any}
                    </option>
                  ))}
                </select>
                {formik.touched.unitId && formik.errors.unitId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.unitId}</span>
                    </div>
                  </div>
                )}

              </div>
            </div> 
            
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                {intl.formatMessage({id: 'USER.NEWUSER.POSITION'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('positionId')}
                  value={formik.values.positionId}
                >
                   <option value=''>Seçiniz</option>
                  {positions.map((position: any) => (
                    <option value={position?.id} key={position?.id as any}>
                      {position?.name as any}
                    </option>
                  ))}
                </select>
                {formik.touched.positionId && formik.errors.positionId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.positionId}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            
            {/* <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>{intl.formatMessage({id: 'USER.NEWUSER.ROLE'})}</label>

              <div className='col-lg-8 fv-row'>
                <div className='d-flex align-items-center mt-3'>
                  <label className='form-check form-check-inline form-check-solid me-5'>
                    <input
                      className='form-check-input'
                      name='role'
                      type='radio'
                      value={"Inspector"}
                      checked={formik.values.role === "Inspector"}
                      onChange={() => formik.setFieldValue("role","Inspector")}
                    />
                    <span className='fw-bold ps-2 fs-6'>{intl.formatMessage({id: 'USER.NEWUSER.INSPECTOR'})}</span>
                  </label>

                  <label className='form-check form-check-inline form-check-solid'>
                    <input
                      className='form-check-input'
                      name='role'
                      type='radio'
                      value={"Observer"}
                      checked={formik.values.role === "Observer"}
                      onChange={() => formik.setFieldValue("role","Observer")}
                    />
                    <span className='fw-bold ps-2 fs-6'>{intl.formatMessage({id: 'USER.NEWUSER.MANAGER'})}</span>
                  </label>
                </div>
              </div>
            </div> */}
           
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
          

          <button
            type='submit'
            onClick={() => {

              formik.submitForm().then(() => {
                navigate('/user-management/users')
              })
            }}
            className='btn btn-sm btn-dark'
            data-kt-items-modal-action='submit'
            disabled={loading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            {!loading}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
          </button>
{/*           
            <button
              type='submit'
              onClick={() => {
                formik.submitForm()

                formik.submitForm().then(() => {
                  navigate('/user-management/users')
                })
              }}
              className='btn btn-sm btn-dark'
              disabled={loading || formik.isSubmitting || !formik.isValid || !formik.touched}
            >
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export {UserEditForm}
