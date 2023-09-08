import React, {FC, useState, useEffect} from 'react'
import {
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3,
  ChartsWidget4,
  ChartsWidget5,
  ChartsWidget6,
  ChartsWidget7,
  ChartsWidget8,
} from '../../../_metronic/partials/widgets'
import {useAuth} from '../../modules/auth'
import {useIntl} from 'react-intl'
import {getDashboardData} from '../audits/list/core/_requests'
const Charts: FC = () => {
  const [reportsInfoPercentage, setReportsInfoPercentage] = useState()
  const {currentUser}: any = useAuth()

  const fileUrl = 'http://freudapi.iqualitor.com/Files/file/Freudenberg_Admin.pdf'
  const fileUrl2 = 'http://freudapi.iqualitor.com/Files/file/Freudenberg_Auditor.pdf'

  const intl = useIntl()
  const [data, setData]: any = useState([])

  console.log(currentUser)

  useEffect(() => {
    getDashboardData(currentUser?.id).then((res: any) => {
      setData(res)
    })
  }, [])
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-12'>
          {currentUser?.roleName == 'Inspector' ? (
            <div className='card mb-5 mb-xl-10'>
              <div className='card-body pt-9 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                  <div className='flex-grow-1'>
                    <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                      <div className='d-flex flex-column'>
                        <div className='d-flex align-items-center mb-2'>
                          <span className='text-gray-800 fs-3 fw-bolder me-1'>
                            {currentUser?.fullName} {intl.formatMessage({id: 'UserInfo'})}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='d-flex flex-wrap flex-stack'>
                      <div className='d-flex flex-column flex-grow-1 pe-8'>
                        <div className='d-flex flex-column'>
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{data?.actionCount}</div>
                            </div>

                            <div className='fw-bold fs-6 text-gray-400'>
                              {intl.formatMessage({id: 'ActionCount'})}
                            </div>
                          </div>
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{data?.auditCount}</div>
                            </div>

                            <div className='fw-bold fs-6 text-gray-400'>
                              {intl.formatMessage({id: 'AuditCount'})}
                            </div>
                          </div>
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{data?.endedAuditCount}</div>
                            </div>

                            <div className='fw-bold fs-6 text-gray-400'>
                              {intl.formatMessage({id: 'FinshedAuditCount'})}
                            </div>
                          </div>
                          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                            <div className='d-flex align-items-center'>
                              <div className='fs-2 fw-bolder'>{data?.inProgressAuditCount}</div>
                            </div>

                            <div className='fw-bold fs-6 text-gray-400'>
                              {intl.formatMessage({id: 'OpenAuditCount'})}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ChartsWidget1
              reportsInfo={reportsInfoPercentage}
              setReportsInfo={setReportsInfoPercentage}
              className='card-xl-stretch mb-xl-8'
            />
          )}
        </div>
      </div>
      {/* end::Row */}

      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className='row g-5 g-xl-8'>
      <div className='col-xl-12'>
          <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div> */}

      {/* <div className='row g-5 g-xl-8'>
      
        <div className='col-xl-12'>
          <ChartsWidget6 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div> */}
      {/* end::Row */}

      {/* begin::Row */}

      {/* end::Row */}
    </>
  )
}

export {Charts}
