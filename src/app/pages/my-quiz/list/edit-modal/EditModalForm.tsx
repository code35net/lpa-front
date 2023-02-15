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
import { listSomeThings as listCourses } from '../../../course/list/core/_requests'
import { listCourseTerms } from '../../../term/list/core/_requests'
import { Model as CourseTerm } from '../../../term/list/core/_models'

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
    console.log(item)
    // const [hasSurvey, setHasSurvey] = React.useState(false)
    const [course, setCourse] = React.useState([])
    const [courseTerm, setCourseTerm] = React.useState([])

  const [placeForEdit] = useState<Model>({
  
    name: undefined,
    description: undefined,
      duration: undefined,
      courseTerm: undefined,
    courseTermId: undefined,
    hasCertificate:undefined,
    rules:undefined,
    passMark:undefined,  ...item
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  useEffect(() => {
    listCourses().then((res2) => {
        setCourse(res2 || [])
    }).then(() => {
        if (item.courseTerm?.courseId != undefined) {
            listCourseTerms(item.courseTerm?.courseId).then((res) => {
                console.log(res)
                setCourseTerm(res.data || [])
            })
        }
        })
    
    
  }, [])

  



  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
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


    const handleChangeCourseId = async (event: any) => {
        formik.setFieldValue('courseId', event.target.value)
        if (event.target.value != '') {
            listCourseTerms(event.target.value).then((res) => {
                console.log(res)
                setCourseTerm(res.data || [])
            })
        } else {
            setCourseTerm([])
        }
    }

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
      
        <div className='row g-5 g-xxl-8'>

          
        <div className='col-xl-6'>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'QUIZ.NAME'})}
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
            {intl.formatMessage({id: 'QUIZ.DESCRIPTION'})}
          </label>
         
          <textarea
            //placeholder='Full name'
            {...formik.getFieldProps('description')}
            // type='text'
            rows={2}
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
            {intl.formatMessage({id: 'QUIZ.DURATION'})}
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
        <div className='fv-row mb-7'>
        <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'COURSE.NAME'})}
          </label>
         
         <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('CourseTerm.courseId')}
                              value={formik.values.courseTerm?.courseId}
                  onChange={handleChangeCourseId}
                >
                  <option value=''>Seçiniz</option>
                  {/* ?? */}
                  {course.map((mycourse: any) => (
                    <option value={mycourse?.id} key={mycourse?.id as any}>
                      {mycourse?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>  
                      <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>
                              {intl.formatMessage({ id: 'TERM.NAME' })}
                          </label>

                          <select
                              className='form-select form-select-solid form-select-md'
                              {...formik.getFieldProps('courseTermId')}
                              value={formik.values.courseTermId}
                          //onChange={handleChangeDepartmentId}
                          >
                              <option value=''>Seçiniz</option>
                              {/* ?? */}
                              {courseTerm.map((mycourse: any) => (
                                  <option value={mycourse?.id} key={mycourse?.id as any}>
                                      {mycourse?.termName as any}
                                  </option>
                              ))}
                          </select>
                          {/* end::Input */}
                      </div>
       
        </div>

        <div className='col-xl-6'>
       
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'QUIZ.RULES'})}
          </label>
         
          <textarea
            //placeholder='Full name'
            {...formik.getFieldProps('rules')}
            rows={20}
            name='rules'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.rules && formik.errors.rules},
              {
                'is-valid': formik.touched.rules && !formik.errors.rules,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {formik.touched.rules && formik.errors.rules && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.rules}</span>
              </div>
            </div>
          )}
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
