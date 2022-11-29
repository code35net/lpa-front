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
     
     

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-12'>
          <div className={`card`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>Aksiyon Sonuçları</span>
              </h3>
            </div>

            <div className='separator separator-dashed'></div>

            <div className='card-body py-6'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}

              {response?.data[0]?.finding}
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
