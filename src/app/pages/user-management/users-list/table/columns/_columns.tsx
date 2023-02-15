import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {RoleCell} from './RoleCell'
import {IdentityCell} from './IdentityCell'
import {FullnameCell} from './FullnameCell'
import {PositionCell} from './PositionCell'
import {ActionsCell} from './ActionsCell'
import {ShiftCell} from './ShiftCell'
import {SectionCell} from './SectionCell'
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
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'USERS.FULLNAME'})} className='min-w-125px' />,
    id: 'fullname',

    Cell: ({...props}) => <FullnameCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'USERS.EMAIL'})} className='min-w-125px' />,
    id: 'email',

    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'USERS.ROLE'})} className='min-w-125px' />,
    id: 'role',

    Cell: ({...props}) => <RoleCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'USERS.IDENTITY'})} className='min-w-125px' />,
    id: 'identity',

    Cell: ({...props}) => <IdentityCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIST.TABLE.ACTIONS'})} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
