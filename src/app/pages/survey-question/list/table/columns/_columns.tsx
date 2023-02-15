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
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'SURVEYQUESTION.TEXT'})} className='min-w-125px' />,
    id: 'text',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].text} />,
  },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'SURVEYGROUP.NAME'})} className='min-w-125px' />,
  //   id: 'SurveyGroup',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].surveyGroup.name} />,
  // },
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'SURVEY.NAME'})} className='min-w-125px' />,
  //   id: 'Survey',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].surveyGroup.survey.name} />,
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
