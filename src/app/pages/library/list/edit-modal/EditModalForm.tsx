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
import {listSomeThings as listCourses} from '../../../course/list/core/_requests'
import {listThings as listTopics} from '../../../topic/list/core/_requests'
import {listThings as listLibraryCategory} from '../../../library-category/list/core/_requests'
import {FileUploader} from 'react-drag-drop-files'

const fileTypes = ['ZIP']

type Props = {
  isThingLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  code: Yup.string().max(50, 'Maximum 50 symbols').required('Thing Name required'),
})

const EditModalForm: FC<Props> = ({item, isThingLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [course, setCourse] = React.useState([])
  const [topic, setTopic] = React.useState([])
  const [libraryCategory, setLibraryCategory] = React.useState([])

  // const [library, setLibrary] = useState<any>([])
  const [file, setFile] = useState<any>([])

  const [placeForEdit] = useState<Model>({
    ...item,
    code: undefined,
    topicId: undefined,
    libraryCategoryId: undefined,
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
      if (item.topic?.courseId != undefined) {
        listTopics(item.topic?.courseId).then((res3) => {
          setTopic(res3.data || [])
        })
      }
    })
    listLibraryCategory().then((res2) => {
      setLibraryCategory(res2.data || [])
    })
  }, [])

  const handleFileChange = (file: any) => {
    if (file) {
      setFile(file)
    }
  }

  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      values.topic = undefined

      const formData = new FormData()
      formData.append('file', file)
      // bu şekilde diğer değerlerin  hepsini eklemen lazım 

      formData.append('code', (values as any)?.code)
      formData.append('topicId', (values as any)?.topicId)
      formData.append('libraryCategoryId', (values as any)?.libraryCategoryId)

      try {
        if (isNotEmpty(values.id)) {
          await updateThing(values)
        } else {
          await createThing(formData)
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
    formik.setFieldValue('topic.courseId', event.target.value)
    if (event.target.value != '') {
      listTopics(event.target.value).then((res) => {
        setTopic(res.data)
      })
    } else {
      setTopic([])
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
        ></div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'COURSE.NAME'})}
          </label>

          <select
            className='form-select form-select-solid form-select-md'
            {...formik.getFieldProps('courseId')}
            value={formik.values.topic?.courseId}
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
            {intl.formatMessage({id: 'TOPIC.NAME'})}
          </label>

          <select
            className='form-select form-select-solid form-select-md'
            {...formik.getFieldProps('topicId')}
            value={formik.values.topicId}
            // onChange={handleChangeDepartmentId}
          >
            <option value=''>Seçiniz</option>
            {/* ?? */}
            {topic.map((mytopic: any) => (
              <option value={mytopic?.id} key={mytopic?.id as any}>
                {mytopic?.name as any}
              </option>
            ))}
          </select>
          {/* end::Input */}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'LIBRARYCATEGORY.NAME'})}
          </label>

          <select
            className='form-select form-select-solid form-select-md'
            {...formik.getFieldProps('libraryCategoryId')}
            value={formik.values.libraryCategoryId}
            // onChange={handleChangeDepartmentId}
          >
            <option value=''>Seçiniz</option>
            {/* ?? */}
            {libraryCategory.map((mylibraryCategoryId: any) => (
              <option value={mylibraryCategoryId?.id} key={mylibraryCategoryId?.id as any}>
                {mylibraryCategoryId?.name as any}
              </option>
            ))}
          </select>
          {/* end::Input */}
        </div>

        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'IMAGELIBRARY.CODE'})}
          </label>

          <input
            //placeholder='Full name'
            {...formik.getFieldProps('code')}
            type='text'
            name='code'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.code && formik.errors.code},
              {
                'is-valid': formik.touched.code && !formik.errors.code,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {formik.touched.code && formik.errors.code && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.code}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'IMAGELIBRARY.FILE'})}{' '}
          </label>
          {/* <a href='' className='p-10'>
            <small style={{color: 'blue'}}>
              {intl.formatMessage({id: 'IMAGELIBRARY.FILE.TEXT'})}
            </small>
          </a> */}
          <FileUploader multiple={false} handleChange={handleFileChange} name='file' types={fileTypes} />
          <p>
            {/* {library?.file
                        ? `File name: ${library?.file?.[0]?.name || ''}`
                        : 'no files uploaded yet'} */}
          </p>
          {/* {formik.touched.file && formik.errors.file && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.file}</span>
              </div>
            </div>
          )} */}
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
            disabled={isThingLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
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
