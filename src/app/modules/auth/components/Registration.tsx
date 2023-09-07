/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register} from '../core/_requests'
import {useAuth} from '../core/Auth'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import Swal from 'sweetalert2'
import {useIntl} from 'react-intl'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  acceptTerms: false,
}

export function Registration() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const intl = useIntl()
  const registrationSchema = Yup.object().shape({
    firstname: Yup.string().required(intl.formatMessage({id: 'NameRequerment'})),
    email: Yup.string()
      .email(intl.formatMessage({id: 'MailNotSuitable'}))
      .required(intl.formatMessage({id: 'MailRequerment'})),
    lastname: Yup.string().required(intl.formatMessage({id: 'SurNameRequerment'})),
    password: Yup.string()
      .required(intl.formatMessage({id: 'PsswordRequerment'}))
      .min(3, intl.formatMessage({id: 'MinChar'}))
      .max(50, intl.formatMessage({id: 'MaxChar'})),
    // changepassword: Yup.string()
    //   .required('Password confirmation is required')
    //   .when('password', {
    //     is: (val: string) => (val && val.length > 0 ? true : false),
    //     then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    //   }),
    // acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      // setLoading(true)

      values.firstname = ''
      values.lastname = ''
      values.email = ''
      values.password = ''

      Swal.fire({
        title: intl.formatMessage({id: 'SucccesMessage'}),
        text: intl.formatMessage({id: 'SucccesMessage2'}),
        icon: 'success',
        timer: 2000,
        showConfirmButton: true,
      })

      // try {
      //   const {data: auth} = await register(
      //     values.email,
      //     values.firstname,
      //     values.lastname,
      //     values.password,
      //     values.changepassword
      //   )
      //   // saveAuth(auth)
      //   const {data: user} = await getUserByToken()
      //   // setCurrentUser(user)
      //   console.log('üst')
      // } catch (error) {
      //   console.log('alt')
      //   console.error(error)
      //   saveAuth(undefined)
      //   setStatus('The registration details is incorrect')
      //   setSubmitting(false)
      //   setLoading(false)
      // }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'NewAccount'})}</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
          <Link to='/auth/login' className='link-primary fw-bolder' style={{marginLeft: '5px'}}>
            {intl.formatMessage({id: 'AlreadyAccount'})}
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {/* begin::Action */}
      {/* <button type='button' className='btn btn-light-primary fw-bolder w-100 mb-10'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
          className='h-20px me-3'
        />
        Sign in with Google
      </button> */}
      {/* end::Action */}

      <div className='d-flex align-items-center mb-10'>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
        <span className='fw-bold text-gray-400 fs-7 mx-2'>-</span>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>
            {intl.formatMessage({id: 'NAME'})}
          </label>
          <input
            placeholder=''
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('firstname')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.firstname && formik.errors.firstname,
              },
              {
                'is-valid': formik.touched.firstname && !formik.errors.firstname,
              }
            )}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.firstname}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>
              {' '}
              {intl.formatMessage({id: 'SURNAME'})}
            </label>
            <input
              placeholder=''
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('lastname')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.lastname && formik.errors.lastname,
                },
                {
                  'is-valid': formik.touched.lastname && !formik.errors.lastname,
                }
              )}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.lastname}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>
          {' '}
          {intl.formatMessage({id: 'EMAIL'})}
        </label>
        <input
          placeholder=''
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
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

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>
            {' '}
            {intl.formatMessage({id: 'PASSWORD'})}
          </label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder=''
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            {/* <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div> */}
          </div>
          {/* end::Meter */}
        </div>
        {/* <div className='text-muted'>Şifreniz en az 8 karakter içermelidir.</div> */}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      {/* <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div> */}
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='form-check form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <label
            className='form-check-label fw-bold text-gray-700 fs-6'
            htmlFor='kt_login_toc_agree'
          >
            <Link to='/auth/terms' className='ms-1 link-primary'>
              {intl.formatMessage({id: 'AcceptTerm'})}
            </Link>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'> {intl.formatMessage({id: 'Save'})}</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            {intl.formatMessage({id: 'BACK'})}
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
