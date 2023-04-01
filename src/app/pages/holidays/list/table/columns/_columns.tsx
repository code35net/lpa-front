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
        title={useIntl().formatMessage({id: 'LIST.TABLE.ID'})}
        className='min-w-125px'
      />
    ),
    id: 'id',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'HOLIDAYS_NAME'})}
        className='min-w-125px'
      />
    ),
    id: 'whatDay',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].whatDay} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'HOLIDAYS_DATE'})}
        className='min-w-125px'
      />
    ),
    id: 'theDay',
    Cell: ({...props}) => (
      <InfoCell item={moment(props.data[props.row.index].theDay).format('YYYY-MM-DD')} />
    ),
  },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'LIST.TABLE.ACTIONS'})}
        className='text-end min-w-100px'
      />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
