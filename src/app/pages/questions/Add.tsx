import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model, Question} from '../questions/list/core/_models'
import {Model as Section} from '../sections/list/core/_models'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'

import {listDepartments} from '../departments/list/core/_requests'
import {listSections} from '../sections/list/core/_requests'
import {listUnits} from '../units/list/core/_requests'
import {listAuditCategories} from '../auditcategories/list/core/_requests'
import {listQuestionCategories} from '../questioncategories/list/core/_requests'
import {listAnswerTemplates} from '../answertemplates/list/core/_requests'
import {useQueryResponse} from '../questions/list/core/QueryResponseProvider'
import {useListView} from '../questions/list/core/ListViewProvider'
import {createBulkQuestions} from './list/core/_requests'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'


import {useNavigate} from 'react-router-dom'

type Props = {
  //    isPlaceLoading: boolean
  item?: Model
}
// const editchema = Yup.object().shape({
//   text: Yup.string()
//     .max(50, 'Maximum 50 symbols')
//     .required('Question required'),
// })


const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
    
  },
 
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]


const EditForm: FC<Props> = ({item}) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const [departments, setDepartments] = React.useState([])
  const [sections, setSections] = React.useState([])
  const [units, setUnits] = React.useState([])
  const [auditcategories, setAuditCategories] = React.useState([])
  const [questioncategories, setQuestionCategories] = React.useState([])
  const [answertemplates, setAnswertemplates] = React.useState([])

  const [questions, setQuestions] = React.useState<Array<Question>>([])

  useEffect(() => {
    listDepartments().then((res) => {
      if (res?.data?.length) {
        setDepartments(res.data || [])

        // listSections(res?.data[0]?.id).then((res3) => {
        //   setSections(res3.data || [])
        // })
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

      setQuestions([
        {
          id: 1,
          text: '',
          answerTemplateId: Array.isArray(res2.data) && res2.data.length ? res2.data[0]?.id : null,
          questionGroupId: Array.isArray(res2.data) && res2.data.length ? res2.data[0]?.id : null,
          isAddedQuestionCategory: true,
        },
      ] as any)
    })
  }, [])

  const [formForEdit] = useState<Model>({
    ...item,
    sectionId: undefined,
    departmentId: undefined,
    unitId: undefined,
    auditCategoryId: undefined,
    questions: [],
  } as Model)

  //   const updateData = (fieldsToUpdate: Partial<Model>): void => {
  //     const updatedData = Object.assign(data, fieldsToUpdate)
  //     setData(updatedData)
  //   }

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: formForEdit,
    // validationSchema: editchema,
    onSubmit: async (values) => {
      setLoading(true)

      if (!values.departmentId && departments.length) {
        values.departmentId = (departments[0] as any)?.id
      }

      if (!values.sectionId && sections.length) {
        values.sectionId = (sections[0] as any)?.id
      }
      // if (!values.unitId && units.length) {
      //   values.unitId, = (units[0] as any)?.id
      // }

      if (!values.answerTemplateId && answertemplates.length) {
        values.answerTemplateId = (answertemplates[0] as any)?.id
      }
      if (!values.auditCategoryId && auditcategories.length) {
        values.auditCategoryId = (auditcategories[0] as any)?.id
      }



      
      if (!questions[questions.length - 1].text && questions.length > 1) {
        questions.pop()
      }
      values.questions = questions


      values.questions = values?.questions?.map((item:Question)=>{

        if(!item.isAddedQuestionCategory)
        {
          item.questionGroupId = null;
        }
        return item;
      })

      for await (const question of values?.questions)
      {
        try {
          await createBulkQuestions({
            sectionId: values?.sectionId,
            unitId: values?.unitId,
            departmentId: values?.departmentId,
            auditCategoryId: values?.auditCategoryId,
            questions : [question]
          } as any)
        } catch (error) {
          console.log(error)
        }

      }
     

      setLoading(false)
      formik.setSubmitting(false)
    },
  })

  const handleChangeDepartmentId = async (event: any) => {
    formik.setFieldValue('departmentId', event.target.value)
    if(event.target.value != '')
    {
    listSections(event.target.value).then((res) => {
      setSections(res.data)
    })
  }
    else
    {
      setSections([])
    }
  
  }


  
  const handleChangeSectionId = async (event: any) => {
    formik.setFieldValue('sectionId', event.target.value)
    if(event.target.value != '')
    {
    listUnits(event.target.value).then((res) => {
      setUnits(res.data.filter((a: any) => a.unitType == 2))
    })
  }
  else
  {
    setUnits([])
  }
  }

  const handleQuestionText = (id: number, text: string) => {
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
      questions[index].text = text
    }
    setQuestions([...questions])
  }

  const handleAnswerTemplateId = (id: number, text: string) => {
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
      questions[index].answerTemplateId = parseInt(text)
    }
    setQuestions([...questions])
  }

  const handleQuestionGroupId = (id: number, text: string) => {
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
      questions[index].questionGroupId = parseInt(text)
    }
    setQuestions([...questions])
  }

  const handleIsAddedQuestionCategory = (id: number, value: boolean) => {
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
      questions[index].isAddedQuestionCategory = value
    }
    setQuestions([...questions])
  }

  const addQuestionItem = () => {
    if (questions[questions.length - 1].text) {
      questions.push({
        id: questions[questions.length - 1].id + 1,
        text: '',
        answerTemplateId: (answertemplates as any)[0]?.id as number,
        questionGroupId: (questioncategories as any)[0]?.id as number,
        isAddedQuestionCategory: true,
      })
      setQuestions([...questions])
    }
  }

  const deleteQuestionItem = () => {
    if (questions.length > 1) {
      questions.pop()
      setQuestions([...questions])
    }
  }

  return (
    
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'QUESTIONS.ADDPAGE.TITLE'})}</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e)
          }}
          noValidate
          className='form'
        >
          <div className='card-body border-top p-9'>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.DEPARTMENT'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('departmentId')}
                  value={formik.values.departmentId}
                  onChange={handleChangeDepartmentId}
                >
                  <option value=''>Seçiniz</option>
                  {/* ?? */}
                  {departments.map((department: any) => (
                    <option value={department?.id} key={department?.id as any}>
                      {department?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.SECTION'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('sectionId')}
                  value={formik.values.sectionId}
                  onChange={handleChangeSectionId}
                >
                  <option value=''>Seçiniz</option>
                  {/* ?? */}
                  {sections.map((section: any) => (
                    <option value={section?.id} key={section?.id as any}>
                      {section?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>
                  {intl.formatMessage({id: 'AUDITS.DETAIL.UNIT'})}
                </span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('unitId')}
                  value={formik.values.unitId}
                  onChange={formik.handleChange}
                >
                  <option value=''>Seçiniz</option>
                  {/* ?? */}
                  {units.map((unit: any) => (
                    <option value={unit?.id} key={unit?.id as any}>
                      {unit?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.AUDITCATEGORY'})}
              </label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('auditCategoryId')}
                  value={formik.values.auditCategoryId}
                  onChange={formik.handleChange}
                >
                  <option value=''>Seçiniz</option>
                  {/* ?? */}
                  {auditcategories.map((auditcategory: any) => (
                    <option value={auditcategory?.id as any} key={auditcategory?.id as any}>
                      {auditcategory?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            

            <div className='separator separator-dashed my-6'></div>
            <div className='row mb-6'>
              {questions.map((question: Question) => {
                return (
                  <>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      {question.id}.{' '}
                      {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.QUESTIONTEXT_OPTION'})}
                    </label>

                    <div className='col-lg-12'>
                      <div className='row'>
                        <div className='col-md-12 fv-row'>
                          <input
                            key={`${question.id}`}
                            name={`${question.id}`}
                            id={`${question.id}`}
                            onChange={(e) => {
                              handleQuestionText(question.id, e.target.value)
                            }}
                            type='text'
                            className='form-control form-control-solid mb-3'
                            placeholder='Question text'
                            value={question.text}
                          />
                        </div>
                        </div>
                        <div className='row'>
                        <div className='col-md-3 fv-row'>
                          
                          <div className='form-check form-check-solid form-switch'>
                          <label className='fw-bold mt-3'>
                            
                            {intl.formatMessage({
                              id: 'QUESTIONS.ADDPAGE.IS_ADDED_QUESTION_CATEGORY',
                            })}
                          </label>

                   
                   


                              <input
                                checked={question.isAddedQuestionCategory}
                                onChange={(e)=> handleIsAddedQuestionCategory(question?.id,e.target.checked)}
                                value={question.isAddedQuestionCategory ? 'on' : 'off'}
                                className='form-check-input w-30 mt-2'
                                type='checkbox'
                                id='allowmarketing'
                              />
                              <label className='form-check-label'></label>
                            </div>
                         
                        </div>

                        {question.isAddedQuestionCategory && (
                          <div className='col-md-3 fv-row'>
                            

                            <select
                            className='form-select form-select-solid form-select-md'
                            onChange={(e) => handleQuestionGroupId(question.id, e.target.value)}
                            value={question.questionGroupId || 0}
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
                          
                          </div>
                        )}

                        <div className='col-md-3 fv-row'>
                        
                        
                        <select
                              className='form-select form-select-solid form-select-md'
                              onChange={(e) => handleAnswerTemplateId(question.id, e.target.value)}
                              value={question.answerTemplateId}
                            >

                              {answertemplates.map((answertemplate: any) => (
                                <option value={answertemplate?.id} key={answertemplate?.id as any}>
                                  {answertemplate?.text as any}
                                </option>
                              ))}
                            </select>
                        </div>
                        <div className='col-md-1 fv-row'>
                          <a
                            type='button'
                            onClick={deleteQuestionItem}
                            className='btn btn-sm btn-danger btn-active-light-danger'
                          >
                            <KTSVG path='/media/icons/duotune/arrows/arr010.svg' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>

            <div className='row mb-6'>
              <div className='mb-2 col-lg-4 fv-row'>
                <a
                  type='button'
                  onClick={addQuestionItem}
                  className='btn btn-sm btn-secondary btn-active-light-primary'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' />{' '}
                  {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.ADDBUTTON'})}
                </a>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='submit'
              onClick={() => {
                formik.submitForm().then(() => {
                  navigate('/questions/list')
                })
              }}
              className='btn btn-sm btn-dark'
              disabled={loading}
            >
              {!loading && `${intl.formatMessage({id: 'QUESTIONS.ADDPAGE.SAVE'})}`}
              
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {intl.formatMessage({id: 'MODALFORM.WAIT'})}{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {EditForm}
