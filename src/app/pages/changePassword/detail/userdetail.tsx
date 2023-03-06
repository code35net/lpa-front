import {useMemo, useEffect, useState} from 'react'
import {useTable} from 'react-table'
import {useIntl} from 'react-intl'
import {QUERIES} from '../../../../_metronic/helpers'
import {useQueryResponseData, useQueryResponseLoading} from '../list/core/QueryResponseProvider'
import {Columns} from '../list/table/columns/_columns'
import {useQuery} from 'react-query'
import {useLocation, Link} from 'react-router-dom'
import {getUserDetails} from '../list/core/_requests'
import {getQuestionById} from '../../questions/list/core/_requests'

const UserDetails = () => {
  const intl = useIntl()
  
  
  const useLocQuery = () => {
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])
  }
  let query = useLocQuery()
  const id: string | null = query.get('Id')

  const response = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      return getUserDetails(id as string)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const [showModal, setShowModal] = useState(false)

  const [selectedQuestionId, setSelectedQuestionId] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

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
                {response?.data?.fullName}
                    </span>
                </div>

              </div>

              <div className='d-flex my-4'>
              {/* <Link to={`/user-management/useredit/${response?.data[0]?.id}`} className="btn btn-sm btn-warning">  */}

{/*               
              Edit User
                    </Link> */}
               
                
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      
                      <div className='fs-2 fw-bolder'>
                      {/* {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.questionCount
                  : ''} */}
                      </div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{intl.formatMessage({id: 'USER.DETAILS.TOTAL'})}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      
                      <div className='fs-2 fw-bolder'>15</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{intl.formatMessage({id: 'USER.DETAILS.SUCCESS'})}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>4</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{intl.formatMessage({id: 'USER.DETAILS.FAILED'})}</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>1</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{intl.formatMessage({id: 'USER.DETAILS.NOTAPPLİCABLE'})}</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>{intl.formatMessage({id: 'USER.DETAILS.COMPLETION'})}</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-info rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
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
            <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'USER.DETAILS.TITLE'})}</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'USER.DETAILS.NAME'})}</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
              {response?.data?.fullName}
              </span>
            </div>
          </div>

          

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'USER.DETAILS.MAIL'})}</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>
              {response?.data?.email}
              </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'USER.DETAILS.IDENTITY'})}</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
              {response?.data?.identity}
              </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'USER.DETAILS.DEPARTMENT'})}</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
              {response?.data?.departmentName}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'USER.DETAILS.POSITION'})}</label>

            <div className='col-lg-8'>
            <span className='fw-bold fs-6'>
              {response?.data?.positionName}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'USER.DETAILS.ROLE'})}</label>

            <div className='col-lg-8'>
            <span className='fw-bold fs-6'>
              {response?.data?.roleName}
              </span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'USER.DETAILS.SHIFT'})}</label>

            <div className='col-lg-8'>
            <span className='fw-bold fs-6'>
              {response?.data?.shift}
              </span>
            </div>
          </div>
        </div>
      </div>

     
    </>
  )
}

export {UserDetails}
