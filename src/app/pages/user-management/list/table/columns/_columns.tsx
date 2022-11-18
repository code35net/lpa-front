import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {RoleCell} from './RoleCell'
import {IdentityCell} from './IdentityCell'
import {FullnameCell} from './FullnameCell'
import {PositionCell} from './PositionCell'
import {ActionsCell} from './ActionsCell'
import {ShiftCell} from './ShiftCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'


const Columns: ReadonlyArray<Column<Model>> = [
  
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='fullname' className='min-w-125px' />,
    id: 'fullname',

    Cell: ({...props}) => <FullnameCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='email' className='min-w-125px' />,
    id: 'email',

    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='role' className='min-w-125px' />,
    id: 'role',

    Cell: ({...props}) => <RoleCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='identity' className='min-w-125px' />,
    id: 'identity',

    Cell: ({...props}) => <IdentityCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Department / Position' className='min-w-125px' />,
    id: 'positionName',

    Cell: ({...props}) => <PositionCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='shift' className='min-w-125px' />,
    id: 'shift',

    Cell: ({...props}) => <ShiftCell item={props.data[props.row.index]} />,
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
