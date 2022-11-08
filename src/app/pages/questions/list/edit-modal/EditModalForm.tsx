import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createQuestion, updateQuestion} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listDepartments} from '../../../departments/list/core/_requests'
import {listSections} from '../../../sections/list/core/_requests'
import {listAuditCategories} from '../../../auditcategories/list/core/_requests'
import {listQuestionCategories} from '../../../questioncategories/list/core/_requests'
import {listAnswerTemplates} from '../../../answertemplates/list/core/_requests'



type Props = {
  isQuestionLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  text: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const EditModalForm: FC<Props> = ({item, isQuestionLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()


  const [departments, setDepartments] = React.useState([])
  const [sections, setSections] = React.useState([])
  const [auditcategories, setAuditCategories] = React.useState([])
  const [questioncategories, setQuestionCategories] = React.useState([])
  const [answertemplates, setAnswertemplates] = React.useState([])


  useEffect(() => {
    listDepartments().then((res) => {
      if (res?.data?.length) {
        setDepartments(res.data || [])

        listSections(res?.data[0]?.id).then((res3) => {
          setSections(res3.data || [])
        })
      }
    })

    listAuditCategories().then((res2) => {
      setAuditCategories(res2.data || [])
    })
    listQuestionCategories().then((res3) => {
      setQuestionCategories(res3.data || [])
    })

    listAnswerTemplates().then((res2) => {
      setAnswertemplates(res2.data || [])


    })
  }, [])


  const [placeForEdit] = useState<Model>({
    ...item,
    text: undefined,
    sectionId: undefined,
    auditCategoryId:undefined,
    isNew:undefined

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
        if (isNotEmpty(values.id)) {
          await updateQuestion(values)
        } else {
          await createQuestion(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  const handleChangeDepartmentId = async (event: any) => {
    formik.setFieldValue('departmentId', event.target.value)
    listSections(event.target.value).then((res) => {
      setSections(res.data)
    })
  }

 

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
<input
                                //checked={true}
                                //onChange={(e)=> handleIsAddedQuestionCategory(question?.id,e.target.checked)}
                                //value={'on' : 'off'}
                                className='form-check-input bg-dark border-dark'
                                type='checkbox'
                                id='allowmarketing'
                              />
                              <label className='form-check-label'> Kopyala </label>
        {/* begin::Input group */}
        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
          {(intl.formatMessage({id: 'QUESTIONS.ADDPAGE.DEPARTMENT'}))}
            
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
          {(intl.formatMessage({id: 'QUESTIONS.ADDPAGE.SECTION'}))}
            
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
          {(intl.formatMessage({id: 'QUESTIONS.ADDPAGE.AUDITCATEGORY'}))}
            
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('auditCategoryId')}
                  value={formik.values.auditCategoryId}
                  onChange={formik.handleChange}
                >
                  <option value=''>Seçiniz</option>
                  {auditcategories.map((auditcategory: any) => (
                    <option value={auditcategory?.id as any} key={auditcategory?.id as any}>
                      {auditcategory?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>
        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
          {(intl.formatMessage({id: 'QUESTIONS.ADDPAGE.QUESTIONCATEGORY'}))}
            
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <select
                            className='form-select form-select-solid form-select-md'
                            //onChange={(e) => handleQuestionGroupId(question.id, e.target.value)}
                            //value={question.questionGroupId || 0}
                          >

                            {questioncategories.map((questioncategory: any) => (
                              <option
                                value={questioncategory?.id}
                                key={questioncategory?.id as any}
                              >
                                {questioncategory?.name as any}
                              </option>
                            ))}
                          </select> 
          {/* end::Input */}
        </div>
        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
          {(intl.formatMessage({id: 'QUESTIONS.LIST.NAME'}))}
            
          </label>
          {/* end::Label */}

          {/* begin::Input */}
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
            disabled={formik.isSubmitting || isQuestionLoading}
          />
          {formik.touched.text && formik.errors.text && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.text}</span>
              </div>
            </div>
          )}
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
            disabled={formik.isSubmitting || isQuestionLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-items-modal-action='submit'
            disabled={isQuestionLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            {(formik.isSubmitting || isQuestionLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
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
