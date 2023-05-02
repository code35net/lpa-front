import {useMemo, useEffect, useState} from 'react'
import {useTable} from 'react-table'
import {useIntl} from 'react-intl'
import {QUERIES} from '../../../../_metronic/helpers'
import {useQueryResponseData, useQueryResponseLoading} from '../list/core/QueryResponseProvider'
import {Columns} from '../list/table/columns/_columns'
import {useQuery} from 'react-query'
import {useLocation, Link} from 'react-router-dom'
import {getAuditDetails} from '../list/core/_requests'
import {getQuestionById} from '../../questions/list/core/_requests'
import moment from 'moment'

const AuditDetails = () => {
  const intl = useIntl()

  const useLocQuery = () => {
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])
  }
  let query = useLocQuery()
  const id: string | null = query.get('Id')

  const {data: response} = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      return getAuditDetails(id as string)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const [showModal, setShowModal] = useState(false)

  const [selectedQuestionId, setSelectedQuestionId] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const qtotal =
    Array.isArray(response?.data) && response?.data?.length
      ? response?.data[0]?.auditQuestions.length
      : ''
  const atotal =
    Array.isArray(response?.data) && response?.data?.length ? response?.data[0]?.answeredCount : ''
  const percentage = (atotal * 100) / qtotal

  useEffect(() => {
    if (selectedQuestionId) {
      getQuestionById(selectedQuestionId).then((response: any) => {
        setSelectedQuestion(response)
      })
    } else {
      setSelectedQuestion(null)
    }
  }, [selectedQuestionId])

  useEffect(() => {
    if (!showModal) {
      setSelectedQuestionId(null)
    }
  }, [showModal])

  const [value, setValue] = useState('')

  useEffect(() => {
    if (response?.data[0]?.status == 'NotStarted') {
      setValue(`${intl.formatMessage({id: 'ACTION.TABLE.NOTSTART'})}`)
    } else if (response?.data[0]?.status == 'InProgress') {
      setValue(`${intl.formatMessage({id: 'ACTION.TABLE.PROGRESS'})}`)
    } else if (response?.data[0]?.status == 'Finished') {
      setValue(`${intl.formatMessage({id: 'ACTION.TABLE.FINISHED'})}`)
    } else if (response?.data[0]?.status == 'Canceled') {
      setValue(`${intl.formatMessage({id: 'ACTION.TABLE.Canceled'})}`)
    } else setValue(``)
  }, [value, response])

  // const percentage2 = (response?.data[0]?.trueCount * 100) / qtotal

  const percentage2 =
    (response?.data[0]?.trueCount * 100) /
    (response?.data[0]?.needActionCount + response?.data[0]?.trueCount)

  const today = new Date()
  const dataDate = new Date(response?.data[0].date)

  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <span className='text-gray-800 fs-2 fw-bolder me-1'>
                      {Array.isArray(response?.data) && response?.data?.length
                        ? response?.data[0]?.auditName
                        : ''}
                    </span>
                  </div>
                </div>

                <div className='d-flex my-4'>
                  {Array.isArray(response?.data) &&
                  response?.data[0]?.status === 'NotStarted' &&
                  today >= dataDate ? (
                    <Link
                      to={`/audits/auditquestions/${response?.data[0]?.id}`}
                      className='btn btn-sm btn-info'
                    >
                      {intl.formatMessage({id: 'AUDITS.DETAIL.START'})}
                    </Link>
                  ) : (
                    <>
                      <p className='fw-bolder fs-6 text-dark'>
                        {moment(response?.data[0].date).format('DD-MM-YYYY')}
                        {intl.formatMessage({id: 'AUDIT.START.TEXT'})}
                      </p>
                    </>
                  )}
                  {Array.isArray(response?.data) &&
                  response?.data[0]?.status === 'InProgress' &&
                  today >= dataDate ? (
                    <Link
                      to={`/audits/auditquestions/${response?.data[0]?.id}`}
                      className='btn btn-sm btn-warning'
                    >
                      {intl.formatMessage({id: 'AUDITS.DETAIL.CONTINUE'})}
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>{qtotal}</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {intl.formatMessage({id: 'AUDITS.DETAIL.TOTAL'})}
                      </div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>
                          {Array.isArray(response?.data) && response?.data?.length
                            ? response?.data[0]?.trueCount
                            : ''}
                        </div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {intl.formatMessage({id: 'AUDITS.DETAIL.SUCCESS'})}
                      </div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>
                          {Array.isArray(response?.data) && response?.data?.length
                            ? response?.data[0]?.needActionCount
                            : ''}
                        </div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {intl.formatMessage({id: 'AUDITS.DETAIL.FAIL'})}
                      </div>
                    </div>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>{atotal}</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {intl.formatMessage({id: 'AUDITS.DETAIL.ANSWERED'})}
                      </div>
                    </div>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>
                          {Number.isNaN(percentage2) ? '-' : percentage2.toFixed(2)} / 100
                        </div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {intl.formatMessage({id: 'SUCCESS_PERCENTAGE'})}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                  <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                    <span className='fw-bold fs-6 text-gray-400'>
                      {intl.formatMessage({id: 'AUDITS.DETAIL.COMPLETION'})}
                    </span>
                    <span className='fw-bolder fs-6'>
                      {Number.isNaN(percentage) ? '0' : percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className='h-5px mx-3 w-100 bg-light mb-3'>
                    <div
                      className='bg-info rounded h-5px'
                      role='progressbar'
                      style={{width: percentage}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'AUDITS.DETAIL.DETAILS'})}</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.CATEGORY'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.auditCategoryName
                  : ''}
              </span>
            </div>
          </div>

          {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.DEPARTMENT'})}
            </label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.departmentName
                  : ''}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.SECTION'})}
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.sectionName
                  : ''}
              </span>
            </div>
          </div> */}

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.UNITT'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.unitName
                  : ''}
              </span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.AUDITOR'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.auditor
                  : ''}
              </span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.PLANED'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? moment(response?.data[0]?.date).format('DD.MM.YYYY')
                  : ''}
              </span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.STARTED'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? moment(response?.data[0]?.started).format('DD.MM.YYYY')
                  : ''}
              </span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.ENDED'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? moment(response?.data[0]?.ended).format('DD.MM.YYYY')
                  : ''}
              </span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>
              {intl.formatMessage({id: 'AUDITS.DETAIL.STATUS'})}
            </label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length ? value : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-12'>
          <div className={`card`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>
                  {intl.formatMessage({id: 'AUDITS.DETAIL.AUDIT.QUESTIONS'})}
                </span>
              </h3>
            </div>

            <div className='separator separator-dashed'></div>

            <div className='card-body py-6'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gs-0 gy-5'>
                  {/* begin::Table head */}
                  <thead>
                    <tr>
                      <th className='p-0 w-50px'>Id</th>
                      <th className='p-0 min-w-200px'>
                        {intl.formatMessage({id: 'AUDITS.DETAIL.QUESTION'})}
                      </th>
                      <th className='p-0 min-w-200px'>
                        {intl.formatMessage({id: 'AUDITS.DETAIL.QUESTION.CATEGORY'})}
                      </th>
                      <th className='p-0 min-w-200px'>
                        {intl.formatMessage({id: 'AUDITS.DETAIL.ANSWER'})}
                      </th>
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {Array.isArray(response?.data) &&
                      response?.data?.length &&
                      Array.isArray(response?.data[0]?.auditQuestions) &&
                      response?.data[0]?.auditQuestions?.length &&
                      response?.data[0]?.auditQuestions.map((question: any) => {
                        return (
                          <tr key={question?.id}>
                            <td>{question?.id}</td>
                            <td>
                              <a
                                href='#'
                                className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                              >
                                {question?.text}
                              </a>
                            </td>
                            <td>
                              <a
                                href='#'
                                className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                              >
                                {question?.questionGroupName}
                              </a>
                            </td>
                            <td>
                              <a
                                href='#'
                                className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                              >
                                {question?.optionName ? question?.optionName : '-'}
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {AuditDetails}
