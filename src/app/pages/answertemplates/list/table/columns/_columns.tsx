import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {IdCell} from './IdCell'
import {ActionsCell} from './ActionsCell'
import {useIntl} from 'react-intl'
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
    Header: (props) => <CustomHeader tableProps={props} title='Id' className='min-w-125px' />,
    id: 'id',
    Cell: ({...props}) => <IdCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ANSWERTEMPLATES.LIST.NAME'})} className='min-w-125px' />,
    id: 'Text',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
  },

  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ANSWERTEMPLATES.LIST.OPTIONS'})} className='min-w-125px' />,
    id: 'Options',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
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
