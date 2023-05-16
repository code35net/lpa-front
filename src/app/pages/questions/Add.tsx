import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model, Question} from '../questions/list/core/_models'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'
import {Field, ErrorMessage} from 'formik'
import {listSomeThings as listUnits} from '../units/list/core/_requests'
import {listThings as listAuditCategories} from '../audit-categories/list/core/_requests'
import {listThings as listQuestionCategories} from '../question-groups/list/core/_requests'
import {listAnswerTemplates} from '../answertemplates/list/core/_requests'
import {useQueryResponse} from '../questions/list/core/QueryResponseProvider'
import {useListView} from '../questions/list/core/ListViewProvider'
import {createBulkQuestions} from './list/core/_requests'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {listUsers} from '../user-management/list/core/_requests'
import {useNavigate} from 'react-router-dom'
import CustomSelect from '../../modules/custom-select/CustomSelect'

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
  const [units, setUnits] = React.useState([])
  const [auditcategories, setAuditCategories] = React.useState([])
  const [questionText, setQuestionText] = React.useState('')
  const [questioncategories, setQuestionCategories] = React.useState([])
  const [answertemplates, setAnswertemplates] = React.useState([])
  const [selectoption, setSelectoption] = React.useState('select')
  const [parentUnits, setParentUnits] = React.useState<any>([])

  const [questions, setQuestions] = React.useState<Array<Question>>([])

  const [Users, setUsers] = React.useState([])

  useEffect(() => {
    listAuditCategories().then((res2) => {
      if (res2?.data?.length) {
        setAuditCategories(res2.data || [])
      }
      // setAuditCategories(res2.data || [])
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
          unitId: Array.isArray(res2.data) && res2.data.length ? res2.data[0]?.id : null,
          isAddedQuestionCategory: true,
          isAuthorized: false,
          questionUsers: [],
        },
      ] as any)
    })

    listUsers().then((res7) => {
      setUsers(
        res7.data.map((a: any) => {
          return {value: a?.id, label: a?.fullName}
        }) || []
      )
    })
  }, [])

  const [formForEdit] = useState<Model>({
    ...item,
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

      // if (!values.unitId && units.length) {
      //   values.unitId = (units[0] as any)?.id
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

      values.questions = values?.questions?.map((item: Question) => {
        if (!item.isAddedQuestionCategory) {
          item.questionGroupId = null
        }
        return item
      })

      for await (const question of values?.questions) {
        try {
          await createBulkQuestions({
            auditCategoryId: values?.auditCategoryId,
            questions: [question],
            //questionUsers:[]
          } as any)
        } catch (error) {
          console.log(error)
        }
      }

      setLoading(false)
      formik.setSubmitting(false)
    },
  })

  const handleQuestionText = (text: string) => {
    //let index = questions.findIndex((question) => question.id === id)
    /*if (index > -1) {
      questions[index].text = text
    }*/
    questions.map((a) => {
      a.text = text
    })
    setQuestions([...questions])
    setQuestionText(text)
  }

  const handleAnswerTemplateId = (id: number, text: string) => {
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
      questions[index].answerTemplateId = parseInt(text)
    }
    setQuestions([...questions])
  }

  // const handleAuditCategoryId = async (event: any) => {
  //   console.log(event.target.value)
  //   formik.setFieldValue('auditCategoryId', event.target.value)
  //   if (event.target.value != '') {
  //     listUnits(event.target.value, 0).then((res3) => {
  //       setUnits(res3.data)
  //     })
  //   }
  // }

  // const handleAuditCategoryId = async (event: any) => {
  //   console.log(event.target.value)
  //   formik.setFieldValue('auditCategoryId', event.target.value)
  //   if (event.target.value == '9') {
  //     setSelectoption('select')
  //     listUnits(event.target.value, 0).then((res3) => {
  //       setUnits(res3.data)
  //     })
  //   } else if (event.target.value == '12') {
  //     setSelectoption('select')
  //     listUnits(event.target.value, 0).then((res3) => {
  //       setUnits(res3.data)
  //     })
  //   } else {
  //     setSelectoption('selectgroup')
  //     listUnits(event.target.value, 0).then((res3) => {
  //       setUnits(res3.data)
  //     })
  //   }
  // }

  const handleAuditCategoryId = async (event: any) => {
    formik.setFieldValue('auditCategoryId', event.target.value)
    listUnits(event.target.value, 0).then((res3) => {
      if (res3.data[0].parentUnitId == null) {
        setSelectoption('select')
        setUnits(res3.data)
      } else {
        setSelectoption('selectgroup')
        setUnits(res3.data)
      }
    })
  }

  const handleUnitId = (id: number, name: string) => {
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
      questions[index].unitId = parseInt(name)
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

  const handleIsAuthorized = (id: number, value: boolean) => {
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
      questions[index].isAuthorized = value
    }
    setQuestions([...questions])
  }

  const handleUserId = (id: any) => (data: any) => {
    let x: any[] = []
    data.map((item: any) => {
      x.push(item.value)
    })

    let index = questions.findIndex((question) => question.id === id)
    if (index > -1 && x?.length > 0) {
      questions[index].questionUsers = x
    }

    setQuestions([...questions])
  }

  const addQuestionItem = () => {
    if (questions[questions.length - 1].text) {
      questions.push({
        id: questions[questions.length - 1].id + 1,
        text: questionText,
        answerTemplateId: (answertemplates as any)[0]?.id as number,
        questionGroupId: (questioncategories as any)[0]?.id as number,
        unitId: (units as any)[0]?.id as number,
        isAddedQuestionCategory: true,
        isAuthorized: false,
        questionUsers: [],
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
  console.log(units)
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0'
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
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.AUDITCATEGORY'})}
              </label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('auditCategoryId')}
                  value={formik.values.auditCategoryId}
                  onChange={(e) => handleAuditCategoryId(e)}
                >
                  <option value=''>
                    {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.AUDITCATEGORY.SELECT'})}
                  </option>
                  {/* ?? */}
                  {auditcategories.map((auditcategory: any) => (
                    <option value={auditcategory?.id as any} key={auditcategory?.id as any}>
                      {auditcategory?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.TEXT'})}
              </label>

              <div className='col-md-8 fv-row'>
                <input
                  onChange={(e) => {
                    handleQuestionText(e.target.value)
                  }}
                  type='text'
                  className='form-control form-control-solid mb-3'
                  placeholder={intl.formatMessage({id: 'QUESTIONS.ADDPAGE.TEXT'})}
                  value={questionText}
                />
              </div>
            </div>

            <div className='separator separator-dashed my-6'></div>
            <div className='row mb-6'>
              {questions.map((question: Question) => {
                return (
                  <>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6 mt-6'>
                      {question.id}.{' '}
                      {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.QUESTIONTEXT_OPTION'})}
                    </label>

                    <div className='col-lg-12'>
                      <div className='row'>
                        <div className='col-md-2 fv-row'>
                          <div className='form-check form-check-solid form-switch'>
                            <label className='fw-bold mt-3'>
                              {intl.formatMessage({
                                id: 'QUESTIONS.ADDPAGE.IS_ADDED_QUESTION_CATEGORY',
                              })}
                            </label>

                            <input
                              checked={question.isAddedQuestionCategory}
                              onChange={(e) =>
                                handleIsAddedQuestionCategory(question?.id, e.target.checked)
                              }
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
                              defaultValue=''
                            >
                              <option value=''>
                                {intl.formatMessage({
                                  id: 'QUESTIONS.ADDPAGE.SELECT.QUESTION.CATEGORY',
                                })}
                              </option>
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
                            defaultValue=''
                          >
                            <option value=''>
                              {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.SELECT.ANSWERTEMPLATE'})}
                            </option>

                            {answertemplates.map((answertemplate: any) => (
                              <option value={answertemplate?.id} key={answertemplate?.id as any}>
                                {answertemplate?.text as any}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className='col-md-3 fv-row'>
                          <select
                            className='form-select form-select-solid form-select-md'
                            onChange={(e) => handleUnitId(question.id, e.target.value)}
                            value={question.unitId}
                            defaultValue=''
                          >
                            <option value=''>
                              {intl.formatMessage({id: 'QUESTIONS.ADDPAGE.SELECT.UNIT'})}
                            </option>

                            {selectoption == 'select' ? (
                              units.map((unit: any) => (
                                <option value={unit?.id} key={unit?.id as any}>
                                  {unit?.name as any}
                                </option>
                              ))
                            ) : (
                              <>
                                {/* {units
                                  .filter((unit) => unit !== null)
                                  .map(
                                    (unit: any) =>
                                      unit?.parentUnitName != null ? (
                                        !parentUnits.includes(unit.parentUnitName) ? (
                                          <>{parentUnits.push(unit.parentUnitName)}</>
                                        ) : null
                                      ) : null
                                    // console.log(unit)
                                  )} */}
                                {/* {parentUnits.map((name: any) => (
                                  <>
                                    <optgroup label={name as any}></optgroup>
                                    {units
                                      .filter((u: any) => u.parentUnitName !== null)
                                      .filter((u: any) => u.parentUnitName === name)
                                      .map((unit: any) => (
                                        <option value={unit?.id} key={unit?.id as any}>
                                          {unit?.name as any}
                                        </option>
                                      ))}
                                  </>
                                ))} */}

                                {units.map((unit: any) => {
                                  if (unit.parentUnitName !== null) {
                                    if (!parentUnits.includes(unit.parentUnitName)) {
                                      parentUnits.push(unit.parentUnitName)
                                    }
                                  }
                                  return null
                                })}
                                {parentUnits.map((name: any) => (
                                  <React.Fragment key={name}>
                                    <optgroup label={name as any}></optgroup>
                                    {units
                                      .filter((u: any) => u.parentUnitName === name)
                                      .map((unit: any) => (
                                        <option value={unit?.id} key={unit?.id as any}>
                                          {unit?.name as any}
                                        </option>
                                      ))}
                                  </React.Fragment>
                                ))}
                              </>
                            )}
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
                    <div className='col-lg-12 mt-10'>
                      <div className='row'>
                        <div className='col-md-2 fv-row'>
                          <div className='form-check form-check-solid form-switch'>
                            <label className='fw-bold mt-3'>
                              {intl.formatMessage({
                                id: 'QUESTIONS.ADDPAGE.ISAUTHORIZED',
                              })}
                            </label>

                            <input
                              checked={question.isAuthorized}
                              onChange={(e) => handleIsAuthorized(question?.id, e.target.checked)}
                              value={question.isAuthorized ? 'on' : 'off'}
                              className='form-check-input w-30 mt-2'
                              type='checkbox'
                              id='allowmarketing'
                            />
                            <label className='form-check-label'></label>
                          </div>
                        </div>
                        {question.isAuthorized && (
                          <div className='col-md-3 fv-row'>
                            <CustomSelect
                              options={Users}
                              onChange={handleUserId(question.id)}
                              // value={question.id}
                              isSearchable={true}
                              isMulti
                            />
                          </div>
                        )}
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
