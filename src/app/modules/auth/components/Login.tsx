/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {useAuth} from '../core/Auth'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {AuthModel, UserModel} from '../core/_models'
import {useIntl} from 'react-intl'

const initialValues = {
  username: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const intl = useIntl()
  const loginSchema = Yup.object().shape({
    username: Yup.string()

      .min(3, intl.formatMessage({id: 'MinChar'}))
      .max(50, intl.formatMessage({id: 'MaxChar'}))
      .required(intl.formatMessage({id: 'MailRequerment'})),
    password: Yup.string()
      .min(3, intl.formatMessage({id: 'MinChar'}))
      .max(50, intl.formatMessage({id: 'MaxChar'}))
      .required(intl.formatMessage({id: 'PsswordRequerment'})),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.username, values.password)
        saveAuth(auth)
        const {data: user} = await getUserByToken()

        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login detail is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>iQualitor | Auditing App</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            {intl.formatMessage({id: 'CreateAccount'})}
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {/* {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) 
      : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info text-center'>
            Please login with your <strong>identity</strong>.
          </div>
        </div>
      )
      } */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>
          {intl.formatMessage({id: 'AUTH.INPUT.USERNAME'})}
        </label>
        <input
          
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
          type='text'
          name='username'
          autoComplete='off'
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.username}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>
              {intl.formatMessage({id: 'AUTH.INPUT.PASSWORD'})}
            </label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder mx-4'
              style={{marginLeft: '5px'}}
            >
              {intl.formatMessage({id: 'ForgotPassword'})}
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
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
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && (
            <span className='indicator-label'> {intl.formatMessage({id: 'Continue'})}</span>
          )}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      <div className='text-gray-500 text-center fw-semibold fs-6'>
        <Link to='/auth/deleteaccount' className='link-primary'>
          {intl.formatMessage({id: 'DeleteAccount2'})}
        </Link>
      </div>
      {/* end::Action */}
    </form>
  )
}
