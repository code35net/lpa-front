import React, {FC, useState, useEffect} from 'react'
import {ID} from '../../../_metronic/helpers'
import {Model} from './list/core/_models'
import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'
import {getDashboardData} from '../audits/list/core/_requests'
import qs from 'qs'
type Props = {
  //    isPlaceLoading: boolean
  item?: Model
}

const UserDetail: FC<Props> = ({item}) => {
  const params = useParams()
  const intl = useIntl()
  const [data, setData] = React.useState<any>([])

  useEffect(() => {
    const qsd = qs.parse(window.location.search, {ignoreQueryPrefix: true}).userId ?? null
    getDashboardData(qsd).then((res: any) => {
      setData(res)
      console.log(res)
    })
  }, [])

  return (
    <div className='card mb-5 mb-xl-10'>
      {' '}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <span className='text-gray-800 fs-3 fw-bolder me-1'>
                      {intl.formatMessage({id: 'UserInfo2'})}
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
    </div>
  )
}

export {UserDetail}
