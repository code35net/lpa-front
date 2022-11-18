import {useMemo, useEffect, useState} from 'react'
import {useTable} from 'react-table'
import {useIntl} from 'react-intl'
import {KTSVG, QUERIES} from '../../../../_metronic/helpers'
import {useQueryResponseData, useQueryResponseLoading} from '../list/core/QueryResponseProvider'
import {Columns} from '../list/table/columns/_columns'
import {useQuery} from 'react-query'
import {useLocation, Link} from 'react-router-dom'
import {getUserDetails} from '../list/core/_requests'

const UserDetails = () => {
  const items = useQueryResponseData()
  const intl = useIntl()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => items, [items])
  const columns = useMemo(() => Columns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  const useLocQuery = () => {
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])
  }
  let query = useLocQuery()
  const id: string | null = query.get('Id')

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      return getUserDetails(id as string)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )


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
                        ? response?.data[0]?.fullName
                        : ''}
                </span>
                </div>

              </div>

              <div className='d-flex my-4'>
              {/* <Link to={`/audits/auditquestions/${response?.data[0]?.id}`} className="btn btn-sm btn-danger"> 
              Start Audit
                    </Link>
                */}
                
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      
                      <div className='fs-2 fw-bolder'>
                      {Array.isArray(response?.data) && response?.data?.length
                        ? response?.data[0]?.department
                        : ''}
                      </div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Total Audits</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      
                      <div className='fs-2 fw-bolder'>15</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Successed</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>4</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Not Started</div>
                  </div>

                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Audit Completion / Year</span>
                  <span className='fw-bolder fs-6'>80%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-info rounded h-5px'
                    role='progressbar'
                    style={{width: '80%'}}
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
            <h3 className='fw-bolder m-0'>User Details</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Position</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.position
                  : ''}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Department</label>

            <div className='col-lg-8 fv-row'>
            <span className='fw-bolder fs-6 text-dark'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.department
                  : ''}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'></span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Identity</label>

            <div className='col-lg-8'>
              {Array.isArray(response?.data) && response?.data?.length
                ? response?.data[0]?.identity
                : ''}
            </div>
          </div>


          
        </div>
      </div>


    </>
  )
}

export {UserDetails}
