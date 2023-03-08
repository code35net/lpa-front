import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model} from './list/core/_models'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik, validateYupSchema} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'

import {updateUser} from './list/core/_requests'

type Props = {
  //    isPlaceLoading: boolean
  item?: Model
}

const editchema = Yup.object().shape({
  email: Yup.string().email('Wrong email format').required('Email required'),
  password: Yup.string().min(8, 'Minumum 8 characters').required('Password required'),
  oldPassword: Yup.string().min(8, 'Minumum 8 characters').required('Old Password required'),
})

const ChangePassword: FC<Props> = ({item}) => {
  const navigate = useNavigate()
  const intl = useIntl()

  const [formForEdit] = useState<Model>({
    ...item,
    email: undefined,
    password: undefined,
    oldPassword: undefined,
  })

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: formForEdit,
    validationSchema: editchema,
    onSubmit: async (values) => {
      setLoading(true)

      try {
        await updateUser(values)
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
      formik.setSubmitting(false)
    },
  })

  // ......

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
          <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'USER.CHANGE.PASS'})}</h3>
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
                  {intl.formatMessage({id: 'USER.CURRENTT.PASSWORD'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  // placeholder='{formik.errors.fullName}'
                  {...formik.getFieldProps('oldPassword')}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.oldPassword && formik.errors.oldPassword},
                    {
                      'is-valid': formik.touched.oldPassword && !formik.errors.oldPassword,
                    }
                  )}
                  type='password'
                  name='oldPassword'
                  autoComplete='off'
                  disabled={formik.isSubmitting}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.oldPassword}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>{intl.formatMessage({id: 'USER.NEWW.PASSWORD'})}</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  //placeholder='Email'
                  {...formik.getFieldProps('password')}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.password && formik.errors.password},
                    {
                      'is-valid': formik.touched.password && !formik.errors.password,
                    }
                  )}
                  type='password'
                  name='password'
                  autoComplete='off'
                  disabled={formik.isSubmitting || loading}
                />
                {/* end::Input */}
                {formik.touched.password && formik.errors.password && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.password}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
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

export {ChangePassword}
