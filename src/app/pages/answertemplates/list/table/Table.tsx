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

const Table = () => {
  const items = useQueryResponseData()
  const intl = useIntl()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => items, [items])
  const columns = useMemo(() => Columns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
  
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_items'
          className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-muted fw-bolder text-uppercase'>
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
