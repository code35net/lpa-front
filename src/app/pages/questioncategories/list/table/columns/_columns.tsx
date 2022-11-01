import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {IdCell} from './IdCell'
import {CreatedCell} from './CreatedCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {useIntl} from 'react-intl'
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
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTIONCATEGORY.LIST.NAME'})} className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='Created At' className='min-w-125px' />,
  //   id: 'createdAt',
  //   Cell: ({...props}) => <CreatedCell item={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'TABLE.ACTIONS'})} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
