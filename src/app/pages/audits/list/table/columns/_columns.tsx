import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {DateCell} from './DateCell'
import {ActionsCell} from './ActionsCell'
import {AuditorCell} from './AuditorCell'
import {StatusCell} from './StatusCell'
import {TypeCell} from './TypeCell'
import {SelectionCell} from './SelectionCell'
import {useIntl} from 'react-intl'

import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import { OperatorCell } from './OperatorCell'

const Columns: ReadonlyArray<Column<Model>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Audit Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Unit Name' className='min-w-125px' />,
    id: 'fullname',
    Cell: ({...props}) => <OperatorCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDITS.LIST.DATE'})} className='min-w-125px' />,
    id: 'auditDate',
    Cell: ({...props}) => <DateCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDITS.LIST.AUDITOR'})} className='min-w-125px' />,
    id: 'auditor',
    Cell: ({...props}) => <AuditorCell item={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDITS.LIST.TYPE'})} className='min-w-125px' />,
  //   id: 'type',
  //   Cell: ({...props}) => <TypeCell item={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDITS.LIST.STATUS'})} className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => <StatusCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'TABLE.ACTIONS'})} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
