import {useMemo, useEffect} from 'react'
import {useTable} from 'react-table'
import {useIntl} from 'react-intl'
import {KTSVG, QUERIES} from '../../../../_metronic/helpers'
import {useQueryResponseData, useQueryResponseLoading} from '../list/core/QueryResponseProvider'
import {Columns} from '../list/table/columns/_columns'
import {useQuery} from 'react-query'
import {useLocation} from 'react-router-dom'
import { getAuctionDetails } from '../list/core/_requests'

const ActionDetails = () => {
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
      return getAuctionDetails(id as string)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  console.log(response?.data)
  return (
    <>
     

      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Action Details</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Audit Category</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{Array.isArray(response?.data) && response?.data?.length  ?  response?.data[0]?.auditCategoryName: ''}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Department</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'></span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Section</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'></span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Birim</label>

            <div className='col-lg-8'>{Array.isArray(response?.data) && response?.data?.length  ?  response?.data[0]?.unitName: ''}</div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Question Category</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{Array.isArray(response?.data) && response?.data?.length  ?  response?.data[0]?.questionGroupName: ''}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Auditor Position</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'></span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Auditor</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{Array.isArray(response?.data) && response?.data?.length  ?  response?.data[0]?.auditor: ''}</span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Period</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'></span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Date</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'></span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Status</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{Array.isArray(response?.data) && response?.data?.length  ?  response?.data[0]?.status: ''}</span>
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
                <span className='card-label fw-bold fs-3 mb-1'>Aksiyon Sonucu</span>
              </h3>
            </div>

            <div className='separator separator-dashed'></div>

            <div className='card-body py-6'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                YORUM SATIRI
                    <br />
                    Buraya bir textbox gelecek ve detayı gelen tabloda text ile belirtilen kolon güncellenecek. bu güncelleme tek sefer olacak. yani güncelleme yapılıncatextbox içeriği ile beraber deaktif olacak
                    <br />
                    tabi bir de ActionCode guid gelmesi lazım backend çalışıyor ama ben burdan guid gönderemedim 
                {/* end::Table */}
              </div>
              {/* end::Table container */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {ActionDetails}
