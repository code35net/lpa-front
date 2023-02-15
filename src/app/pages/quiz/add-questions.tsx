/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../_metronic/helpers'
import {useFormik} from 'formik'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import {listThings as listQuestions} from '../question-bank/list/core/_requests'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Model as QuestionModel, QuestionOptions } from '../question-bank/list/core/_models'
import { listThings } from '../library/list/core/_requests'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import { createQuizQuestion, deleteSelectedQuizQuestions } from './list/core/_requests'
import { Model as QuizModel, QuizQuestionModel} from './list/core/_models'
import qs from 'qs'
import { useQueryResponseData } from '../library/list/core/QueryResponseProvider'

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
  
  
  const AddQuestion: FC = () => {
    const intl = useIntl()
    const navigate = useNavigate()  
  
    useEffect(() => {
      listQuestions().then((res3) => {
      setQuestions( res3.data.map((a: any) => ({ value: a.id, label: a.text })) || [])
    })      
    }, [])
  
    const [formForEdit] = useState<QuizModel>({
      questions: [],
    } as QuizModel)
  
    //   const updateData = (fieldsToUpdate: Partial<Model>): void => {
    //     const updatedData = Object.assign(data, fieldsToUpdate)
    //     setData(updatedData)
    //   }
  
    const [questions, setQuestions] = React.useState([])    
    
    const qsd = parseInt(qs.parse(window.location.search, { ignoreQueryPrefix: true }).Id?.toString() || "0")
    
    const [selectedQuestions, setSelectedQuestions] = React.useState([0])

    const [loading, setLoading] = useState(false)
    const formik = useFormik({
      initialValues: formForEdit,
      // validationSchema: editchema,
      onSubmit: async (values) => {
        setLoading(true)
  
        //todo add/update
        for(let i = 0; i< selectedQuestions.length; i++)
        {
          console.log(Object.keys(selectedQuestions[i]).length, selectedQuestions[i])
          if(Object.keys(selectedQuestions[i]).length > 0 || !isNaN(+selectedQuestions[i]))
          {
            //deleteSelectedQuizQuestions()
            const QQM = { quizId: qsd, questionId: parseInt(selectedQuestions[i].toString() || "0") }
            createQuizQuestion(QQM)
          }
        }

        setLoading(false)
        formik.setSubmitting(false)
      },
    })
  
  
const handleOnChange = (e: any) =>
{
    setSelectedQuestions([...e])  
    console.log(selectedQuestions)
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
            <DualListBox
                canFilter
                onChange={(e) => handleOnChange(e)}
                options={questions}
                selected={selectedQuestions}
            />
            </div>
  
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button
                type='submit'
                onClick={() => {
                  formik.submitForm().then(() => {
                    navigate('/quiz/list')
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
  
  
  export {AddQuestion}
