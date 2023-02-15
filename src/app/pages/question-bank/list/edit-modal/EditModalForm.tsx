import React, { FC, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { isNotEmpty, toAbsoluteUrl, KTSVG } from '../../../../../_metronic/helpers'
import { Model, QuestionOptions } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { ListLoading } from '../components/loading/ListLoading'
import { createThing, createCustomThing, getQuestionOptions, updateThing, getVisualUrl } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { listSomeThings as listCourses } from '../../../course/list/core/_requests'
import { listThings as listLibraries } from '../../../library/list/core/_requests'
import { Model as Library } from '../../../library/list/core/_models'
import { listThings as listTopics } from '../../../topic/list/core/_requests'
import { getAnswerTemplateOptions, listAnswerTemplates, listAnswerTemplates as listTemplates } from '../../../answertemplate/list/core/_requests'
import {
  StatisticsWidget1
} from '../../../../../_metronic/partials/widgets'

import Canvas from "../components/konva/containers/Canvas";
import Swal from 'sweetalert2'

type Props = {
  isThingLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  text: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Thing Name required')
})

const EditModalForm: FC<Props> = ({ item, isThingLoading }) => {
  const intl = useIntl()
  const { itemIdForUpdate, setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  // const [hasSurvey, setHasSurvey] = React.useState(false)

    const [points, setPoints] = React.useState([])
    const [course, setCourse] = React.useState([])
    const [activeImage, setActiveImage] = React.useState("")
  const [topic, setTopic] = React.useState([])
    const [answertemplate, setAnswerTemplate] = React.useState([])
    const [options, setOptions] = React.useState<Array<QuestionOptions>>([])
    const [libraries, setLibraries] = React.useState<Array<Library>>([])
    const [isPolyComplete, setPolyComplete] = useState(false)

  const [placeForEdit] = useState<Model>({
    text: undefined,
    topicId: undefined,
    topic: undefined,
    answerTemplateId: undefined,
    isConstantOption: item.answerTemplateId != undefined ? true : undefined,
    isTextQuestion: undefined,
    isVisualQuestion: undefined,
    libraryId: undefined,
    coordinat: undefined,
    questionoptions: [],
    ...item,
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
    listAnswerTemplates().then((res2) => {
      setAnswerTemplate(res2.data || [])
    })
      listLibraries().then((res3) => {
          setLibraries(res3.data || [])
      })
    getQuestionOptions(item.id?.toString() || "0").then((res) => 
    {
      res.data?.length == 0 ? setOptions([
        {
          id: 1,
          optionname: '',
          isTrue: true,
        },
      ] as any) : res.data != undefined ? setOptions(res.data.map((dat) => ({id: dat.id, optionName: dat.optionName, isTrue: dat.isTrue}))) : setOptions([
        {
          id: 1,
          optionname: '',
          isTrue: true,
        },
      ] as any)
    })

  }, [itemIdForUpdate])

  const handleQuestionOption = (id: number, optionname: string, isTrue: boolean) => {
    let index = options.findIndex((option) => option.id === id)
    if (index > -1) {
      options[index].optionName = optionname
      options[index].isTrue = isTrue
    }
    setOptions([...options])
  }
    const addOptionItem = () => {
      console.log(options)
        if (options[options.length - 1].optionName) {
            options.push({
                id: options[options.length - 1].id + 1,
                optionName: '',
                isTrue: false,
            })
            setOptions([...options])
        }
        else {
            Swal.fire({
                color: "#000000",
                text: (intl.formatMessage({ id: "QUESTION.WRITEOPTIONFIRSTTEXT" })),
                icon: 'warning',
                showCancelButton: false,
                // confirmButtonColor: '#000',
                // cancelButtonColor: 'primary',
                confirmButtonText: (intl.formatMessage({ id: "SWEETALERT.OK" }))
            })
        }
  }

  const deleteOptionItem = () => {
    if (options.length > 1) {
      options.pop()
      setOptions([...options])
    }
  }


  const handleIsTrue = (id: number, isTrue: boolean) => {
    console.log(id, isTrue)
    if(!isTrue){
      const index = options.findIndex((o) => o.id === id)
      if (index !== -1) {
        for (let i = 0; i < options.length; i++) {
          options[i].isTrue = i === index
        }
      }
      setOptions([...options])
    }
  }




  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      values.topic = undefined
      values.questionoptions = (values.isConstantOption || values.isTextQuestion) ? undefined : options
       
        try {

            if (formik.values.isVisualQuestion) {
                formik.values.coordinat = points.toString()
                
            }

        if (isNotEmpty(values.id)) {
          /*values.answerTemplateId = values.answerTemplateId == undefined ? 0 : values.answerTemplateId
          for(let i = 0; i<(values.questionoptions?.length || 0); i++)
          {
              values.questionoptions[i].
          }*/
          console.log(values)
          await createCustomThing(values)
        } else {

          if(formik.values.isConstantOption)
          {
              formik.values.questionType = 1
            await createThing(values)
          }
          else if(formik.values.isTextQuestion)
          {
              formik.values.questionType = 2
            await createCustomThing(values)
          }
          else if (formik.values.isVisualQuestion) {
              formik.values.questionType = 3
              await createCustomThing(values)
          }
          else if(!formik.values.isConstantOption && !formik.values.isTextQuestion)
          {
            formik.values.questionType = 0
            await createCustomThing(values)
          }

          
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
    }
    else {
      setTopic([])
    }

  }

    const handleChangeLibrary = async (event: any) => {
        formik.setFieldValue('libraryId', event.target.value)
        formik.values.libraryId = event.target.value
        console.log(event.target.options[event.target.selectedIndex].text)
        getVisualUrl(event.target.value, "original").then((res) =>
        {
            console.log(res)
            if (res == undefined)
                setActiveImage("")
            else
                setActiveImage(res)
        })
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
                {intl.formatMessage({ id: 'QUESTION.TEXT' })}
              </label>

              <input
                //placeholder='Full name'
                {...formik.getFieldProps('text')}
                type='text'
                name='text'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.text && formik.errors.text },
                  {
                    'is-valid': formik.touched.text && !formik.errors.text,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isThingLoading}
              />
              {formik.touched.text && formik.errors.text && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.text}</span>
                  </div>
                </div>
              )}
            </div>
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>
                {intl.formatMessage({ id: 'COURSE.NAME' })}
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
                {intl.formatMessage({ id: 'TOPIC.NAME' })}
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
            
               {/*
                 !formik.values.isConstantOption ? (
                      <div className='row mb-3'>
                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                        {intl.formatMessage({ id: 'QUESTION.ISTEXTQUESTION' })}
                      </label>

                      <div className='col-lg-8 d-flex align-items-center'>
                        <div className='form-check form-check-solid form-switch fv-row'>
                          <input
                            {...formik.getFieldProps('isTextQuestion')}
                            checked={formik.values.isTextQuestion}
                            onChange={(e) => formik.setFieldValue('isTextQuestion', e.target.checked)}
                            value={formik.values.isTextQuestion ? 'on' : 'off'}
                            className='form-check-input w-80px mt-2 border-secondary'
                            type='checkbox'
                            id='isTextQuestion' />
                          <label className='form-check-label mt-3 px-5'><small className='text-danger'>{intl.formatMessage({ id: 'QUESTION.ISTEXTQUESTION.TEXT' })}</small></label>
                        </div>
                      </div>
                   </div>
                 ) : null
              }
            {
              !formik.values.isTextQuestion ? (
                <div className='row mb-3'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    {intl.formatMessage({ id: 'QUESTION.ISCONSTANT' })}
                  </label>

                  <div className='col-lg-8 d-flex align-items-center'>
                    <div className='form-check form-check-solid form-switch fv-row'>
                      <input
                        {...formik.getFieldProps('isConstantOption')}
                        checked={formik.values.isConstantOption}
                        onChange={(e) => formik.setFieldValue('isConstantOption', e.target.checked)}
                        value={formik.values.isConstantOption ? 'on' : 'off'}
                        className='form-check-input w-80px mt-2 border-secondary'
                        type='checkbox'
                        id='isConstantOption' />
                      <label className='form-check-label mt-3 px-5'><small className='text-danger'>{intl.formatMessage({ id: 'QUESTION.ISCONSTANT.TEXT' })}</small></label>
                    </div>
                  </div>
                </div>

              ) : null
            */}
            <div className='row mb-3'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    {intl.formatMessage({ id: 'QUESTION.ISVISUAL' })}
                </label>
                <div className='col-lg-8 d-flex align-items-center'>
                    <div className='form-check form-check-solid form-switch fv-row'>
                        <input
                            {...formik.getFieldProps('isVisualQuestion')}
                            checked={formik.values.isVisualQuestion}
                            onChange={(e) => formik.setFieldValue('isVisualQuestion', e.target.checked)}
                            value={formik.values.isVisualQuestion ? 'on' : 'off'}
                            className='form-check-input w-80px mt-2 border-secondary'
                            type='checkbox'
                            id='isVisualQuestion' />
                        <label className='form-check-label mt-3 px-5'><small className='text-danger'>{intl.formatMessage({ id: 'QUESTION.ISVISUAL.TEXT' })}</small></label>
                    </div>
                </div>
            </div>
          </div>
          <div className='col-xl-6'>
            {
              (formik.values.isTextQuestion) ? (
                <div className='row mb-3'>
                  <div className='col-xl-12 me-3'>
                    <StatisticsWidget1
                      className='card-xl-stretch mb-xl-8 border border-rounded border-2'
                      image='abstract-2.svg'
                      title='Open-Ended Question'

                      description=''
                    />
                  </div>
                </div>

              ) : null
            }

            {
              formik.values.isConstantOption ? (
                <div className='fv-row mb-7'>
                  <div className='col-xl-12 me-3'>
                    <StatisticsWidget1
                      className='card-xl-stretch mb-xl-8 border border-rounded border-2'
                      image='abstract-2.svg'
                      title='Constant Choice'

                      description=''
                    />
                  </div>
                  <label className='required fw-bold fs-6 mb-2'>
                    {intl.formatMessage({ id: 'ANSWERTEMPLATES.NAME' })}
                  </label>
                  <select
                    className='form-select form-select-solid form-select-md'
                    {...formik.getFieldProps('answertemplateId')}
                    value={formik.values.answerTemplateId}
                  // onChange={handleChangeDepartmentId}
                  >
                    <option value=''>Seçiniz</option>
                    {/* ?? */}
                    {answertemplate.map((myanswertemplate: any) => (
                      <option value={myanswertemplate?.id} key={myanswertemplate?.id as any}>
                        {myanswertemplate?.text as any}
                      </option>
                    ))}
                  </select>
                  {/* end::Input */}
                </div>
              ) : null
            }

                      {
                          formik.values.isVisualQuestion ? (
                              <div className='fv-row mb-7'>
                                  <div className='col-xl-12 me-3'>
                                      <StatisticsWidget1
                                          className='card-xl-stretch mb-xl-8 border border-rounded border-2'
                                          image='abstract-2.svg'
                                          title={intl.formatMessage({ id: 'QUESTION.ISVISUAL' })}

                                          description=''
                                      />
                                  </div>

                                  <label className='required fw-bold fs-6 mb-2'>
                                      {intl.formatMessage({ id: 'IMAGELIBRARY.PAGE.TITLE' })}
                                  </label>
                                  <select
                                      className='form-select form-select-solid form-select-md'
                                      {...formik.getFieldProps('libraryId')}
                                      value={formik.values.libraryId}
                                      onChange={handleChangeLibrary}

                                  // onChange={handleChangeDepartmentId}
                                  >
                                      <option value=''>Seçiniz</option>
                                      {/* ?? */}
                                      {libraries.map((library: any) => (
                                          <option value={library?.id} key={library?.id as any}>
                                              {library?.code as any}
                                          </option>
                                      ))}
                                  </select>


                                  <div className='row mb-3'>
                                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                          {intl.formatMessage({ id: 'QUESTION.HASSIGN' })}
                                      </label>
                                      <div className='col-lg-8 d-flex align-items-center'>
                                          <div className='form-check form-check-solid form-switch fv-row'>
                                              <input
                                                  {...formik.getFieldProps('hasSign')}
                                                  checked={formik.values.hasSign}
                                                  onChange={(e) => formik.setFieldValue('hasSign', e.target.checked)}
                                                  value={formik.values.hasSign ? 'on' : 'off'}
                                                  className='form-check-input w-80px mt-2 border-secondary'
                                                  type='checkbox'
                                                  id='hasSign' />
                                              <label className='form-check-label mt-3 px-5'><small className='text-danger'>{intl.formatMessage({ id: 'QUESTION.HASSIGN.TEXT' })}</small></label>
                                          </div>
                                      </div>
                                  </div>

                                  <div className='row mb-3'>
                                      <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                          {intl.formatMessage({ id: 'QUESTION.HASTHREAD' })}
                                      </label>
                                      <div className='col-lg-8 d-flex align-items-center'>
                                          <div className='form-check form-check-solid form-switch fv-row'>
                                              <input
                                                  {...formik.getFieldProps('hasThread')}
                                                  checked={formik.values.hasThread}
                                                  onChange={(e) => formik.setFieldValue('hasThread', e.target.checked)}
                                                  value={formik.values.hasThread ? 'on' : 'off'}
                                                  className='form-check-input w-80px mt-2 border-secondary'
                                                  type='checkbox'
                                                  id='hasThread' />
                                              <label className='form-check-label mt-3 px-5'><small className='text-danger'>{intl.formatMessage({ id: 'QUESTION.HASTHREAD.TEXT' })}</small></label>
                                          </div>
                                      </div>
                                  </div>

                                  <div className='row mb-12'>
                                      {options.map((option: QuestionOptions, index: number) => {
                                          return (
                                              <div key={`${option.id}`}>
                                                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                                                      {index + 1}. {intl.formatMessage({ id: 'ANSWERTEMPLATES.OPTIONS' })}
                                                  </label>

                                                  <div className='col-lg-12'>
                                                      <div className='row'>
                                                          <div className='col-md-7 fv-row'>
                                                              <input
                                                                  name={`${option.id}`}
                                                                  id={`${option.id}`}
                                                                  onChange={(e) => {
                                                                      handleQuestionOption(option.id, e.target.value, option.isTrue)
                                                                  }}
                                                                  type='text'
                                                                  className='form-control form-control-solid'
                                                                  placeholder={intl.formatMessage({ id: 'ANSWERTEMPLATES.OPTIONTEXT' })}
                                                                  value={option.optionName}
                                                              />
                                                          </div>

                                                          <div className='col-md-3 mt-3 fv-row'>
                                                              <label className='form-check form-check-inline form-check-solid me-5'>
                                                                  <input
                                                                      className='form-check-input'
                                                                      name='isTrue'
                                                                      type='radio'
                                                                      checked={option.isTrue}
                                                                      onChange={() => handleIsTrue(option.id, option.isTrue)}
                                                                  />
                                                                  <span className='fw-bold ps-2 fs-6'>
                                                                      {intl.formatMessage({ id: 'ANSWERTEMPLATES.ISPRESENT' })}
                                                                  </span>
                                                              </label>
                                                          </div>

                                                          <div className='col-md-1 fv-row'>
                                                              <a
                                                                  type='button'
                                                                  onClick={deleteOptionItem}
                                                                  className='btn btn-sm btn-danger btn-active-light-danger'
                                                              >
                                                                  <KTSVG path='/media/icons/duotune/arrows/arr010.svg' />
                                                              </a>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          )
                                      })}
                                  </div>
                                  {/* end::Input */}



                                  <div className='row mb-6'>
                                      <div className='mb-2 col-lg-4 fv-row'>
                                          <button
                                              type='button'
                                              onClick={addOptionItem}
                                              className='btn btn-sm btn-secondary btn-active-light-primary'
                                          >
                                              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' />{' '}
                                              {intl.formatMessage({ id: 'ANSWERTEMPLATES.ADDOPTION' })}
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ) : null
                      }

                      {
                          (!formik.values.isConstantOption && !formik.values.isTextQuestion && !formik.values.isVisualQuestion) ? (
                <div className='fv-row mb-7'>
                  <div className='col-xl-12 me-3'>
                    <StatisticsWidget1
                      className='card-xl-stretch mb-xl-8 border border-rounded border-2'
                      image='abstract-2.svg'
                      title='Multiple Choice'

                      description=''
                    />
                  </div>
                  <div className='row mb-12'>
                    {options.map((option: QuestionOptions, index:number ) => {
                      return (
                        <div key={`${option.id}`}>
                          <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                            {index+1}. {intl.formatMessage({ id: 'ANSWERTEMPLATES.OPTIONS' })}
                          </label>

                          <div className='col-lg-12'>
                            <div className='row'>
                              <div className='col-md-7 fv-row'>
                                <input
                                  name={`${option.id}`}
                                  id={`${option.id}`}
                                  onChange={(e) => {
                                    handleQuestionOption(option.id, e.target.value, option.isTrue)
                                  }}
                                  type='text'
                                  className='form-control form-control-solid'
                                  placeholder={intl.formatMessage({ id: 'ANSWERTEMPLATES.OPTIONTEXT' })}
                                  value={option.optionName}
                                />
                              </div>


                              <div className='col-md-3 mt-3 fv-row'>
                                <label className='form-check form-check-inline form-check-solid me-5'>
                                  <input
                                    className='form-check-input'
                                    name='isTrue'
                                    type='radio'
                                    checked={option.isTrue}
                                    onChange={() => handleIsTrue(option.id, option.isTrue)}
                                  />
                                  <span className='fw-bold ps-2 fs-6'>
                                    {intl.formatMessage({ id: 'ANSWERTEMPLATES.ISTRUE' })}
                                  </span>
                                </label>
                              </div>

                              <div className='col-md-1 fv-row'>
                                <a
                                  type='button'
                                  onClick={deleteOptionItem}
                                  className='btn btn-sm btn-danger btn-active-light-danger'
                                >
                                  <KTSVG path='/media/icons/duotune/arrows/arr010.svg' />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className='row mb-6'>
                    <div className='mb-2 col-lg-4 fv-row'>
                      <a
                        type='button'
                        onClick={addOptionItem}
                        className='btn btn-sm btn-secondary btn-active-light-primary'
                      >
                        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' />{' '}
                        {intl.formatMessage({ id: 'ANSWERTEMPLATES.ADDOPTION' })}
                      </a>
                    </div>
                  </div>
                </div>
              ) : null
            }
          </div>
        </div>

              {
                  formik.values.isVisualQuestion &&
                  <Canvas imageSource={activeImage} setPoints={setPoints} points={points}
                      isPolyComplete={isPolyComplete} setPolyComplete={setPolyComplete}
                      hasThread={formik.values.hasThread}
                  />
              }

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-sm btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting || isThingLoading}
          >
            {intl.formatMessage({ id: 'FORM.DISCARD' })}
          </button>

                  <button
                      type='submit'
                      className='btn btn-sm btn-info'
                      data-kt-items-modal-action='submit'
                      disabled={
                          (isThingLoading || formik.isSubmitting || !formik.isValid || !formik.touched) || (formik.values.isVisualQuestion && !isPolyComplete)
                      }
                  >
                      <span className='indicator-label'> {intl.formatMessage({ id: 'FORM.SAVE' })}</span>
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

export { EditModalForm }
