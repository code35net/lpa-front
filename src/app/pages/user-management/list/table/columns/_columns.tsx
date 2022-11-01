import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {RoleCell} from './RoleCell'
import {LastLoginCell} from './LastLoginCell'
import {TwoStepsCell} from './TwoStepsCell'
import {ActionsCell} from './ActionsCell'
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
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
