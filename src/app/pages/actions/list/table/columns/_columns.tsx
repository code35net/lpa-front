import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import { DoneCell } from './DoneCell'
import { StatusCell } from './StatusCell'

const Columns: ReadonlyArray<Column<Model>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Finding' className='min-w-125px' />,
    id: 'finding',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Done' className='min-w-125px' />,
    id: 'done',
    Cell: ({...props}) => <DoneCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
