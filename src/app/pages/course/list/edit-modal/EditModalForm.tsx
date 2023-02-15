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
import {listThings as listSurveys} from '../../../survey/list/core/_requests'

type Props = {
  isThingLoading: boolean
  item: Model
}




const editchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Thing Name required'),
  description: Yup.string()
    .required('Thing Name required'),
})

const EditModalForm: FC<Props> = ({item, isThingLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

 // const [hasSurvey, setHasSurvey] = React.useState(false)
  const [survey, setSurvey] = React.useState([])

  const [placeForEdit] = useState<Model>({    
    name: undefined,
    description: undefined,
    duration:undefined,
    surveyId:undefined,
    isExercise:undefined,
    privateCourse:undefined,
    hasSurvey: item.surveyId || 0 > 0 ? true : false,
    hasExam:false,
    ...item,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  useEffect(() => {
    listSurveys().then((res2) => {
      setSurvey(res2.data || [])
    })
    
    
  }, [])

  



  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      if(values.hasSurvey == false)
      {
        values.surveyId = undefined;
      }
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
      
      
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'COURSE.NAME'})}
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
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'COURSE.DESCRIPTION'})}
          </label>
         
          <textarea
            //placeholder='Full name'
            {...formik.getFieldProps('description')}
            rows={3}
            name='description'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.description && formik.errors.description},
              {
                'is-valid': formik.touched.description && !formik.errors.description,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {formik.touched.description && formik.errors.description && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.description}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'COURSE.DURATION'})}
          </label>
         
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('duration')}
            type='number'
            name='duration'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.duration && formik.errors.duration},
              {
                'is-valid': formik.touched.duration && !formik.errors.duration,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {formik.touched.duration && formik.errors.duration && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.duration}</span>
              </div>
            </div>
          )}
        </div>
        <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                {intl.formatMessage({id: 'COURSE.HASSURVEY'})}
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                <input
              {...formik.getFieldProps('hasSurvey')}
              checked={formik.values.hasSurvey}
              onChange={(e) => formik.setFieldValue('hasSurvey', e.target.checked)}
              value={formik.values.hasSurvey ? 'on' : 'off'}
              className='form-check-input w-80px mt-2 border-secondary'
              type='checkbox'
              id='hasSurvey'
            />
                  <label className='form-check-label mt-3 px-5'> <small className='text-danger'>{intl.formatMessage({id: 'COURSE.HASSURVEY.TEXT'})}</small> </label>
                </div>
              </div>
            </div>
            
        {
          formik.values.hasSurvey && (
            
        <div className='fv-row mb-7'>
         
         
         <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('surveyId')}
                  value={formik.values.surveyId}
                  // onChange={handleChangeDepartmentId}
                >
                  <option value=''>Seçiniz</option>
                  {/* ?? */}
                  {survey.map((mysurvey: any) => (
                    <option value={mysurvey?.id} key={mysurvey?.id as any}>
                      {mysurvey?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>
          )
          }
       
       <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                {intl.formatMessage({id: 'COURSE.ISEXERCISE'})}
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                <input
              {...formik.getFieldProps('isExercise')}
              checked={formik.values.isExercise}
              onChange={(e) => formik.setFieldValue('isExercise', e.target.checked)}
              value={formik.values.isExercise ? 'on' : 'off'}
              className='form-check-input w-80px mt-2 border-secondary'
              type='checkbox'
              id='isExercise'
            />
                  <label className='form-check-label mt-3 px-5'> <small className='text-danger'>{intl.formatMessage({id: 'COURSE.ISEXERCISE.TEXT'})}</small> </label>
                </div>
              </div>
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
