import {useMemo, useEffect, useState} from 'react'
import {useTable} from 'react-table'
import * as Yup from 'yup'
import {useIntl} from 'react-intl'
import {KTSVG, QUERIES} from '../../../../_metronic/helpers'
import {useQueryResponseData, useQueryResponseLoading} from '../list/core/QueryResponseProvider'
import {Columns} from '../list/table/columns/_columns'
import {useQuery} from 'react-query'
import {useLocation, Link, useNavigate} from 'react-router-dom'
import {
  getAuditDetails,
  getAuditQuestions,
  finishAudit as finishAuditB,
} from '../list/core/_requests'
import {addQuestionAnswers, getQuestionById} from '../../questions/list/core/_requests'
import {listUsers} from '../../user-management/list/core/_requests'

import {useParams} from 'react-router-dom'
import clsx from 'clsx'
import moment from 'moment'
import Swal from 'sweetalert2'
import {FileUploader} from 'react-drag-drop-files'
import {set} from 'date-fns'

const fileTypes = ['JPEG', 'PNG', 'JPG']

const AuditQuestionsForm = () => {
  const items = useQueryResponseData()

  const params = useParams()

  const intl = useIntl()

  const [questions, setQuestions] = useState<any>([])

  const [findings, setfindings] = useState<any>([])

  const [pStaffList, setPStaffList] = useState([])

  const [questionAnswers, setQuestionAnswers] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [allQuestionAnswered, setAllQuestionAnswered] = useState(false)
  console.log(params)
  useEffect(() => {
    if (params?.auditId) {
      getAuditQuestions(params.auditId).then((res) => {
        if (res?.data && Array.isArray(res?.data)) {
          let tempQA: any = []
          res?.data.forEach((el: any) => {
            tempQA.push({
              questionId: el?.id,
              auditId: params?.auditId,
              answerTemplateOptionId: -1,
              option: true,
              notes: '',
              files: null,
              finding: '',
              actionDate: new Date().toISOString(),
              actionUser: '',
            })
          })
          setQuestionAnswers([...tempQA])

          setQuestions(res?.data)
        }
      })

      listUsers().then((res) => {
        setPStaffList(res.data)
      })
    }
  }, [params])

  useEffect(() => {
    checkAllQuestionsAnswered()
  }, [questions])

  const handleNeedAction = (index: number, optionId: number) => {
    if (index !== -1 && index < questions.length) {
      const optionIndex: number = (questions as any)[index].answerOptions.findIndex(
        (o: any) => o?.id === optionId
      )

      if (optionIndex !== -1) {
        ;(questions as any)[index].needAction = (questions as any)[index].answerOptions[
          optionIndex
        ]?.needAction

        questionAnswers[index].answerTemplateOptionId = (questions as any)[index].answerOptions[
          optionIndex
        ]?.id

        if (!((questions as any)[index] as any).needAction) {
          questionAnswers[index].finding = ''
          questionAnswers[index].actionDate = new Date().toISOString()
          questionAnswers[index].actionUser = 1
        }

        setQuestionAnswers([...questionAnswers])

        setQuestions([...questions])
      }
    }
  }

  const handleNotes = (index: number, value: string) => {
    if (index !== -1 && index < questionAnswers.length) {
      ;(questionAnswers as any)[index].notes = value
      setQuestionAnswers([...questionAnswers])
    }
  }

  const handleActionText = (index: number, value: string) => {
    if (index !== -1 && index < questionAnswers.length) {
      ;(questionAnswers as any)[index].finding = value
      setQuestionAnswers([...questionAnswers])
    }
  }

  const handleActionDatetime = (index: number, value: string) => {
    if (index !== -1 && index < questionAnswers.length) {
      ;(questionAnswers as any)[index].actionDate = new Date(value).toISOString()
      setQuestionAnswers([...questionAnswers])
    }
  }

  const handleFiles = (index: number, files: any) => {
    if (index !== -1 && index < questionAnswers.length) {
      ;(questionAnswers as any)[index].files = files
      setQuestionAnswers([...questionAnswers])
    }
  }

  const handleActionUser = (index: number, value: string) => {
    if (index !== -1 && index < questionAnswers.length) {
      ;(questionAnswers as any)[index].actionUser = value
      setQuestionAnswers([...questionAnswers])
    }
  }
  console.log(questionAnswers)
  console.log(questions)

  const submitAnswers = async () => {
    setLoading(true)
    for (let index = 0; index < questions.length; index++) {
      if (
        questionAnswers[index]?.questionId &&
        questionAnswers[index]?.auditId &&
        questionAnswers[index]?.answerTemplateOptionId !== -1 &&
        questions[index].auditQAnswer.length < 1
      ) {
        const formData = new FormData()

        if (questionAnswers[index]?.files?.[0])
          formData.append('files', questionAnswers[index]?.files?.[0])

        formData.append('questionId', questionAnswers[index].questionId)

        formData.append('auditId', questionAnswers[index].auditId)
        formData.append('needAction', (questions as any)[index].needAction)

        formData.append('answerTemplateOptionId', questionAnswers[index].answerTemplateOptionId)

        formData.append('option', questionAnswers[index].option)
        formData.append('notes', questionAnswers[index].notes)
        formData.append('finding', questionAnswers[index].finding)
        formData.append('actionDate', questionAnswers[index].actionDate)

        formData.append('actionUser', questionAnswers[index].actionUser)

        await addQuestionAnswers(formData)
        ;(questions as any)[index].auditQAnswer = [{isAnswered: true}]
      }

      //;(questions as any)[index].auditQAnswer = [{isAnswered: true}]
      setQuestions([...questions])
    }

    checkAllQuestionsAnswered()
    setLoading(false)
    Swal.fire({
      color: '#000000',
      title: 'Cevaplarınız başarıyla kaydedilmiştir.',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,

      timer: 1500,
    })
  }

  const finishAudit = async () => {
    await finishAuditB(params?.auditId)
  }

  const checkAllQuestionsAnswered = () => {
    let result = true
    for (const question of questions) {
      if (!(question as any)?.auditQAnswer?.length) {
        result = false
        break
      }
    }
    setAllQuestionAnswered(result)
  }

  useEffect(() => {
    let x = ''
    let y = ''
    y = (questions as any).filter((item: any) => item?.needAction == true)

    const filteredArray = (questionAnswers as any).filter((item1: any) =>
      (y as any).some((item2: any) => item2.id === item1.questionId)
    )
    x = (filteredArray as any).filter((item: any) => item?.finding == '')
    setfindings(x)
  }, [questionAnswers])

  // console.log(questionAnswers)
  // console.log(questions)

  return (
    // <PageTitle>sdfsdfs</PageTitle>

    <>
      {questions.map((question: any, i: number) => {
        return (
          <div key={`${question?.id}-question`} className={`card mb-7`}>
            {/* begin::Body */}
            <div className='card-body pb-0'>
              {/* begin::Header */}
              <div className='d-flex align-items-center mb-5'>
                {/* begin::User */}
                <div className='d-flex align-items-center flex-grow-1'>
                  {/* begin::Avatar */}
                  <div className='symbol symbol-45px me-5'>{i + 1}</div>
                  {/* end::Avatar */}

                  {/* begin::Info */}
                  <div className='d-flex flex-column'>
                    <span className='text-gray-800 fs-6 fw-bold'>{question?.text}</span>
                  </div>
                  {/* end::Info */}
                </div>
                {/* end::User */}
              </div>
              {/* end::Header */}
              {/* begin::Post */}

              {!question?.auditQAnswer?.length ? (
                <>
                  <div className='mb-5'>
                    <div className='row mb-3'>
                      {/* begin::Text */}
                      {question.answerOptions.map((opt: any) => {
                        return (
                          <div className='col-lg-1 fv-row'>
                            <div className='d-flex align-items-center mt-3'>
                              <label className='form-check form-check-inline form-check-solid me-5'>
                                <input
                                  className='form-check-input'
                                  name={`${question?.id}-q`}
                                  type='radio'
                                  value={opt?.id}
                                  onChange={() => {
                                    handleNeedAction(i, opt?.id)
                                  }}
                                />
                                <span className='fw-bold ps-2 fs-6'>{opt?.optionName}</span>
                              </label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {/* end::Text */}
                    <label className=' fw-bold fs-6 mb-2'>
                      {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.NOTES'})}
                    </label>
                    <textarea
                      className='form-control p-2 border-1 p-0 pe-5 resize-none min-h-25px'
                      rows={4}
                      name={`${question?.id}-notes`}
                      value={questionAnswers[i].notes}
                      // placeholder='buraya metin gelecek..'
                      onChange={(e) => {
                        handleNotes(i, e.target.value)
                      }}
                    ></textarea>
                  </div>
                  {/* end::Post */}
                  {/* begin::Separator */}
                  <div className='separator mb-4'></div>
                  {/* end::Separator */}
                  {/* begin::Reply input */}
                  {question?.needAction && (
                    <div>
                      <label className='required fw-bold fs-6 mb-2'>
                        {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.FIND'})}
                      </label>
                      <textarea
                        className='form-control p-2   border-1 p-0 pe-10 resize-none min-h-25px'
                        // required={question?.needAction}
                        rows={4}
                        name={`${question?.id}-finding`}
                        value={questionAnswers[i].finding}
                        // placeholder='buraya need action true olunca bulgular gelecek..'
                        onChange={(e) => {
                          handleActionText(i, e.target.value)
                        }}
                      ></textarea>
                      <label className='required fw-bold fs-6 mb-2 mt-4'>
                        {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.STAFF'})}
                      </label>
                      <select
                        className='form-select form-select-solid form-select-md'
                        name={`${question?.id}-actionUser`}
                        value={questionAnswers[i].actionUser}
                        onChange={(e) => {
                          handleActionUser(i, e.target.value)
                        }}
                      >
                        <option value=''>
                          {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.CHOOSE'})}
                        </option>
                        {pStaffList.map((user: any) => (
                          <option value={user?.id as any} key={user?.id as any}>
                            {user?.fullName as any}
                          </option>
                        ))}
                      </select>
                      <div className='fv-row mb-3'>
                        {/* begin::Label */}
                        <label className='required fw-bold fs-6 mb-2 mt-4'>
                          {intl.formatMessage({id: 'LASTDATE'})}
                        </label>
                        {/* end::Label */}

                        {/* begin::Input */}
                        <input
                          //placeholder='Full name'
                          type='datetime-local'
                          name={`${question?.id}-actionDate`}
                          value={moment(questionAnswers[i].actionDate).format(
                            'YYYY-MM-DDTHH:mm:ss'
                          )}
                          onChange={(e) => {
                            handleActionDatetime(i, e.target.value)
                          }}
                          className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                          autoComplete='off'
                        />
                        {/* end::Input */}
                      </div>
                    </div>
                  )}

                  <div className='fv-row mb-3'>
                    {/* begin::Label */}
                    <label className='required fw-bold fs-6 mb-2'>
                      {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.FILE'})}
                    </label>
                    {/* end::Label */}
                    <FileUploader
                      multiple={true}
                      handleChange={(files: any) => handleFiles(i, files)}
                      name='files'
                      types={fileTypes}
                    />
                    <p>
                      {questionAnswers[i]?.files
                        ? `File name: ${questionAnswers[i]?.files?.[0]?.name || ''}`
                        : 'no files uploaded yet'}
                    </p>
                  </div>

                  {/* edit::Reply input */}
                </>
              ) : (
                <div className='d-flex flex-column'>
                  <span className='text-success fs-6 fw-bold pb-4'>
                    {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.ANSWERED'})}
                  </span>
                </div>
              )}
            </div>
            {/* end::Body */}
          </div>
        )
      })}

      {!allQuestionAnswered && (
        <button
          type='button'
          style={{width: '200px', position: 'fixed', bottom: '0px', right: '200px'}}
          disabled={allQuestionAnswered || loading || findings.length}
          className='btn btn-sm btn-dark btn-active-light-dark  mt-3 mb-3'
          onClick={() => submitAnswers()}
        >
          {!loading && intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.SAVECHANGES'})}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.SAVEANSWERS'})}{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      )}

      {allQuestionAnswered && (
        <button
          type='button'
          style={{width: '200px', position: 'fixed', bottom: '0px', right: '200px'}}
          className='btn btn-sm btn-secondary btn-active-light-danger  mt-3 mb-3'
          onClick={() =>
            finishAudit().then(() => {
              navigate('/audits/list')
            })
          }
        >
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.FINISH'})}
        </button>
      )}
    </>
  )
}

export {AuditQuestionsForm}
