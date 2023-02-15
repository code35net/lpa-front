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
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIST.TABLE.ID'})} className='min-w-125px' />,
    id: 'id',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTION.TEXT'})} className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].text} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTION.COURSETOPIC'})} className='min-w-125px' />,
    id: 'Course',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].topic.course.name + " / " + props.data[props.row.index].topic.name} />,
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTION.ANSWERTEMPLATE'})} className='min-w-125px' />,
  //   id: 'AnswerTemplate',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].answerTemplate?.text || 'Yok'} />,
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
