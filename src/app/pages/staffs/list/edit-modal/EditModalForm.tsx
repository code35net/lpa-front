import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createStaff, updateStaff} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listDepartments} from '../../../departments/list/core/_requests'
import {listSections} from '../../../sections/list/core/_requests'
import {listPositions} from '../../../positions/list/core/_requests'

type Props = {
  isStaffLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  fullname: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Staff required'),
})

const EditModalForm: FC<Props> = ({item}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [departments, setDepartments] = React.useState([])
  const [sections, setSections] = React.useState([])
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

  const [placeForEdit] = useState<Model>({
   
    fullname: undefined,
    email:undefined,
    positionId:undefined,
    departmentId:undefined,
    sectionId:undefined,
    ...item


  })

  const handleChangeDepartmentId = async (event: any) => {
    formik.setFieldValue('departmentId', event.target.value)
    listSections(event.target.value).then((res) => {
      setSections(res.data)
    })
  }

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
      
      if (!values.departmentId && departments.length) {
        values.departmentId = (departments[0] as any)?.id
      }
      if (!values.sectionId && sections.length) {
        values.sectionId = (sections[0] as any)?.id
      }

      if (!values.positionId && positions.length) {
        values.positionId = (positions[0] as any)?.id
      }


      try {
        if (isNotEmpty(values.id)) {
          await updateStaff(values)
        } else {
          await createStaff(values)
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
          {intl.formatMessage({id: 'STAFFS.MODAL.EMAIL'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('email')}
            type='text'
            name='email'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting}
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
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
          {intl.formatMessage({id: 'STAFFS.MODAL.NAME'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('fullname')}
            type='text'
            name='fullname'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.fullname && formik.errors.fullname},
              {
                'is-valid': formik.touched.fullname && !formik.errors.fullname,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting}
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.fullname}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>

        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
          {intl.formatMessage({id: 'STAFFS.MODAL.DEPARTMENT'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('departmentId')}
                  value={formik.values.departmentId}
                  onChange={handleChangeDepartmentId}
                >
                  <option value=''>Seçiniz</option>
                  {departments.map((department: any) => (
                    <option value={department?.id} key={department?.id as any}>
                      {department?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>

        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
          {intl.formatMessage({id: 'STAFFS.MODAL.SECTION'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('sectionId')}
                  value={formik.values.sectionId}
                  onChange={formik.handleChange}
                >
                  <option value=''>Seçiniz</option>
                  {sections.map((section: any) => (
                    <option value={section?.id} key={section?.id as any}>
                      {section?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>


        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
          {intl.formatMessage({id: 'STAFFS.MODAL.POSITION'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
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
          {/* end::Input */}
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
            {(formik.isSubmitting) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
