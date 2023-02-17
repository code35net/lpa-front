import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model, Question} from '../questions/list/core/_models'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'



import {listThings as listAuditCategories} from '../audit-categories/list/core/_requests'
import {listThings as listQuestionCategories} from '../question-groups/list/core/_requests'
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

            unitId: values?.unitId,
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
