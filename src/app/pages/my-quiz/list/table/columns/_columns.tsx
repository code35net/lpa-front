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
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUIZ.NAME'})} className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUIZ.DESCRIPTION'})} className='min-w-125px' />,
    id: 'description',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUIZ.DURATION'})} className='min-w-125px' />,
    id: 'duration',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].duration} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'COURSE.NAME'})} className='min-w-125px' />,
    id: 'Course',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].courseTerm?.course?.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUIZ.HASCERTIFICATE'})} className='min-w-125px' />,
    id: 'hasCertificate',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].hasCertificate ? 'Evet': 'Hayır' } />,
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
