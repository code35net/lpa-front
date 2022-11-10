import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model} from './list/core/_models'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik, validateYupSchema} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'


import {listDepartments} from '../departments/list/core/_requests'
import {listPositions} from '../positions/list/core/_requests'
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
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  // name: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Name is required'),
})

const UserEditForm: FC<Props> = ({item}) => {
    

  const navigate = useNavigate()
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [departments, setDepartments] = React.useState([])
  const [positions, setPositions] = React.useState([])

  useEffect(() => {
    listDepartments().then((res) => {
      if (res?.data?.length) {
        setDepartments(res.data || [])
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
    fullname:undefined,
    identity: undefined,
    positionId:undefined,
    departmentId:undefined, 
    collarType:undefined,
  })

  //   const updateData = (fieldsToUpdate: Partial<Model>): void => {
  //     const updatedData = Object.assign(data, fieldsToUpdate)
  //     setData(updatedData)
  //   }

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: formForEdit,
    validationSchema: editchema,
    onSubmit: async (values) => {
      setLoading(true)

      if (!values.departmentId && departments.length) {
        values.departmentId = (departments[0] as any)?.id
      }

      if (!values.positionId && positions.length) {
        values.positionId = (positions[0] as any)?.id
      }


      if (!values.collarType) {
        values.collarType = 0
      }
      values.collarType = parseInt(values.collarType.toString())

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
            New User
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
                <span className='required'>Email</span>
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
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  Fullname
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  //placeholder='Email'
                  {...formik.getFieldProps('fullname')}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.fullname && formik.errors.fullname},
                    {
                      'is-valid': formik.touched.fullname && !formik.errors.fullname,
                    }
                  )}
                  type='text'
                  name='fullname'
                  autoComplete='off'
                  disabled={formik.isSubmitting}
                />
                {/* end::Input */}
                {formik.touched.fullname && formik.errors.fullname && (
                  <div className='fv-plugins-message-container'>
                    <span role='alert'>{formik.errors.fullname}</span>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  Identity Number
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
                  disabled={formik.isSubmitting}
                />
                {/* end::Input */}
                {formik.touched.identity && formik.errors.identity && (
                  <div className='fv-plugins-message-container'>
                    <span role='alert'>{formik.errors.identity}</span>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'ADD.QUESTION.DEPARTMENT'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('departmentId')}
                  value={formik.values.departmentId}
                >
                  {departments.map((department: any) => (
                    <option value={department?.id} key={department?.id as any}>
                      {department?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  Position
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('positionId')}
                  value={formik.values.positionId}
                >
                  {positions.map((position: any) => (
                    <option value={position?.id} key={position?.id as any}>
                      {position?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Collar Type
              </label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('collarType')}
                >
                  <option value='0'>Beyaz Yaka</option>
                  <option value='1'>Mavi Yaka</option>
                  <option value='2'>Haki Yaka</option>
                  <option value='3'>Sarı Yaka</option>
                </select>
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Role</label>

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
                    <span className='fw-bold ps-2 fs-6'>Inspector</span>
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
                    <span className='fw-bold ps-2 fs-6'>Report Manager</span>
                  </label>
                </div>
              </div>
            </div>
           
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
          

            <button
              type='submit'
              onClick={() => {
                formik.submitForm()

                formik.submitForm().then(() => {
                  navigate('/user-management/users')
                })
              }}
              className='btn btn-sm btn-dark'
              disabled={loading}
            >
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {UserEditForm}
