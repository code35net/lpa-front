import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createThing, updateThing} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listThings as listAuditCategories} from '../../../audit-categories/list/core/_requests'
import {listThings as listQuestionGroups} from '../../../question-groups/list/core/_requests'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

type Props = {
  isThingLoading: boolean
  item: Model
}

// const editchema = Yup.object().shape({
//   name: Yup.string()
//     .max(50, 'Maximum 50 symbols')
//     .required('Thing Name required'),
// })

const EditModalForm: FC<Props> = ({item, isThingLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [auditCategory, setAuditCategory] = React.useState([])
  const [questionGroup, setQuestionGroup] = React.useState([])

  const [placeForEdit] = useState<Model>({     
    auditCategoryId: undefined,
    unitId: undefined,    
    score: undefined,
    questionGroupId: undefined,  
    auditDate: undefined,
    auditor: undefined,
    started: undefined,
    ended: undefined,
    categoryType:undefined,
    status:undefined,
    ...item,
    
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  useEffect(() => {
    listAuditCategories().then((res2) => {
      setAuditCategory(res2.data || [])
    })    
  }, [])

  useEffect(() => {
    listQuestionGroups().then((res3) => {
      setQuestionGroup(res3.data || [])
    })    
  }, [])

  const formik = useFormik({
    initialValues: placeForEdit,
    //validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      if(!values.categoryType){
        values.categoryType = 0
      }
      values.categoryType=parseInt(values.categoryType.toString())
      try {
        if (isNotEmpty(values.id)) {
          await updateThing(values)
        } else {
          await createThing(values)
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
      
      
      {/*
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'POSITION_NAME'})}
          </label>
          
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('name')}
            type='text'
            name='name'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.name && formik.errors.name},
              {
                'is-valid': formik.touched.name && !formik.errors.name,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.name}</span>
              </div>
            </div>
          )}
          </div> */}



        


        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'AUDIT_CATEGORY_TYPE'})}
          </label>
          <select 
           className='form-select form-select-solid form-select-md'
           {...formik.getFieldProps('categoryType')}
           >
            <option value=''>{intl.formatMessage({id: 'DROPDOWN_SELECT'})}</option>
            <option value='0'>Daily</option>
            <option value='1'>Weekly</option>
            <option value='2'>Monthly</option>
            <option value='3'>Quarterly</option>
            <option value='4'>DailyShift</option>
            <option value='5'>NonPeriod</option>
           </select>
          
          {formik.touched.categoryType && formik.errors.categoryType && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.categoryType}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-7'>    
        <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'AUDIT_CATEGORY_ID'})}
          </label>     
         <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('auditCategoryId')}
                  value={formik.values.auditCategoryId}
                  // onChange={handleChangeDepartmentId}
                >
                  <option value=''>Select</option>
                  {/* ?? */}
                  {auditCategory.map((myauditcategory: any) => (
                    <option value={myauditcategory?.id} key={myauditcategory?.id as any}>
                      {myauditcategory?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>

        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'AUDIT_AUDITOR'})}
          </label>
          
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('auditor')}
            type='text'
            name='auditor'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.auditor && formik.errors.auditor},
              {
                'is-valid': formik.touched.auditor && !formik.errors.auditor,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {formik.touched.auditor && formik.errors.auditor && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.auditor}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-7'>    
        <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'QUESTION_GROUP_ID'})}
          </label>     
         <select 
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('questionGroupId')}
                  value={formik.values.questionGroupId}
                  // onChange={handleChangeDepartmentId}
                >
                  <option value=''>Select</option>
                  {/* ?? */}
                  {questionGroup.map((myquestiongroup: any) => (
                    <option value={myquestiongroup?.id} key={myquestiongroup?.id as any}>
                      {myquestiongroup?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>


      
   


           


        
      
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-sm btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting || isThingLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-sm btn-info'
            data-kt-items-modal-action='submit'
            disabled={
              isThingLoading || formik.isSubmitting || !formik.isValid || !formik.touched
            }
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'FORM.SAVE'})}</span>
            {(formik.isSubmitting || isThingLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isThingLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
