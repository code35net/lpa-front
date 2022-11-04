import {useMemo, useEffect, useState} from 'react'
import {useTable} from 'react-table'
import {useIntl} from 'react-intl'
import {KTSVG, QUERIES} from '../../../../_metronic/helpers'
import {useQueryResponseData, useQueryResponseLoading} from '../list/core/QueryResponseProvider'
import {Columns} from '../list/table/columns/_columns'
import {useQuery} from 'react-query'
import {useLocation, Link, useNavigate} from 'react-router-dom'
import {getAuditDetails, getAuditQuestions} from '../list/core/_requests'
import {addQuestionAnswers, getQuestionById} from '../../questions/list/core/_requests'

import {useParams} from 'react-router-dom'
import {listStaffs} from '../../staffs/list/core/_requests'
import clsx from 'clsx'
import moment from 'moment'
import Swal from 'sweetalert2'

const AuditQuestionsForm = () => {
  const items = useQueryResponseData()

  const params = useParams()

  const intl = useIntl()

  const [questions, setQuestions] = useState([])

  const [pStaffList, setPStaffList] = useState([])

  const [questionAnswers, setQuestionAnswers] = useState<any>([])

  const navigate = useNavigate()

  useEffect(() => {
    if (params?.auditId) {
      getAuditQuestions(params.auditId).then((res) => {
        if (res?.data && Array.isArray(res?.data)) {
          let tempQA: any = []
          res?.data.forEach((el: any) => {
            tempQA.push({
              questionId: el?.id,
              auditId: params?.auditId,
              answerTemplateOptionId: 0,
              option: true,
              notes: '',
              files: '',
              actionText: '',
              actionDate: new Date().toISOString(),
              actionUser: '',
            })
          })
          setQuestionAnswers([...tempQA])

          setQuestions(res?.data)
        }
      })
    }
  }, [params])

  useEffect(() => {
    listStaffs().then((res) => {
      if (res?.data && Array.isArray(res?.data)) {
        setPStaffList(res?.data)
      }
    })
  }, [])

  const handleNeedAction = (questionId: number, optionId: number) => {
    const findIndex: number = questions.findIndex((q: any) => q?.id === questionId)

    if (findIndex !== -1) {
      const optionIndex: number = (questions[findIndex] as any).answerOptions.findIndex(
        (o: any) => o?.id === optionId
      )

      if (optionIndex !== -1) {
        ;(questions[findIndex] as any).needAction = (questions[findIndex] as any).answerOptions[
          optionIndex
        ]?.needAction

        const questAnsFindIndex: number = questionAnswers.findIndex(
          (qa: any) => qa?.questionId === (questions[findIndex] as any)?.id
        )
        if (questAnsFindIndex !== 1) {
          questionAnswers[questAnsFindIndex].answerTemplateOptionId = (
            questions[findIndex] as any
          ).answerOptions[optionIndex]?.id

          if (!(questions[findIndex] as any).needAction) {
            questionAnswers[questAnsFindIndex].actionText = ''
            questionAnswers[questAnsFindIndex].actionDate = new Date().toISOString()
            questionAnswers[questAnsFindIndex].actionUser = ''
          }
        }
        setQuestionAnswers([...questionAnswers])

        setQuestions([...questions])
      }
    }
  }

  const handleNotes = (questionId: number, value: string) => {
    const questAnsFindIndex: number = questionAnswers.findIndex(
      (qa: any) => qa?.questionId === questionId
    )
    if (questAnsFindIndex !== 1) {
      questionAnswers[questAnsFindIndex].notes = value
    }
    setQuestionAnswers([...questionAnswers])
  }

  const handleActionText = (questionId: number, value: string) => {
    const questAnsFindIndex: number = questionAnswers.findIndex(
      (qa: any) => qa?.questionId === questionId
    )
    if (questAnsFindIndex !== 1) {
      questionAnswers[questAnsFindIndex].actionText = value
    }
    setQuestionAnswers([...questionAnswers])
  }

  const handleActionDatetime = (questionId: number, value: string) => {
    const questAnsFindIndex: number = questionAnswers.findIndex(
      (qa: any) => qa?.questionId === questionId
    )
    if (questAnsFindIndex !== 1) {
      questionAnswers[questAnsFindIndex].actionDate = new Date(value).toISOString()
    }
    setQuestionAnswers([...questionAnswers])
  }

  const handleActionUser = (questionId: number, value: string) => {
    const questAnsFindIndex: number = questionAnswers.findIndex(
      (qa: any) => qa?.questionId === questionId
    )
    if (questAnsFindIndex !== 1) {
      questionAnswers[questAnsFindIndex].actionUser = value
    }
    setQuestionAnswers([...questionAnswers])
  }

  const submitAnswers = async () => {
    for await (const answers of questionAnswers) {
      if (answers?.questionId && answers?.auditId && answers?.answerTemplateOptionId) {
        await addQuestionAnswers(answers)
      }
    }

    Swal.fire({
      color: '#000000',
      title: 'Cevaplarınız başarıyla kaydedilmiştir.',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,

      timer: 1500,
    }).then(async () => {
      navigate('/audits/list')
    })
  }

  return (
    // <PageTitle>sdfsdfs</PageTitle>

    <>
      <button
        type='button'
        className='btn btn-sm btn-dark btn-active-light-dark  mb-3'
        onClick={submitAnswers}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Cevapları Kaydet
      </button>
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
                  <div className='symbol symbol-45px me-5'>{question?.id}</div>
                  {/* end::Avatar */}

                  {/* begin::Info */}
                  <div className='d-flex flex-column'>
                    <span className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                      {question?.text}
                    </span>
                  </div>
                  {/* end::Info */}
                </div>
                {/* end::User */}
              </div>
              {/* end::Header */}
              {/* begin::Post */}

              {!question?.createdAt ? (
                <>
                  <div className='mb-5'>
                    {/* begin::Text */}
                    {question.answerOptions.map((opt: any) => {
                      return (
                        <div key={`${opt?.id}-opt`} className='row mb-3'>
                          <div className='col-lg-8 fv-row'>
                            <div className='d-flex align-items-center mt-3'>
                              <label className='form-check form-check-inline form-check-solid me-5'>
                                <input
                                  className='form-check-input'
                                  name={`${question?.id}-q`}
                                  type='radio'
                                  value={opt?.id}
                                  onChange={() => {
                                    handleNeedAction(question?.id, opt?.id)
                                  }}
                                />
                                <span className='fw-bold ps-2 fs-6'>{opt?.optionName}</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {/* end::Text */}
                    Notes
                    <textarea
                      className='form-control border-0 p-0 pe-10 resize-none min-h-25px'
                      rows={4}
                      name={`${question?.id}-notes`}
                      value={questionAnswers[i].notes}
                      placeholder='buraya metin gelecek..'
                      onChange={(e) => {
                        handleNotes(question?.id, e.target.value)
                      }}
                    ></textarea>
                    <div className='position-absolute top-0 end-0 me-n5'>
                      <span className='btn btn-icon btn-sm btn-active-color-primary pe-0 me-2'>
                        <KTSVG
                          path='/media/icons/duotune/communication/com008.svg'
                          className='svg-icon-3 mb-3'
                        />
                      </span>
                    </div>
                  </div>
                  {/* end::Post */}
                  {/* begin::Separator */}
                  <div className='separator mb-4'></div>
                  {/* end::Separator */}
                  {/* begin::Reply input */}
                  {question?.needAction && (
                    <div>
                      Findings
                      <textarea
                        className='form-control border-0 p-0 pe-10 resize-none min-h-25px'
                        rows={4}
                        name={`${question?.id}-actionText`}
                        value={questionAnswers[i].actionText}
                        placeholder='buraya need action true olunca bulgular gelecek..'
                        onChange={(e) => {
                          handleActionText(question?.id, e.target.value)
                        }}
                      ></textarea>
                      Staff List
                      <select
                        className='form-select form-select-solid form-select-md'
                        name={`${question?.id}-actionUser`}
                        value={questionAnswers[i].actionUser}
                        onChange={(e) => {
                          handleActionUser(question?.id, e.target.value)
                        }}
                      >
                        <option value=''>Seçiniz</option>
                        {pStaffList.map((user: any) => (
                          <option value={user?.id as any} key={user?.id as any}>
                            {user?.email as any}
                          </option>
                        ))}
                      </select>
                      <div className='fv-row mb-3'>
                        {/* begin::Label */}
                        <label className='required fw-bold fs-6 mb-2'>Date time</label>
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
                            handleActionDatetime(question?.id, e.target.value)
                          }}
                          className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                          autoComplete='off'
                        />
                        {/* end::Input */}
                      </div>
                    </div>
                  )}

                  {/* edit::Reply input */}
                </>
              ) : null}
            </div>
            {/* end::Body */}
          </div>
        )
      })}

      <button
        type='button'
        className='btn btn-sm btn-dark btn-active-light-dark mt-3'
        onClick={submitAnswers}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Cevapları Kaydet
      </button>
    </>
  )
}

export {AuditQuestionsForm}
