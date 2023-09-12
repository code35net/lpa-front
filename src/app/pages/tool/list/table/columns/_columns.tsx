import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {useIntl} from 'react-intl'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import moment from 'moment'

const Columns: ReadonlyArray<Column<Model>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'Parça Adı'})}
        className='min-w-125px'
      />
    ),
    id: 'name',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'Parça Kodu'})}
        className='min-w-125px'
      />
    ),
    id: 'code',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].code} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'Teslim Edilen Tarih'})}
        className='min-w-125px'
      />
    ),
    id: 'teslimVerildigiTarih',
    Cell: ({...props}) => (
      <InfoCell
        item={moment(props.data[props.row.index].teslimVerildigiTarih).format('YYYY-MM-DD')}
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'Teslim Alınan Tarih'})}
        className='min-w-125px'
      />
    ),
    id: 'teslimAlindigiTarih',
    Cell: ({...props}) => (
      <InfoCell
        item={moment(props.data[props.row.index].teslimAlindigiTarih).format('YYYY-MM-DD')}
      />
    ),
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'Tamir Tarihi'})}
        className='min-w-125px'
      />
    ),
    id: 'tamirTarihi',
    Cell: ({...props}) => (
      <InfoCell item={moment(props.data[props.row.index].tamirTarihi).format('YYYY-MM-DD')} />
    ),
  },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'İşlem'})}
        className='min-w-125px'
      />
    ),
    id: 'İslemAdi',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].İslemAdi} />,
  },

  // {
  //   Header: (props) => (
  //     <CustomHeader
  //       tableProps={props}
  //       title={useIntl().formatMessage({id: 'LIST.TABLE.ACTIONS'})}
  //       className='text-end min-w-100px'
  //     />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  // },
]

export {Columns}
