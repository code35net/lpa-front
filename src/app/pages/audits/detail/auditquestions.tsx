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
import {FileUploader} from 'react-drag-drop-files'
const fileTypes = ['JPEG', 'PNG', 'JPG']

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
              answerTemplateOptionId: -1,
              option: true,
              notes: '',
              files: null,
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
          questionAnswers[index].actionText = ''
          questionAnswers[index].actionDate = new Date().toISOString()
          questionAnswers[index].actionUser = ''
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
      ;(questionAnswers as any)[index].actionText = value
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

  const submitAnswers = async (index: number) => {
    if (
      questionAnswers[index]?.questionId &&
      questionAnswers[index]?.auditId &&
      questionAnswers[index]?.answerTemplateOptionId !== -1
    ) {
      const formData = new FormData()
      if (questionAnswers[index]?.files?.[0])
        formData.append('files', questionAnswers[index]?.files?.[0])
      formData.append('questionId', questionAnswers[index].questionId)

      formData.append('auditId', questionAnswers[index].auditId)

      formData.append('answerTemplateOptionId', questionAnswers[index].answerTemplateOptionId)

      formData.append('option', questionAnswers[index].option)
      formData.append('notes', questionAnswers[index].notes)
      formData.append('actionText', questionAnswers[index].actionText)
      formData.append('actionDate', questionAnswers[index].actionDate)

      formData.append('actionUser', questionAnswers[index].actionUser)

      await addQuestionAnswers(formData)
    }

    Swal.fire({
      color: '#000000',
      title: 'Cevaplarınız başarıyla kaydedilmiştir.',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,

      timer: 1500,
    }).then(async () => {})
  }

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

              {!question?.auditQAnswer?.length ? (
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
                                    handleNeedAction(i, opt?.id)
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
                        handleNotes(i, e.target.value)
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
                          handleActionText(i, e.target.value)
                        }}
                      ></textarea>
                      Staff List
                      <select
                        className='form-select form-select-solid form-select-md'
                        name={`${question?.id}-actionUser`}
                        value={questionAnswers[i].actionUser}
                        onChange={(e) => {
                          handleActionUser(i, e.target.value)
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
                    <label className='required fw-bold fs-6 mb-2'>File</label>
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

                  <button
                    disabled={questionAnswers[i]?.answerTemplateOptionId === -1}
                    type='button'
                    className='btn btn-sm btn-dark btn-active-light-dark  mt-3 mb-3'
                    onClick={() => submitAnswers(i)}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                    Cevabı Kaydet
                  </button>

                  {/* edit::Reply input */}
                </>
              ) : (
                <div className='d-flex flex-column'>
                  <span className='text-gray-800 text-hover-primary fs-6 fw-bold pb-4'>
                   Yanıtlandı
                  </span>
                </div>
              )}
            </div>
            {/* end::Body */}
          </div>
        )
      })}
    </>
  )
}

export {AuditQuestionsForm}
