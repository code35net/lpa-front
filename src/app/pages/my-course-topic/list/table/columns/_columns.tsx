import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {LinkCell} from './LinkCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {useIntl} from 'react-intl'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'

const Columns: ReadonlyArray<Column<Model>> = [
 
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'TOPIC.NAME'})} className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <LinkCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'COURSE.NAME'})} className='min-w-125px' />,
    id: 'Survey',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].course?.name}  />,
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