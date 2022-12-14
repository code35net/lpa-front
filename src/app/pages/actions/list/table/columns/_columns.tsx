import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import { DoneCell } from './DoneCell'
import { UserCell } from './UserCell'
import { StatusCell } from './StatusCell'
import {useIntl} from 'react-intl'

const Columns: ReadonlyArray<Column<Model>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ACTION.LIST.COL.FIND'})} className='min-w-125px' />,
    id: 'finding',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ACTION.LIST.COL.DONE'})} className='min-w-125px' />,
    id: 'done',
    Cell: ({...props}) => <DoneCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ACTION.LIST.COL.STAFF'})} className='min-w-125px' />,
    id: 'fullName',
    Cell: ({...props}) => <UserCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ACTION.LIST.COL.STATUS'})} className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ACTION.LIST.COL.ACTIONS'})} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
