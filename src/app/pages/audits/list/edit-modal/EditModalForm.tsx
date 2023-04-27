import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {updateAudit2, listUnits} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import moment from 'moment'
import {listUsers} from '../../../user-management/list/core/_requests'

type Props = {
  isAuditCategoryLoading: boolean
  item: Model
}

// const editchema = Yup.object().shape({
//   name: Yup.string()
//     .max(50, 'Maximum 50 symbols')
//     .required('Department Name required'),
// })

const EditModalForm: FC<Props> = ({item}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [users, setUsers] = useState([])
  const [operators, setOperators] = useState([])
  useEffect(() => {
    listUsers().then((res) => {
      setUsers(res.data)
    })
    listUnits(item.sectionId).then((res) => {
      setOperators(res)
    })
  }, [])

  const [placeForEdit] = useState<Model>({
    auditDate: undefined,
    auditor: undefined,
    unitId: undefined,
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
    // validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)

      try {
        if (isNotEmpty(values.id)) {
          await updateAudit2(values.auditor, values.id)
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
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'AUDITS.LIST.DATE'})}
            </label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              //placeholder='Full name'
              {...formik.getFieldProps('auditDate')}
              type='datetime-local'
              name='auditDate'
              value={moment(formik.values.auditDate).format('YYYY-MM-DD HH:mm')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.auditDate && formik.errors.auditDate},
                {
                  'is-valid': formik.touched.auditDate && !formik.errors.auditDate,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting}
            />
            {formik.touched.auditDate && formik.errors.auditDate && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.auditDate}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'AUDITS.LIST.AUDITOR'})}
            </label>
            {/* end::Label */}

            {/* begin::Input */}
            <select
              className='form-select form-select-solid form-select-md'
              {...formik.getFieldProps('auditor')}
              value={formik.values.auditor}
              onChange={formik.handleChange}
            >
              <option value=''>{intl.formatMessage({id: 'USERS.LIST.MODAL.FORM'})}</option>
              {users.map((user: any) => (
                <option value={user?.id} key={user?.id as any}>
                  {user?.fullName as any}
                </option>
              ))}
            </select>
            {/* end::Input */}
          </div>

          {/* <div className='fv-row mb-7'>
        
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'AUDITS.PLANNER.USER'})}
          </label>
         
          <select
            className='form-select form-select-solid form-select-md'
            {...formik.getFieldProps('unitId')}
            value={formik.values.unitId}
            onChange={formik.handleChange}
          >
            <option value=''>{intl.formatMessage({id: 'SELECT'})}</option>
            {operators.map((unit: any) => (
              <option value={unit?.id} key={unit?.id as any}>
                {unit?.name as any}
              </option>
            ))}
          </select>
         
        </div> */}

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
            disabled={formik.isSubmitting}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-sm btn-dark'
            data-kt-items-modal-action='submit'
            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
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
    </>
  )
}

export {EditModalForm}
