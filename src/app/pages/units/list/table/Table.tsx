import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {useIntl} from 'react-intl'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {Columns} from './columns/_columns'
import {Model} from '../core/_models'
import {ListLoading} from '../components/loading/ListLoading'
import {ListPagination} from '../components/pagination/ListPagination'
import {KTCardBody} from '../../../../../_metronic/helpers'
import qs from 'qs'


const Table = () => {
  
  const qsd2 = qs.parse(window.location.search, { ignoreQueryPrefix: true }).unitId
  let items = useQueryResponseData()

  if(qsd2 == null)
  {
    items = items.filter(a => a.parentUnitId == null)
  }
  items = items.sort((a: any, b: any) => a.unitType == 2 ? -1 : 1)
  console.log(items)
  const intl = useIntl()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => items, [items])
  const columns = useMemo(() => Columns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
  console.log(data)

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_items'
          className='table align-middle table-row-dashed dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Model>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Model>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                  {intl.formatMessage({id: 'TABLE.NORECORD'})}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ListPagination />
      {isLoading && <ListLoading />}
    </KTCardBody>
  )
}

export {Table}
