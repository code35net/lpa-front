import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import { updateQuestion} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listThings as listAuditCategories} from '../../../audit-categories/list/core/_requests'
import {listThings as listQuestionCategories} from '../../../question-groups/list/core/_requests'
import {listAnswerTemplates} from '../../../answertemplates/list/core/_requests'
import {listSomeThings as listUnits} from '../../../units/list/core/_requests'

type Props = {
  isQuestionLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  text: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Question required'),
})

const EditModalForm: FC<Props> = ({item, isQuestionLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [departments, setDepartments] = React.useState([])
  const [sections, setSections] = React.useState([])
  const [auditcategories, setAuditCategories] = React.useState([])
  const [units, setUnits] = React.useState([])
  const [questioncategories, setQuestionCategories] = React.useState([])
  const [answertemplates, setAnswertemplates] = React.useState([])
  const [isQuestionCategory, setIsQuestionCategory] = React.useState(item.isAddedQuestionCategory)

  useEffect(() => {


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

  console.log(item, 'test')
  const [placeForEdit] = useState<Model>({
    text: undefined,

    auditCategoryId: undefined,
    isNew: undefined,
    isAddedQuestionCategory: false,
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
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateQuestion(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  console.log(formik.values)

  const handleAuditCategoryId = async (event: any) => {
    formik.setFieldValue('auditCategoryId', event.target.value)
    if(event.target.value != '')
    {
      listUnits(event.target.value, 0).then((res3) => {
        setUnits(res3.data)
      })
    }
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
        {/* end::Input group
        <div className='fv-row mb-7'>*/}

          {/* <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({
              id: 'QUESTIONS.ADDPAGE.IS_NEW',
            })}
          </label>
          <div className='form-check form-check-solid form-switch'>
            <input
              {...formik.getFieldProps('isNew')}
              checked={formik.values.isNew}
              onChange={(e) => formik.setFieldValue('isNew', e.target.checked)}
              value={formik.values.isNew ? 'on' : 'off'}
              className='form-check-input w-80px mt-2 border-secondary'
              type='checkbox'
              id='isNew'
            />
            <label className='form-check-label mt-3 px-5'> <small className='text-danger'>{intl.formatMessage({id: 'QUESTIONS.LIST.MODAL.MARK'})}</small> </label>

          </div>
        </div>

        */}


        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.AUDITCATEGORY'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <select
            className='form-select form-select-solid form-select-md'
            {...formik.getFieldProps('auditCategoryId')}
            value={formik.values.auditCategoryId}
            onChange={(e) => handleAuditCategoryId(e)}
          >
            <option value=''>{intl.formatMessage({id: 'QUESTIONS.LIST.MODAL.FORM'})}</option>
            {auditcategories.map((auditcategory: any) => (
              <option value={auditcategory?.id as any} key={auditcategory?.id as any}>
                {auditcategory?.name as any}
              </option>
            ))}
          </select>
          {/* end::Input */}
        </div>
        <div className='fv-row mb-7'>

          <div className='form-check form-check-solid form-switch'>
          <label className='fw-bold fs-6 mt-3 px-5'>
          {intl.formatMessage({
              id: 'QUESTIONS.ADDPAGE.IS_ADDED_QUESTION_CATEGORY',
            })}
             </label>
            <input
              {...formik.getFieldProps('isAddedQuestionCategory')}
              checked={formik.values.isAddedQuestionCategory}
              onChange={(e) => {formik.setFieldValue('isAddedQuestionCategory', e.target.checked); setIsQuestionCategory(e.target.checked)}}
              value={formik.values.isAddedQuestionCategory ? 'on' : 'off'}
              className='form-check-input w-80px mt-2 border-secondary'
              type='checkbox'
              id='isAddedQuestionCategory'
            />
          </div>

        </div>
        {
          isQuestionCategory && (

        <div className='fv-row mb-7'>


          <select
            className='form-select form-select-solid form-select-md'
            //onChange={(e) => handleQuestionCategories(e.target.value)}
            //value={question.questionGroupId || 0}
          >
            {questioncategories.map((questioncategory: any) => (
              <option value={questioncategory?.id} key={questioncategory?.id as any}>
                {questioncategory?.name as any}
              </option>
            ))}
          </select>
          {/* end::Input */}
        </div>
          )
        }


        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'QUESTIONS.EDIT.UNIT'})}
          </label>

          <select
              className='form-select form-select-solid form-select-md'
            {...formik.getFieldProps('unitId')}
            // value={formik.values.unitId}
              name='unitId'
              defaultValue=""
            >
              <option value="">Select Unit</option>
              {units.map((unit: any) => (
                <option value={unit?.id} key={unit?.id as any}>
                  {unit?.name as any}
                </option>
              ))}
            </select>
            </div>

        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'QUESTIONS.LIST.NAME'})}
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
