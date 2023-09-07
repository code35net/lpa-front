import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests'
import Swal from 'sweetalert2'
import {useIntl} from 'react-intl'

const initialValues = {
  email: '',
}

export function DeleteAccount() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const intl = useIntl()
  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage({id: 'MailNotSuitable'}))
      .min(3, intl.formatMessage({id: 'MinChar'}))
      .max(50, intl.formatMessage({id: 'MaxChar'}))
      .required(intl.formatMessage({id: 'MailRequerment'})),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      values.email = ''
      Swal.fire({
        title: intl.formatMessage({id: 'DeleteRequest'}),

        icon: 'success',
        timer: 2000,
        showConfirmButton: true,
      })
      // setLoading(true)
      // setHasErrors(undefined)
      // setTimeout(() => {
      //   requestPassword(values.email)
      //     .then(({data: {result}}) => {
      //       setHasErrors(false)
      //       setLoading(false)
      //     })
      //     .catch(() => {
      //       setHasErrors(true)
      //       setLoading(false)
      //       setSubmitting(false)
      //       setStatus('The login detail is incorrect')
      //     })
      // }, 1000)
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>{intl.formatMessage({id: 'DeleteAccount'})}</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-500 fw-semibold fs-6'>
          {' '}
          {intl.formatMessage({id: 'EnterEmail'})}
        </div>
        {/* end::Link */}
      </div>

      {/* begin::Title */}
      {/* {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )} */}

      {/* {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>Sent password reset. Please check your email</div>
        </div>
      )} */}
      {/* end::Title */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>
          {' '}
          {intl.formatMessage({id: 'EMAIL'})}
        </label>
        <input
          type='email'
          placeholder=''
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
          <span className='indicator-label'>{intl.formatMessage({id: 'SEND'})}</span>
          {/* {loading && (
            <span className='indicator-progress'>
              Bekleyiniz...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )} */}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-light'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {intl.formatMessage({id: 'BACK'})}
          </button>
        </Link>{' '}
      </div>
      {/* end::Form group */}
    </form>
  )
}
