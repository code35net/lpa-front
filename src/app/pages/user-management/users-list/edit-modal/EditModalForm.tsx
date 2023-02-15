import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listUsers} from '../core/_requests'

type Props = {
  isQuestionLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  fullName: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Question required'),
    identity: Yup.string().length(11).required('Identity required'),
    role: Yup.string().required(),
    email: Yup.string().required()
})

const EditModalForm: FC<Props> = ({item, isQuestionLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

 // const [users, setUsers] = React.useState([])
    useEffect(() => {
      console.log(item.id)
    /*listUsers().then((res)=>{
      setUsers(res.data)
    })*/
  }, [])

  console.log(item, 'test')
  const [placeForEdit] = useState<Model>({
    fullName: undefined,
    identity: undefined,
    isDeleteUser: false,
      userId: undefined,
      email: undefined,
      role: undefined,
    ...item,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
        try {
            console.log(values)
        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } else {
          await createUser(values)
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
          {/* begin::Input group */}

          {/* begin::Preview existing avatar */}

          {/* end::Preview existing avatar */}

          {/* begin::Label */}
          {/* <label
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='Change avatar'
            >
              <i className='bi bi-pencil-fill fs-7'></i>

              <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
              <input type='hidden' name='avatar_remove' />
            </label> */}
          {/* end::Label */}

          {/* begin::Cancel */}
          {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='cancel'
              data-bs-toggle='tooltip'
              title='Cancel avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
          {/* end::Cancel */}

                  <div className='fv-row mb-7'>
                      {/* begin::Label */}
                      <label className='required fw-bold fs-6 mb-2'>
                          {intl.formatMessage({ id: 'USER.FULLNAME' })}
                      </label>
                      {/* end::Label */}

                      {/* begin::Input */}
                      <input
                          //placeholder='Full name'
                          {...formik.getFieldProps('fullName')}
                          type='fullName'
                          name='fullName'
                          className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik.touched.fullName && formik.errors.fullName },
                              {
                                  'is-valid': formik.touched.fullName && !formik.errors.fullName,
                              }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || isQuestionLoading}
                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                          <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.fullName}</span>
                              </div>
                          </div>
                      )}
                      {/* end::Input */}
                  </div>


                  <div className='fv-row mb-7'>
                      {/* begin::Label */}
                      <label className='required fw-bold fs-6 mb-2'>
                          {intl.formatMessage({ id: 'USER.EMAIL' })}
                      </label>
                      {/* end::Label */}

                      {/* begin::Input */}
                      <input
                          //placeholder='Full name'
                          {...formik.getFieldProps('email')}
                          type='email'
                          name='email'
                          className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik.touched.email && formik.errors.email },
                              {
                                  'is-valid': formik.touched.email && !formik.errors.email,
                              }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || isQuestionLoading}
                      />
                      {formik.touched.email && formik.errors.email && (
                          <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.email}</span>
                              </div>
                          </div>
                      )}
                      {/* end::Input */}
                  </div>

                  <div className='fv-row mb-7'>

                      <label className='required fw-bold fs-6 mb-2'>
                          {intl.formatMessage({ id: 'USER.ROLE' })}
                      </label>

                      <select
                          className='form-select form-select-solid form-select-md'
                          {...formik.getFieldProps('role')}
                          value={formik.values.role}
                      // onChange={handleChangeDepartmentId}
                      >
                          <option value=''>Seçiniz</option>
                          {/* ?? */}
                          <option value='Instructor' key='Instructor'>
                              {intl.formatMessage({ id: 'USER.ROLES.INSTRUCTOR' })}
                          </option>
                          <option value='Participant' key='Participant'>
                              {intl.formatMessage({ id: 'USER.ROLES.PARTICIPANT' })}
                          </option>
                      </select>
                      {/* end::Input */}
                  </div>

                  <div className='fv-row mb-7'>
                      {/* begin::Label */}
                      <label className='required fw-bold fs-6 mb-2'>
                          {intl.formatMessage({ id: 'USER.IDENTITY' })}
                      </label>
                      {/* end::Label */}

                      {/* begin::Input */}
                      <input
                          //placeholder='Full name'
                          {...formik.getFieldProps('identity')}
                          type='text'
                          name='identity'
                          className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik.touched.identity && formik.errors.identity },
                              {
                                  'is-valid': formik.touched.identity && !formik.errors.identity,
                              }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || isQuestionLoading}
                      />
                      {formik.touched.identity && formik.errors.identity && (
                          <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.identity}</span>
                              </div>
                          </div>
                      )}
                      {/* end::Input */}
                  </div>

          {/* begin::Remove */}
          {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
          {/* end::Remove */}
        </div>
        {/* end::Image input */}

        {/* begin::Hint */}
        {/* <div className='form-text'>Allowed file types: png, jpg, jpeg.</div> */}
        {/* end::Hint */}
        {/* end::Input group */}


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
            disabled={formik.isSubmitting || isQuestionLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-sm btn-dark'
            data-kt-items-modal-action='submit'
            disabled={
              isQuestionLoading || formik.isSubmitting || !formik.isValid || !formik.touched
            }
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            {(formik.isSubmitting || isQuestionLoading) && (
              <span className='indicator-progress'>
                {intl.formatMessage({id: 'QUESTIONS.LIST.MODAL.WAİT'})}{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isQuestionLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
