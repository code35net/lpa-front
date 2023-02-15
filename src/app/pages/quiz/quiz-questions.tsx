/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useMemo, useState, useEffect } from 'react'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import { createQuizQuestion, getAddedThings, getOtherThings, deleteSelectedQuizQuestions,addQuizQuestions } from './list/core/_requests'
import { Model as QuizModel, QuizQuestionModel} from './list/core/_models'
import qs from 'qs'
import { useQueryResponseData } from '../library/list/core/QueryResponseProvider'
import {QUERIES} from '../../../_metronic/helpers'
import {useParams, useLocation} from 'react-router-dom'
import {useQuery} from 'react-query'
import Swal from 'sweetalert2'


//   const Breadcrumbs: Array<PageLink> = [
//     {
//       title: 'Home',
//       path: '/dashboard',
//       isSeparator: false,
//       isActive: false,
      
//     },
   
//     {
//       title: '',
//       path: '',
//       isSeparator: true,
//       isActive: false,
//     },
//   ]




const QuizQuestion: FC = () => {
    const items = useQueryResponseData()
    const location = useLocation()
    const params = useParams()
    const intl = useIntl()
    const navigate = useNavigate()  
    const [loading, setLoading] = useState(false)

    const [questions, setQuestions] = React.useState([])    
    
    //const qsd = parseInt(qs.parse(window.location.search, { ignoreQueryPrefix: true }).Id?.toString() || "0")
    
    const [selectedQuestions, setSelectedQuestions] = React.useState([0])
    const searchParams = new URLSearchParams(location.search)
    const qsd = searchParams.get("Id")

    useEffect(() => {
      getAddedThings(qsd).then((res3) => {
      setQuestions( res3.otherQuestions.map((a: any) => ({ value: a.id, label: a.text })) || [])
      setSelectedQuestions( res3.addedQuestions.map((a: any) => (a.id)) || [0])
    })      
    }, [])
  
 
const handleOnChange = (e: any) =>
{
  console.log(e)
    setSelectedQuestions([...e])  
    //console.log(selectedQuestions)
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
              e.preventDefault()
              console.log(e)

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
                  addQuizQuestions(parseInt(qsd?.toString() || "0"), selectedQuestions).then((res) =>
                  {
                      let result = JSON.parse(res).result

                      if(result == "success")
                      {
                        Swal.fire({
                          title: (intl.formatMessage({id: "SWEETALERT.UPDATED"})),
                          text: (intl.formatMessage({id: "SWEETALERT.UPDATESUCCESS"})),
                          icon: 'success',
                          timer: 2000,
                          showConfirmButton:false
                        })
                      }
                      else
                      {
                        Swal.fire({
                          title: (intl.formatMessage({id: "SWEETALERT.UPDATED"})),
                          text: (result),
                          icon: 'error',
                          timer: 2000,
                          showConfirmButton:false
                        })
                      }
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
  
  
  export {QuizQuestion}
