import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
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
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIST.TABLE.ID'})} className='min-w-50px' />,
    id: 'id',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'IMAGELIBRARY.CODE'})} className='min-w-125px' />,
    id: 'code',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].code} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'IMAGELIBRARY.ORIGINAL'})} className='min-w-125px' />,
    id: 'original',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].original} />,
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'COURSE.NAME'})} className='min-w-125px' />,
  //   id: 'course',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].course.name} />,
  // },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'TOPIC.NAME'})} className='min-w-125px' />,
  //   id: 'topic',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].topic.name} />,
  // },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIBRARYCATEGORY.NAME'})} className='min-w-125px' />,
  //   id: 'libraryCategory',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].libraryCategory.name} />,
  // },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIST.TABLE.ACTIONS'})} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
